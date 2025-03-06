import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [privateKey, setPrivateKey] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [links, setLinks] = useState([]);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      // Utilisez l'URL complète de votre API déployée sur Vercel
      const response = await axios.get(`https://stealer-gh-pages-gdjg3zivg-arthoxes-projects.vercel.app/api/links?key=${privateKey}`);
      setLinks(response.data.links);
      setIsLoggedIn(true);
      setError('');
    } catch (e) {
      console.error("Erreur:", e);
      setError('Clé privée invalide ou erreur de connexion');
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
            {links.length > 0 ? (
              links.map((link, index) => (
                <li key={index}>
                  <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                </li>
              ))
            ) : (
              <li>Aucun lien disponible</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;