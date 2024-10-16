import React, { useState } from 'react';
import { testing } from "../../lib/istesting.js";

const IndexPage = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleNuke = async () => {
    const response = await fetch('/api/boxes/boxesapi', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ secret: password }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage(`Success: ${data.message}`);
    } else {
      setMessage(`Error: ${data.message}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Admin Panel</h1>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px', fontSize: '16px' }}
      />
      <button
        onClick={() => {
          if (testing){handleNuke();}
          else (console.log("cant nuke real data"));
        }}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        Nuke Database
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default IndexPage;
