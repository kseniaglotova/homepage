import { put } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  // 1. Sicherheit: Passwort überprüfen
  const password = request.headers['x-admin-password'];
  if (password !== process.env.ADMIN_PASSWORD) {
    return response.status(401).json({ error: 'Falsches Passwort!' });
  }

  try {
    // 2. Parameter aus der URL holen
    const { filename, contentType, category } = request.query;
    
    if (!filename || !category) {
      return response.status(400).json({ error: 'Dateiname und Kategorie fehlen.' });
    }

    // 3. Virtuellen Pfad bauen (z.B. notes/food/mein-bild.jpg)
    const blobPath = `notes/${category}/${filename}`;

    // 4. Direkt zu Vercel Blob hochladen
    const blob = await put(blobPath, request, {
      contentType: contentType as string,
      access: 'public',
    });

    return response.status(200).json(blob);
  } catch (error) {
    return response.status(500).json({ error: (error as Error).message });
  }
}
