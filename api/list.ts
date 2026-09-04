import { list } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  const { category } = request.query;

  if (!category) {
    return response.status(400).json({ error: 'Kategorie fehlt' });
  }

  try {
    // Holt alle Dateien, die im "virtuellen Ordner" notes/kategorie/ liegen
    const { blobs } = await list({
      prefix: `notes/${category}/`,
    });

    // Gibt die URLs der Bilder an deine Website zurück
    return response.status(200).json(blobs.map(blob => blob.url));
  } catch (error) {
    return response.status(500).json({ error: (error as Error).message });
  }
}
