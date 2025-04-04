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

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT products.*, users.username 
       FROM products 
       JOIN users ON products.user_id = users.id
       WHERE products.is_available = true
       ORDER BY products.id DESC`
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erreur récupération produits :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT products.*, users.username 
       FROM products 
       JOIN users ON users.id = products.user_id 
       WHERE products.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Produit introuvable' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Erreur récupération produit par ID :', error);
    res.status(500).json({ error: 'Erreur serveur' });
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

export const getMyProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT products.*, users.username 
       FROM products 
       JOIN users ON users.id = products.user_id 
       WHERE products.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Produit introuvable' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Erreur récupération produit perso :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

export const getProductsBySeller = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT products.*, users.username 
       FROM products
       JOIN users ON users.id = products.user_id
       WHERE users.id = $1`,
      [id]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erreur récupération produits vendeur :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const getProductsByUserId = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT products.*, users.username 
       FROM products 
       JOIN users ON users.id = products.user_id 
       WHERE users.id = $1
       ORDER BY products.id DESC`,
      [id]
    );

    return res.status(200).json(result.rows); // <- c’est bien un tableau ici
  } catch (error) {
    console.error("Erreur récupération produits de l'utilisateur :", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};




