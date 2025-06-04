import express from 'express';
import fetch from 'node-fetch';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

async function loadProviders() {
  const data = await readFile(path.join(__dirname, 'data', 'providers.json'), 'utf8');
  return JSON.parse(data);
}

async function geocode(address) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_TOKEN}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Geocoding failed');
  const data = await res.json();
  if (!data.features || data.features.length === 0) throw new Error('Address not found');
  const [lon, lat] = data.features[0].center;
  return { lat, lon };
}

async function drivingHours(start, end) {
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.lon},${start.lat};${end.lon},${end.lat}?access_token=${MAPBOX_TOKEN}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Directions request failed');
  const data = await res.json();
  if (!data.routes || data.routes.length === 0) throw new Error('No route found');
  const seconds = data.routes[0].duration;
  return seconds / 3600;
}

app.get('/search', async (req, res) => {
  const address = req.query.address;
  if (!address) return res.status(400).json({ error: 'Address query parameter is required' });
  if (!MAPBOX_TOKEN) return res.status(500).json({ error: 'MAPBOX_TOKEN environment variable not set' });
  try {
    const start = await geocode(address);
    const providers = await loadProviders();
    const results = [];
    for (const p of providers) {
      const pLoc = await geocode(p.address);
      const hours = await drivingHours(start, pLoc);
      if (hours <= 1) {
        results.push({ name: p.name, address: p.address, hours });
      }
    }
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
