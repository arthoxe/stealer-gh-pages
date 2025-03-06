import fs from 'fs-extra';
import path from 'path';

// Définir le chemin du fichier de données
// Pour Vercel, nous utilisons /tmp car c'est le seul répertoire avec des permissions d'écriture
const DATA_FILE = '/tmp/links.json';

export default async function handler(req, res) {
  // Configurer les en-têtes CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Autorise toutes les origines
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Gérer les requêtes OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { privateKey, gofileLink } = req.body;
  if (!privateKey || !gofileLink) {
    return res.status(400).json({ error: 'Missing privateKey or gofileLink' });
  }

  try {
    // Charge les données existantes ou initialise
    let data = {};
    if (await fs.pathExists(DATA_FILE)) {
      data = await fs.readJson(DATA_FILE);
    }
    
    // Ajoute ou met à jour les liens pour cette clé
    if (!data[privateKey]) {
      data[privateKey] = [];
    }
    data[privateKey].push(gofileLink);
    
    // Sauvegarde
    await fs.writeJson(DATA_FILE, data, { spaces: 2 });
    console.log(`Link ${gofileLink} added for key ${privateKey}`);
    
    return res.status(200).json({ message: 'Link saved successfully' });
  } catch (e) {
    console.error(`Error: ${e.message}`);
    return res.status(500).json({ error: 'Server error, please try again' });
  }
}