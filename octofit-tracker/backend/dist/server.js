import 'dotenv/config';
import express from 'express';
import './config/database.js';
import { apiRouter } from './routes/api.js';
const app = express();
const PORT = Number(process.env.PORT || 8000);
app.use(express.json());
app.use('/api', apiRouter);
app.listen(PORT, () => {
    console.log(`OctoFit Tracker API is listening on http://localhost:${PORT}`);
});
