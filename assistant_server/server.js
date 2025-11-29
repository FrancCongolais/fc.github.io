import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { getChatResponse } from './assistant-logic.js';
import dotenv from 'dotenv';

// Load env vars if .env exists
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the project root (one level up)
// This allows running the full site via this server
app.use(express.static(path.join(__dirname, '../')));

app.post('/api/chat', async (req, res) => {
    try {
        const { message, history } = req.body;
        const responseText = await getChatResponse(message, history);
        res.json({ response: responseText });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Failed to generate response", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Assistant Server running at http://localhost:${PORT}`);
    console.log(`Serving static files from project root.`);
});
