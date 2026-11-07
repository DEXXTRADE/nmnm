import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  // Support JSON payload up to 20MB for uploaded photo data
  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

  const dataDir = path.resolve(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const configPath = path.resolve(dataDir, 'config.json');
  const wishesPath = path.resolve(dataDir, 'wishes.json');
  const configJsPath = path.resolve(__dirname, 'assets/js/config.js');

  // API 1: Get Config (Shared across all devices)
  app.get('/api/config', (req, res) => {
    try {
      if (fs.existsSync(configPath)) {
        const raw = fs.readFileSync(configPath, 'utf-8');
        const data = JSON.parse(raw);
        return res.json(data);
      }
    } catch (e) {
      console.error('Error reading config.json:', e);
    }
    return res.json(null);
  });

  // API 2: Save Config (Sync to all devices & update config.js)
  app.post('/api/config', (req, res) => {
    try {
      const incoming = req.body;
      if (!incoming) {
        return res.status(400).json({ error: 'Invalid config payload' });
      }

      let existing = {};
      if (fs.existsSync(configPath)) {
        try {
          existing = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        } catch (e) {}
      }

      const merged = {
        ...existing,
        ...incoming,
        bride: { ...(existing.bride || {}), ...(incoming.bride || {}) },
        groom: { ...(existing.groom || {}), ...(incoming.groom || {}) },
        akad: { ...(existing.akad || {}), ...(incoming.akad || {}) },
        resepsi: { ...(existing.resepsi || {}), ...(incoming.resepsi || {}) },
        digitalEnvelope: { ...(existing.digitalEnvelope || {}), ...(incoming.digitalEnvelope || {}) },
        developerContact: { ...(existing.developerContact || {}), ...(incoming.developerContact || {}) }
      };

      // Write to data/config.json
      fs.writeFileSync(configPath, JSON.stringify(merged, null, 2), 'utf-8');

      // Also automatically update assets/js/config.js so GitHub Pages deployment is always up-to-date
      const jsContent = `/**\n * The Wedding of ${merged.bride?.nickName || 'Arina'} & ${merged.groom?.nickName || 'Bagas'} - Master Configuration File\n * Commercial Grade - Developed by DexxDigital\n * Auto-synced from Admin Panel\n */\n\nwindow.WEDDING_CONFIG = ${JSON.stringify(merged, null, 2)};\n`;
      fs.writeFileSync(configJsPath, jsContent, 'utf-8');

      return res.json({ success: true, message: 'Config synced successfully across all devices' });
    } catch (e) {
      console.error('Error saving config:', e);
      return res.status(500).json({ error: 'Failed to save config' });
    }
  });

  // API 3: Get Wishes (Live Guestbook)
  app.get('/api/wishes', (req, res) => {
    try {
      if (fs.existsSync(wishesPath)) {
        const raw = fs.readFileSync(wishesPath, 'utf-8');
        const data = JSON.parse(raw);
        return res.json(data);
      }
    } catch (e) {
      console.error('Error reading wishes.json:', e);
    }
    return res.json(null);
  });

  // API 4: Add New Wish (Shared in real-time)
  app.post('/api/wishes', (req, res) => {
    try {
      const newWish = req.body;
      let list = [];
      if (fs.existsSync(wishesPath)) {
        try {
          list = JSON.parse(fs.readFileSync(wishesPath, 'utf-8'));
        } catch (e) {
          list = [];
        }
      }
      list.unshift(newWish);
      fs.writeFileSync(wishesPath, JSON.stringify(list, null, 2), 'utf-8');
      return res.json(newWish);
    } catch (e) {
      console.error('Error adding wish:', e);
      return res.status(500).json({ error: 'Failed to post wish' });
    }
  });

  // API 5: Delete a Wish
  app.delete('/api/wishes/:id', (req, res) => {
    try {
      const wishId = req.params.id;
      let list = [];
      if (fs.existsSync(wishesPath)) {
        try {
          list = JSON.parse(fs.readFileSync(wishesPath, 'utf-8'));
        } catch (e) {
          list = [];
        }
      }
      list = list.filter((w) => String(w.id) !== String(wishId));
      fs.writeFileSync(wishesPath, JSON.stringify(list, null, 2), 'utf-8');
      return res.json({ success: true });
    } catch (e) {
      console.error('Error deleting wish:', e);
      return res.status(500).json({ error: 'Failed to delete wish' });
    }
  });

  // API 6: Delete All Wishes
  app.delete('/api/wishes', (req, res) => {
    try {
      fs.writeFileSync(wishesPath, JSON.stringify([], null, 2), 'utf-8');
      return res.json({ success: true });
    } catch (e) {
      console.error('Error clearing wishes:', e);
      return res.status(500).json({ error: 'Failed to clear wishes' });
    }
  });

  // Mount Vite middleware so static files & HMR/dev server are served smoothly
  const isProd = process.env.NODE_ENV === 'production' && fs.existsSync(path.resolve(__dirname, 'dist'));
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`[DexxDigital Server] Running at http://0.0.0.0:${port}`);
  });
}

startServer();
