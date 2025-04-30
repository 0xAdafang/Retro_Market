import { Request, Response } from 'express';
import { pool } from '../db';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.userId;
  const { products, shipping } = req.body;

  console.log("📦 Requête reçue :", req.body);

  if (!userId || !products || !shipping) {
    console.error("❌ Données manquantes");
    res.status(400).json({ error: "Données manquantes" });
    return;
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1. Insertion dans orders
    const orderResult = await client.query(
      `INSERT INTO orders (user_id, address, postal_code, phone, first_name, last_name, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       RETURNING id`,
      [
        userId,
        shipping.address,
        shipping.postalCode,
        shipping.phone,
        shipping.firstname,
        shipping.lastname,
      ]
    );

    const orderId = orderResult.rows[0].id;

    // 2. Insertion des items + suppression de la vente
    for (const product of products) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, price)
         VALUES ($1, $2, $3)`,
        [orderId, product.id, product.price]
      );

      // Marquer le produit comme indisponible
      await client.query(
        "UPDATE products SET is_available = false WHERE id = $1",
        [product.id]
      );
    }
    await client.query("DELETE FROM cart_items WHERE user_id = $1", [userId])
    await client.query("COMMIT");

    res.status(201).json({ message: "Commande créée avec succès" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("❌ Erreur création commande :", error);
    res.status(500).json({ error: "Erreur serveur" });
  } finally {
    client.release();
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  try {
    const ordersResult = await pool.query(
      `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );

    const orders = ordersResult.rows;

    const ordersWithProducts = await Promise.all(
      orders.map(async (order) => {
        const itemsResult = await pool.query(
          `SELECT oi.price, p.title, p.image, p.id AS product_id
           FROM order_items oi
           JOIN products p ON p.id = oi.product_id
           WHERE oi.order_id = $1`,
          [order.id]
        );

        const products = itemsResult.rows.map((item) => ({
          _id: item.product_id,
          title: item.title,
          price: parseFloat(item.price),
          img: item.image,
        }));

        const subtotal = products.reduce((sum, item) => sum + item.price, 0);
        const taxQC = subtotal * 0.09975;
        const taxCA = subtotal * 0.05;
        const total = subtotal + taxQC + taxCA;

        return {
          _id: order.id,
          createdAt: order.created_at,
          products,
          subtotal,
          taxQC,
          taxCA,
          total,
        };
      })
    );

    res.status(200).json(ordersWithProducts);
  } catch (error) {
    console.error("Erreur récupération commandes :", error);
    res.status(500).json({ error: "Erreur serveur" });
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

export const getOrdersByUserId = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const ordersResult = await pool.query(
      `SELECT 
        o.id AS order_id,
        o.created_at,
        o.status,
        oi.price,
        p.title,
        p.image
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN products p ON oi.product_id = p.id
      WHERE o.user_id = $1
      ORDER BY o.created_at DESC`,
      [id]
    );

    const groupedOrders: any = {};

    for (const row of ordersResult.rows) {
      const orderId = row.order_id;
      if (!groupedOrders[orderId]) {
        groupedOrders[orderId] = {
          id: orderId,
          created_at: row.created_at,
          status: row.status,
          items: [],
        };
      }

      groupedOrders[orderId].items.push({
        title: row.title,
        image: row.image,
        price: parseFloat(row.price),
      });
    }

    const orders = Object.values(groupedOrders);
    res.status(200).json(orders);
  } catch (error) {
    console.error('Erreur récupération commandes :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des commandes' });
  }
};