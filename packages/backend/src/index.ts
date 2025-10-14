import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { initTelegramBot } from './services/telegramBot.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Initialize Telegram bot service
void initTelegramBot();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
