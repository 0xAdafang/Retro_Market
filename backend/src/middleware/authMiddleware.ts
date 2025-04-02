import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db';

const JWT_SECRET = 'my_super_secret';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password, username, role } = req.body;

  if (!email || !password || !username) {
    res.status(400).json({ message: 'Email, username and password required' });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (email, username, password, role) VALUES ($1, $2, $3, $4)',
      [email, username, hashedPassword, role || 'user']
    );
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password required' });
    return;
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, username: user.username, },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user' });
  }
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const result = await pool.query('SELECT id, email, username, role FROM users WHERE id = $1', [userId]);

    if (!result.rows.length) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { username } = req.body;

    if (!username) {
      res.status(400).json({ message: 'Username is required' });
      return;
    }

    await pool.query('UPDATE users SET username = $1 WHERE id = $2', [username, userId]);
    res.status(200).json({ message: 'Profile updated' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile' });
  }
};
interface JwtPayload {
    userId: number;
    email: string;
    role: string;
}
  
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      res.status(401).json({ message: 'Access denied, no token provided' });
      return;
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      req.user = decoded;
      next();
    } catch (error) {
      res.status(403).json({ message: 'Invalid or expired token' });
    }
  };
  
  // Étend Express pour permettre req.user partout
  declare global {
    namespace Express {
      interface Request {
        user?: {
          userId: number;
          email: string;
          role: string;
        };
      }
    }
  }

  // ✅ Middleware
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('❌ Token invalide :', err);
      return res.sendStatus(403);
    }
  
    const payload = decoded as { id: number; email?: string }; // 👈 ici
  
    if (payload && payload.id) {
      req.user = { userId: payload.id, email: payload.email || '', role: 'user' };
      console.log("🔐 Utilisateur authentifié :", req.user);
      next();
    } else {
      console.error("❌ Token sans id :", decoded);
      return res.sendStatus(403);
    }
  });
};