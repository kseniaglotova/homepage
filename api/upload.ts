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
    const { filename, contentType } = request.query;
    const categoryValue = request.query.category;
    const category = Array.isArray(categoryValue) ? categoryValue[0] : categoryValue;
    const filenameValue = Array.isArray(filename) ? filename[0] : filename;
    const contentTypeValue = Array.isArray(contentType) ? contentType[0] : contentType;

    if (!filenameValue || !category) {
      return response.status(400).json({ error: 'Dateiname und Kategorie fehlen.' });
    }

    const isDashboard = category === 'dashboard';
    const isNoteCategory = ['food', 'mobility'].includes(category);
    if (!isDashboard && !isNoteCategory) {
      return response.status(400).json({ error: 'Ungültige Kategorie.' });
    }

    if (filenameValue.includes('/') || filenameValue.includes('\\')) {
      return response.status(400).json({ error: 'Ungültiger Dateiname.' });
    }

    const blobPath = isDashboard
      ? `dashboard/${filenameValue}`
      : `notes/${category}/${filenameValue}`;

    // 4. Direkt zu Vercel Blob hochladen
    const blob = await put(blobPath, request, {
      contentType: contentTypeValue as string,
      access: 'public',
    });

    return response.status(200).json(blob);
  } catch (error) {
    return response.status(500).json({ error: (error as Error).message });
  }
}
