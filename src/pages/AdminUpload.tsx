import React, { useState } from 'react';

export default function AdminUpload() {
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('food');
  const [uploadType, setUploadType] = useState<'image' | 'text'>('image');
  const [file, setFile] = useState<File | null>(null);
  const [customName, setCustomName] = useState('');
  const [blogText, setBlogText] = useState(''); // Wird für reinen Text UND Captions genutzt
  const [status, setStatus] = useState('');

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get('admin-password-field') as string || password;

    if (!currentPassword) return setStatus('Passwort eingeben.');
    if (uploadType === 'image' && !file) return setStatus('Datei auswählen.');
    if (uploadType === 'text' && !blogText.trim()) return setStatus('Text eingeben.');

    setStatus('Verarbeitung läuft...');

    try {
      if (uploadType === 'image' && file) {
        // --- 1. BILD HOCHLADEN ---
        const fileExtension = file.name.substring(file.name.lastIndexOf('.'));
        const baseName = customName.trim() !== '' ? customName.trim() : file.name.replace(fileExtension, '');
        // Sauberer Name für das Bild
        const imageFilename = `${baseName}${fileExtension}`;
        
        const imgUrl = `/api/upload?filename=${encodeURIComponent(imageFilename)}&contentType=${file.type}&category=${category}`;
        
        const imgResponse = await fetch(imgUrl, {
          method: 'POST',
          headers: { 'x-admin-password': currentPassword },
          body: file,
        });

        if (!imgResponse.ok) throw new Error('Bild-Upload fehlgeschlagen.');

        // --- 2. CAPTION HOCHLADEN (Falls eingetippt) ---
        if (blogText.trim() !== '') {
          const jsonFilename = `${baseName}.json`;
          const jsonUrl = `/api/upload?filename=${encodeURIComponent(jsonFilename)}&contentType=application/json&category=${category}`;
          
          const jsonResponse = await fetch(jsonUrl, {
            method: 'POST',
            headers: { 'x-admin-password': currentPassword },
            body: JSON.stringify({ caption: blogText }), // Wir speichern es als "caption"
          });
          
          if (!jsonResponse.ok) throw new Error('Caption-Upload fehlgeschlagen.');
        }

        setStatus('Bild (mit Caption) erfolgreich hochgeladen');

      } else {
        // --- 3. REINER TEXTBLOCK (Nur für Dashboard sinnvoll) ---
        const timestamp = Date.now();
        const finalFilename = customName.trim() !== '' ? `${customName.trim()}.json` : `text-${timestamp}.json`;
        const url = `/api/upload?filename=${encodeURIComponent(finalFilename)}&contentType=application/json&category=${category}`;
        
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'x-admin-password': currentPassword },
          body: JSON.stringify({ text: blogText }), // Reiner Text
        });

        if (!response.ok) throw new Error('Text-Post fehlgeschlagen.');
        setStatus('Textblock erfolgreich gepostet');
      }

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
      <h2>🔒 Admin Kontrollzentrum</h2>
      <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <input 
          type="password" 
          name="admin-password-field"
          placeholder="Dein Admin-Passwort" 
          style={{ padding: '10px', fontSize: '16px' }}
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />

        <label style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '14px' }}>
          Kategorie auswählen:
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '10px', fontSize: '16px' }}>
            <option value="food">Food</option>
            <option value="places">Places</option>
            <option value="rides">Rides</option>
            <option value="dashboard">Dashboard(Blog)</option>
          </select>
        </label>

        {/* Schalter: Reiner Text ist nur bei Dashboard erlaubt */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="button" onClick={() => setUploadType('image')} style={{ flex: 1, padding: '8px', background: uploadType === 'image' ? '#000' : '#ccc', color: '#fff', border: 'none', borderRadius: '4px' }}>Bild / Bild+Caption</button>
          {category === 'dashboard' && (
            <button type="button" onClick={() => setUploadType('text')} style={{ flex: 1, padding: '8px', background: uploadType === 'text' ? '#000' : '#ccc', color: '#fff', border: 'none', borderRadius: '4px' }}>Reiner Textblock</button>
          )}
        </div>

        <input 
          type="text" 
          placeholder="Wunsch-Dateiname" 
          style={{ padding: '10px', fontSize: '16px' }}
          value={customName} 
          onChange={(e) => setCustomName(e.target.value)} 
        />

        {uploadType === 'image' && (
          <input type="file" accept="image/*" style={{ fontSize: '16px' }} onChange={(e) => setFile(e.target.files?. [0] || null)} />
        )}

        <textarea 
          placeholder={uploadType === 'image' ? "Bild-Beschriftung / Caption schreiben (optional)..." : "Schreibe hier deinen Blogtext rein..."} 
          rows={5}
          style={{ padding: '10px', fontSize: '16px', fontFamily: 'sans-serif', resize: 'vertical' }}
          value={blogText}
          onChange={(e) => setBlogText(e.target.value)}
        />

        <button type="submit" style={{ padding: '12px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold' }}>
          Speichern & Hochladen
        </button>
      </form>
      <p style={{ marginTop: '15px', fontWeight: 'bold' }}>{status}</p>
    </div>
  );
}
