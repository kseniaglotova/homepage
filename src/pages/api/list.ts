import { list } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';

type JsonContent = { text?: string; caption?: string };
type ListItem = { type: 'image' | 'text'; url: string; uploadedAt: Date; content?: string; caption?: string | null };

export default async function handler(request: VercelRequest, response: VercelResponse) {
  const categoryValue = request.query.category;
  const category = Array.isArray(categoryValue) ? categoryValue[0] : categoryValue;
  if (!category) return response.status(400).json({ error: 'Kategorie fehlt' });

  try {
    const isDashboard = category === 'dashboard';
    const isNoteCategory = ['food', 'places', 'rides'].includes(category);
    if (!isDashboard && !isNoteCategory) {
      return response.status(400).json({ error: 'Ungültige Kategorie' });
    }

    const prefixes = isDashboard
      ? ['dashboard/', 'notes/dashboard/']
      : [`notes/${category}/`];
    const blobLists = await Promise.all(prefixes.map((prefix) => list({ prefix })));
    const blobs = blobLists.flatMap(({ blobs: categoryBlobs }) => categoryBlobs);

    // 1. Wir trennen alle JSON-Dateien von den Bildern
    const imageBlobs = blobs.filter(b => !b.url.endsWith('.json'));
    const jsonBlobs = blobs.filter(b => b.url.endsWith('.json'));

    // 2. Wir laden alle JSON-Inhalte im Hintergrund parallel herunter
    const jsonContents = await Promise.all(jsonBlobs.map(async (blob) => {
      try {
        const res = await fetch(blob.url);
        const data = await res.json();
        // Wir merken uns den Basisnamen ohne ".json"
        const baseName = blob.pathname.replace(/\.json$/, '');
        return { baseName, data: data as JsonContent, uploadedAt: blob.uploadedAt, url: blob.url };
      } catch {
        return null;
      }
    }));

    // 3. Wir bauen das finale Ergebnis zusammen
    const result: ListItem[] = [];

    // A: Reine Textblöcke finden (JSON-Dateien, die KEIN Bild neben sich haben)
    jsonContents.forEach(json => {
      if (!json) return;
      // Wenn es im Text "text" gibt, ist es ein reiner Textblock
      if (json.data.text) {
        result.push({
          type: 'text',
          url: json.url,
          uploadedAt: json.uploadedAt,
          content: json.data.text
        });
      }
    });

    // B: Bilder verarbeiten und prüfen, ob sie eine Caption-JSON haben
    imageBlobs.forEach(img => {
      const imgBaseName = img.pathname.replace(/\.[^.]+$/, '');
      // Suchen, ob es eine JSON-Datei mit exakt demselben Basisnamen gibt
      const matchingJson = jsonContents.find(j => j && j.baseName === imgBaseName && j.data.caption);

      result.push({
        type: 'image',
        url: img.url,
        uploadedAt: img.uploadedAt,
        caption: matchingJson ? matchingJson.data.caption : null // Hier ist die Caption!
      });
    });

    return response.status(200).json(result);
  } catch (error) {
    return response.status(500).json({ error: (error as Error).message });
  }
}
