import { Request, Response } from 'express';
import { pool } from '../db';

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  const { title, description, price, category, image } = req.body;
  const userId = req.user?.userId;

  if (!title || !price || !category) {
    res.status(400).json({ message: 'Title, price and category are required' });
    return;
  }

  try {
    const result = await pool.query(
      'INSERT INTO products (title, description, price, category, image_url, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, description, price, category, image || null, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product' });
  }
};

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<Response> => {
  const productId = req.params.id;

  try {
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [productId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Produit introuvable' });
    }

    return res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Erreur getProductById:', err);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.id;
    const userId = req.user?.userId;

    const result = await pool.query('SELECT * FROM products WHERE id = $1', [productId]);
    const product = result.rows[0];

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    if (product.user_id !== userId) {
      res.status(403).json({ message: 'Not authorized to delete this product' });
      return;
    }

    await pool.query('DELETE FROM products WHERE id = $1', [productId]);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
};

export const getMyProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const result = await pool.query('SELECT * FROM products WHERE user_id = $1', [userId]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch your products' });
  }
};



