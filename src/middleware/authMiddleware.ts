import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ error: 'JWT secret not configured' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err || !decoded || typeof decoded === 'string') {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.userId = (decoded as { id: number }).id;
    next();
  });
}
