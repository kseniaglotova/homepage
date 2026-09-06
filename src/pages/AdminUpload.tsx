import React, { useState } from 'react';

export default function AdminUpload() {
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('food');
  const [uploadType, setUploadType] = useState<'image' | 'text'>('image');
  const [customName, setCustomName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [blogText, setBlogText] = useState('');
  const [status, setStatus] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !password) return setStatus('Bitte Passwort eingeben.');

    if (uploadType === 'image' && !file) return setStatus('Bitte eine Datei auswählen.');
    if (uploadType === 'text' && !blogText.trim()) return setStatus('Bitte einen Text eingeben.');


    setStatus(uploadType === 'image' ? 'Bild wird hochgeladen...' : 'Text wird gepostet...');

    try {
      let url = '';
      let bodyData: any = null;

      if (uploadType === 'image' && file) {
        // 1. Logik für BILDER (Exakt wie vorher)
        const fileExtension = file.name.substring(file.name.lastIndexOf('.'));
        const finalFilename = customName.trim() !== '' ? `${customName.trim()}${fileExtension}` : file.name;
        url = `/api/upload?filename=${encodeURIComponent(finalFilename)}&contentType=${file.type}&category=${category}`;
        bodyData = file;
      } else {
        // 2. Logik für TEXTE (.json Datei erzeugen)
        // Wir bauen einen sauberen Dateinamen aus dem Wunschtitel oder dem aktuellen Zeitstempel
        const timestamp = Date.now();
        const finalFilename = customName.trim() !== '' ? `${customName.trim()}.json` : `text-${timestamp}.json`;
        url = `/api/upload?filename=${encodeURIComponent(finalFilename)}&contentType=application/json&category=${category}`;
        
        // Wir packen den Text in ein JSON-Objekt
        bodyData = JSON.stringify({ text: blogText });
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'x-admin-password': password,
        },
        body: bodyData,
    });

      if (!response.ok) {
        throw new Error('Upload fehlgeschlagen. Passwort falsch?');
      }

      await response.json();
      setStatus(uploadType === 'image' ? 'Bild erfolgreich hochgeladen! 🎉' : 'Text erfolgreich gepostet! ✍️');
      
      // Felder zurücksetzen
      setFile(null);
      setCustomName('');
      setBlogText('');
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
            <option value="dashboard">Dashboard 📊</option>
          </select>
        </label>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="button" onClick={() => setUploadType('image')} style={{ flex: 1, padding: '8px', background: uploadType === 'image' ? '#000' : '#ccc', color: '#fff', border: 'none', borderRadius: '4px' }}>🖼️ Bild</button>
          <button type="button" onClick={() => setUploadType('text')} style={{ flex: 1, padding: '8px', background: uploadType === 'text' ? '#000' : '#ccc', color: '#fff', border: 'none', borderRadius: '4px' }}>✍️ Textblock</button>
        </div>
        <input 
          type="text" 
          placeholder={uploadType === 'image' ? "Dateiname" : "Titel des Textblocks"}
          style={{ padding: '10px', fontSize: '16px' }}
          value={customName} 
          onChange={(e) => setCustomName(e.target.value)} 
        />
        {uploadType === 'image' ? (
          <input type="file" accept="image/*" style={{ fontSize: '16px' }} onChange={(e) => setFile(e.target.files?.[0] || null)} />
        ) : (
          <textarea 
            placeholder="Schreibe hier deinen Blogtext rein..." 
            rows={6}
            style={{ padding: '10px', fontSize: '16px', fontFamily: 'sans-serif', resize: 'vertical' }}
            value={blogText}
            onChange={(e) => setBlogText(e.target.value)}
          />
        )}

        <button type="submit" style={{ padding: '12px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold' }}>
          {uploadType === 'image' ? 'Bild hochladen' : 'Textblock posten'}
        </button>
      </form>
      <p style={{ marginTop: '15px', fontWeight: 'bold' }}>{status}</p>
    </div>
  );
}
