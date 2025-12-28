import express from 'express';
import { prisma } from './../../lib/prisma.js';

const todoRoutes = express.Router();

todoRoutes.get('/', async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const todos = await prisma.todo.findMany({
    where: { userId },
  });

  res.json(todos);
});

todoRoutes.post('/', async (req, res) => {
  const { task } = req.body;
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const todo = await prisma.todo.create({
    data: {
      task,
      userId,
    },
  });

  res.json(todo);
});

todoRoutes.put('/:id', async (req, res) => {
  const { completed } = req.body;
  const { id } = req.params;
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const updatedTodo = await prisma.todo.update({
    where: {
      id: Number(id),
      userId,
    },
    data: {
      completed: !!completed,
    },
  });

  res.json(updatedTodo);
});

todoRoutes.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const deletedTodo = await prisma.todo.delete({
    where: {
      id: Number(id),
      userId,
    },
  });

  res.json(deletedTodo);
});

export default todoRoutes;
