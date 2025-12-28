import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from './../../lib/prisma.js';

const authRoutes = express.Router();

authRoutes.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 8);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    const defaultTodo = 'Welcome to your todo list!';

    await prisma.todo.create({
      data: {
        task: defaultTodo,
        userId: user.id,
      },
    });

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ error: 'JWT secret not configured' });
    }

    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: '24h',
    });

    return res.status(201).json({ token });
  } catch (error: any) {
    console.error('Error registering user:', error.message);
    if (
      error.code === 'P2002' &&
      error.message.includes('Unique constraint failed')
    ) {
      return res.status(409).json({ error: 'Username already exists' });
    }
    return res.status(503).json({ message: 'Internal server error' });
  }
});

authRoutes.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    const passwordIsValid = bcrypt.compareSync(password, user!.password);

    if (!user || !passwordIsValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ error: 'JWT secret not configured' });
    }

    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: '24h',
    });
    res.json({ token });
  } catch (error: any) {
    console.error('Error logging in user:', error.message);
    return res.status(503).json({ message: 'Internal server error' });
  }
});

export default authRoutes;
