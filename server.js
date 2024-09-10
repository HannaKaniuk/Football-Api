import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const url = 'https://v3.football.api-sports.io/predictions?fixture=198772';
const options = {
    method: 'GET',
    headers: {
        'x-apisports-key': process.env.API_KEY
    }
};

app.use(express.static(path.join(__dirname, 'src')));

app.get('/matches', async (req, res) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        res.json(result.response || []);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json([]);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

