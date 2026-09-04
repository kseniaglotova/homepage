import React, { useState } from 'react';

export default function AdminUpload() {
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('food');
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !password) return setStatus('Bitte Passwort und Datei eingeben.');

    setStatus('Bild wird hochgeladen...');

    try {
      const url = `/api/upload?filename=${encodeURIComponent(file.name)}&contentType=${file.type}&category=${category}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'x-admin-password': password,
        },
        body: file,
      });

      if (!response.ok) {
        throw new Error('Upload fehlgeschlagen. Passwort falsch?');
      }

      const blob = await response.json();
      setStatus('Erfolgreich hochgeladen! 🎉');
      setImageUrl(blob.url); 
    } catch (error) {
      setStatus((error as Error).message);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>🔒 Handy-Bilder-Upload</h2>
      <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="password" 
          placeholder="Dein Admin-Passwort" 
          style={{ padding: '10px', fontSize: '16px' }}
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <label style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '14px' }}>
          Kategorie auswählen:
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '10px', fontSize: '16px' }}>
            <option value="food">Food 🍕</option>
            <option value="places">Places ✈️</option>
            <option value="rides">Rides 🏍️</option>
          </select>
        </label>
        <input type="file" accept="image/*" style={{ fontSize: '16px' }} onChange={(e) => setFile(e.target.files?. || null)} />
        <button type="submit" style={{ padding: '12px', background: '#000', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '16px' }}>
          Bild hochladen
        </button>
      </form>
      <p style={{ marginTop: '15px', fontWeight: 'bold' }}>{status}</p>
      {imageUrl && (
        <div style={{ marginTop: '20px', background: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
          <p style={{ margin: '0 0 5px 0', fontSize: '12px' }}>Bild-URL:</p>
          <a href={imageUrl} target="_blank" rel="noreferrer" style={{ wordBreak: 'break-all', fontSize: '14px' }}>{imageUrl}</a>
        </div>
      )}
    </div>
  );
}
