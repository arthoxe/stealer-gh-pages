import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [privateKey, setPrivateKey] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [links, setLinks] = useState([]);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      // Remplacez par votre URL Vercel
      const response = await axios.get(`https://votre-api.vercel.app/api/links?key=${privateKey}`);
      setLinks(response.data.links);
      setIsLoggedIn(true);
      setError('');
    } catch (e) {
      setError('Clé privée invalide');
    }
  };

  return (
    <div className="app">
      {!isLoggedIn ? (
        <div className="login">
          <h1>Dashboard de Connexion</h1>
          <input
            type="text"
            placeholder="Entrez votre clé privée"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
          />
          <button onClick={handleLogin}>Se connecter</button>
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