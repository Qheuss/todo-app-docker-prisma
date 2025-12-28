import express from 'express';
import path, { dirname } from 'path';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDirCandidates = [
  path.resolve(__dirname, '../public'),
  path.resolve(__dirname, '../../public'),
];

const publicDir = (publicDirCandidates.find((p) => existsSync(p)) ||
  publicDirCandidates[0]) as string;

app.use(express.json());
app.use(express.static(publicDir));

app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.use('/auth', authRoutes);
app.use('/todos', authMiddleware, todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
