import 'dotenv/config';
import express from 'express';
import './config/database.js';
import { apiRouter } from './routes/api.js';

const app = express();
const PORT = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/base-url', (_req, res) => {
  res.json({ baseUrl });
});

app.listen(PORT, () => {
  console.log(`OctoFit Tracker API is listening on ${baseUrl}`);
});
