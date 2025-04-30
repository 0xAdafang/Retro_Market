import { Request, Response } from 'express';
import { pool } from '../db';

export const addToCart = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.userId;
  const productId = parseInt(req.params.id);

  try {
    const exists = await pool.query(
      'SELECT * FROM cart_items WHERE user_id = $1 AND product_id = $2',
      [userId, productId]
    );
    if (exists.rows.length > 0) {
      res.status(400).json({ message: 'Product already in cart' });
      return;
    }

    await pool.query(
      'INSERT INTO cart_items (user_id, product_id) VALUES ($1, $2)',
      [userId, productId]
    );
    res.status(201).json({ message: 'Product added to cart' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product to cart' });
  }
};

export const getCart = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.userId;

  try {
    const result = await pool.query(
      `SELECT p.id, p.title, p.price, p.image, 1 as quantity
       FROM products p
       INNER JOIN cart_items c ON c.product_id = p.id
       WHERE c.user_id = $1`,
      [userId]
    );

    const items = result.rows.map(item => ({
      id: item.id,
      title: item.title,
      price: Number(item.price),
      quantity: Number(item.quantity), // par défaut 1
      img: item.image,
    }));

    res.status(200).json(items);
  } catch (error) {
    console.error("❌ getCart error:", error);
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
};

export const removeFromCart = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.userId;
  const productId = parseInt(req.params.id);

  try {
    const result = await pool.query(
      'DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2',
      [userId, productId]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ message: 'Item not found in cart' });
      return;
    }

    res.status(200).json({ message: 'Product removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove product from cart' });
  }
};

export const getCartCount = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.userId;

  try {
    const result = await pool.query(
      'SELECT COUNT(*) FROM cart_items WHERE user_id = $1',
      [userId]
    );
    res.status(200).json({ count: parseInt(result.rows[0].count, 10) });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cart count' });
  }
};

export const checkoutCart = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.userId;

  try {
    await pool.query('DELETE FROM cart_items WHERE user_id = $1', [userId]);
    res.status(200).json({ message: 'Checkout complete. Cart is now empty.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to checkout cart' });
  }
};

export const clearCart = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.userId;

  if (!userId) {
    res.status(401).json({ error: "Non autorisé" });
    return;
  }

  try {
    await pool.query("DELETE FROM cart_items WHERE user_id = $1", [userId]);
    res.status(200).json({ message: "Panier vidé avec succès" });
  } catch (error) {
    console.error("Erreur lors du vidage du panier :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
