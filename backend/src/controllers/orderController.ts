import { Request, Response } from 'express';
import { pool } from '../db';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.userId;

  try {
    const cartItems = await pool.query(
      'SELECT product_id FROM cart_items WHERE user_id = $1',
      [userId]
    );

    if (cartItems.rows.length === 0) {
      res.status(400).json({ message: 'Cart is empty' });
      return;
    }

    const order = await pool.query(
      "INSERT INTO orders (user_id, status) VALUES ($1, 'pending') RETURNING id",
      [userId]
    );
    const orderId = order.rows[0].id;

    const insertItemsQuery = `
      INSERT INTO order_items (order_id, product_id)
      VALUES ${cartItems.rows.map((_: any, i: number) => `($1, $${i + 2})`).join(',')}
    `;
    const insertParams = [orderId, ...cartItems.rows.map((r: { product_id: any; }) => r.product_id)];

    await pool.query(insertItemsQuery, insertParams);
    await pool.query('DELETE FROM cart_items WHERE user_id = $1', [userId]);

    res.status(201).json({ message: 'Order created successfully', orderId });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order' });
  }
};

export const getUserOrders = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.userId;

  try {
    const result = await pool.query(
      `SELECT o.id AS order_id, o.created_at, o.status, json_agg(p.*) AS products
       FROM orders o
       JOIN order_items oi ON o.id = oi.order_id
       JOIN products p ON p.id = oi.product_id
       WHERE o.user_id = $1
       GROUP BY o.id
       ORDER BY o.created_at DESC`,
      [userId]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.userId;
  const orderId = parseInt(req.params.id);

  try {
    const order = await pool.query(
      `SELECT o.id AS order_id, o.created_at, o.status, json_agg(p.*) AS products
       FROM orders o
       JOIN order_items oi ON o.id = oi.order_id
       JOIN products p ON p.id = oi.product_id
       WHERE o.user_id = $1 AND o.id = $2
       GROUP BY o.id`,
      [userId, orderId]
    );

    if (!order.rows.length) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    res.status(200).json(order.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch order details' });
  }
};

export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  const orderId = parseInt(req.params.id);
  const { status } = req.body;

  if (!['pending', 'shipped', 'completed'].includes(status)) {
    res.status(400).json({ message: 'Invalid status value' });
    return;
  }

  try {
    await pool.query('UPDATE orders SET status = $1 WHERE id = $2', [status, orderId]);
    res.status(200).json({ message: `Order status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status' });
  }
};

export const getAllOrders = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query(
      `SELECT o.id AS order_id, o.created_at, o.status, u.email, json_agg(p.*) AS products
       FROM orders o
       JOIN users u ON o.user_id = u.id
       JOIN order_items oi ON o.id = oi.order_id
       JOIN products p ON p.id = oi.product_id
       GROUP BY o.id, u.email
       ORDER BY o.created_at DESC`
    );

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch all orders' });
  }
};
