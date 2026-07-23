import 'dotenv/config';
import express from 'express';
import './config/database.js';

const app = express();
const PORT = Number(process.env.PORT || 8000);

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-tracker-backend',
    port: PORT,
  });
});

app.listen(PORT, () => {
  console.log(`OctoFit Tracker API is listening on http://localhost:${PORT}`);
});
