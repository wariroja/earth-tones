import React, { useState } from 'react';

function App() {
  const [chords, setChords] = useState('');
  const [key, setKey] = useState('');
  const [bpm, setBpm] = useState('');
  const [music, setMusic] = useState(null);

  const generateMusic = async () => {
    const response = await fetch('http://127.0.0.1:5000/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chords, key, bpm }),
    });

    console.log(response)

    const data = response.json();
    setMusic(data.music);
  };

  return (
    <div>
      <input
        type="text"
        value={chords}
        onChange={(e) => setChords(e.target.value)}
        placeholder="Chords"
      />
      <input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Key"
      />
      <input
        type="number"
        value={bpm}
        onChange={(e) => setBpm(e.target.value)}
        placeholder="BPM"
      />
      <button onClick={generateMusic}>Generate Music</button>
      {music && <audio src={music} controls />}
    </div>
  );
}

export default App;
