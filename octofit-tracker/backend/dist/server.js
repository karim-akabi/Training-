import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import './config/database.js';
import { apiRouter } from './routes/api.js';
const app = express();
const PORT = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${PORT}`;
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true);
        }
        const isLocalhost = /^http:\/\/localhost:\d+$/.test(origin);
        const isCodespaces = /^https:\/\/[a-zA-Z0-9-]+-\d+\.app\.github\.dev$/.test(origin);
        if (isLocalhost || isCodespaces) {
            return callback(null, true);
        }
        callback(new Error(`Origin not allowed by CORS: ${origin}`));
    },
}));
app.use(express.json());
app.use('/api', apiRouter);
app.get('/api/base-url', (_req, res) => {
    res.json({ baseUrl });
});
app.listen(PORT, () => {
    console.log(`OctoFit Tracker API is listening on ${baseUrl}`);
});
