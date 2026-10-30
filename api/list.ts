import { list } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  const categoryValue = request.query.category;
  const category = Array.isArray(categoryValue) ? categoryValue[0] : categoryValue;

  if (!category) {
    return response.status(400).json({ error: 'Kategorie fehlt' });
  }

  try {
    const isDashboard = category === 'dashboard';
    const isNoteCategory = ['food', 'mobility','dineout'].includes(category);
    if (!isDashboard && !isNoteCategory) {
      return response.status(400).json({ error: 'Ungültige Kategorie' });
    }

    const prefixes = isDashboard
      ? ['dashboard/']
      : category === 'mobility'
        ? ['notes/mobility/', 'notes/rides/']
        : [`notes/${category}/`];
    const blobLists = await Promise.all(prefixes.map((prefix) => list({ prefix })));
    const blobs = blobLists.flatMap(({ blobs: categoryBlobs }) => categoryBlobs);

    const jsonFiles = new Map<string, { text?: string; caption?: string }>();

    // JSON-Dateien enthalten entweder einen reinen Text oder die Caption eines Bildes.
    await Promise.all(blobs.filter((blob) => blob.url.endsWith('.json')).map(async (blob) => {
      try {
        const textResponse = await fetch(blob.url);
        const jsonContent = await textResponse.json();
        jsonFiles.set(blob.pathname.replace(/\.json$/, ''), jsonContent);
      } catch {
        // Eine kaputte Zusatzdatei soll die übrigen Bilder nicht blockieren.
      }
    }));

    const formattedBlobs = blobs.flatMap((blob) => {
      if (blob.url.endsWith('.json')) {
        return [];
      }

      const baseName = blob.pathname.replace(/\.[^.]+$/, '');
      const extra = jsonFiles.get(baseName);

      return [{
        url: blob.url,
        uploadedAt: blob.uploadedAt,
        type: 'image',
        caption: extra?.caption || ''
      }];
    });

    // Reine Textbeiträge bleiben eigene Dashboard-Einträge.
    const textItems = blobs
      .filter((blob) => blob.url.endsWith('.json'))
      .flatMap((blob) => {
        const content = jsonFiles.get(blob.pathname.replace(/\.json$/, ''));
        return content?.text
          ? [{ url: blob.url, uploadedAt: blob.uploadedAt, type: 'text', content: content.text }]
          : [];
      });

    return response.status(200).json([...formattedBlobs, ...textItems]);
  } catch (error) {
    return response.status(500).json({ error: (error as Error).message });
  }
}
