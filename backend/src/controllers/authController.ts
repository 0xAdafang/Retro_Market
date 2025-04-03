import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db';

const JWT_SECRET = 'my_super_secret';

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, username, prenom, nom, genre } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ error: 'Champs requis manquants' });
  }

  try {
    const userExists = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR username = $2',
      [email, username]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'Email ou pseudo déjà utilisé' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users (email, password, username, prenom, nom, genre)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [email, hashedPassword, username, prenom, nom, genre]
    );

    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    console.error('Erreur register :', error);
    res.status(500).json({ error: 'Erreur serveur' });
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

    const token = jwt.sign({ userId: user.id, email: user.email, username: user.username }, JWT_SECRET, {
      expiresIn: '24h'
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
        
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user' });
  }
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const result = await pool.query('SELECT id, email, username FROM users WHERE id = $1', [userId]);

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
    console.error("❌ registerUser error:", error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};
