import { list } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  const { category } = request.query;

  if (!category) {
    return response.status(400).json({ error: 'Kategorie fehlt' });
  }

  try {
    const { blobs } = await list({
      prefix: `notes/${category}/`,
    });

    // Wir gehen alle gefundenen Dateien durch
    const formattedBlobs = await Promise.all(blobs.map(async (blob) => {
      // Wenn es eine JSON-Textdatei ist, laden wir den Text direkt im Hintergrund herunter
      if (blob.url.endsWith('.json')) {
        try {
          const textResponse = await fetch(blob.url);
          const jsonContent = await textResponse.json();
          return {
            url: blob.url,
            uploadedAt: blob.uploadedAt,
            type: 'text',
            content: jsonContent.text // Hier steckt dein geschriebener Text drin!
          };
        } catch {
          return { url: blob.url, uploadedAt: blob.uploadedAt, type: 'text', content: 'Fehler beim Laden des Textes.' };
        }
      }

      // Wenn es ein normales Bild ist
      return {
        url: blob.url,
        uploadedAt: blob.uploadedAt,
        type: 'image'
      };
    }));

    return response.status(200).json(formattedBlobs);
  } catch (error) {
    return response.status(500).json({ error: (error as Error).message });
  }
}
