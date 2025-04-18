import express, { NextFunction, Request, Response } from "express";

import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} from "../controllers/authController";
import { verifyToken } from "../middleware/authMiddleware";
import { isAdmin } from "../middleware/isAdmin";
import {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  getProductsByUserId,
  getMyProduct,
  getProductsBySeller,
} from "../controllers/productController";
import {
  addToCart,
  getCart,
  removeFromCart,
  getCartCount,
  checkoutCart,
  clearCart,
  
} from "../controllers/cartController";
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
} from "../controllers/orderController";
import { pool } from "../db";
import { requestPasswordReset, resetPasswordWithToken } from '../controllers/resetController';
import jwt, {JwtPayload} from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await registerUser(req, res);
  } catch (error) {
    next(error);
  }
});
router.post("/login", loginUser);
router.get("/me", verifyToken, getProfile);
router.put("/me", verifyToken, updateProfile);
router.get("/admin/check", verifyToken, isAdmin, (req, res) => {
  res.status(200).json({ message: "You are an admin!" });
});

// Product Routes
router.post("/products", verifyToken, createProduct);
router.get("/products", getAllProducts);
router.get("/products/seller/:id", getProductsBySeller);

router.delete("/products/:id", verifyToken, deleteProduct);
router.get("/products/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getProductById(req, res);
  } catch (error) {
    next(error);
  }
});
router.get("/products/user/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getProductsByUserId(req, res);
  } catch (error) {
    next(error);
  }
});
router.get("/my-products", verifyToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getMyProduct(req, res);
  } catch (error) {
    next(error);
  }
});
router.get("/my-products", verifyToken, async (req, res) => {
  try {
    const userId = (req.user as { userId: number }).userId;

    const result = await pool.query(
      "SELECT * FROM products WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Erreur de récupération des produits" });
  }
});



// Cart Routes
router.post("/cart/:id", verifyToken, addToCart);
router.get("/cart", verifyToken, getCart);
router.delete("/cart/:id", verifyToken, removeFromCart);
router.get("/cart-count", verifyToken, getCartCount);
router.post("/cart/checkout", verifyToken, checkoutCart);
router.delete("/cart/clear", verifyToken, clearCart);

// Orders
router.post("/orders", verifyToken, createOrder);
router.get("/orders", verifyToken, getUserOrders);
router.get("/orders/:id", verifyToken, getOrderById);
router.patch("/admin/orders/:id", verifyToken, isAdmin, updateOrderStatus);
router.get("/admin/orders", verifyToken, isAdmin, getAllOrders);


router.post("/reset-request", async (req: Request, res: Response, next: NextFunction) => {
  await requestPasswordReset(req, res, next);
});
router.post('/reset/:token', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await resetPasswordWithToken(req, res, next);
  } catch (error) {
    next(error);
  }
});

const JWT_SECRET = 'my_super_secret';
router.get('/confirm/:token', async (req, res) => {

  try {
    const decoded = jwt.verify(req.params.token, JWT_SECRET) as JwtPayload;

    const userId = decoded.userId;
    await pool.query('UPDATE users SET is_verified = TRUE WHERE id = $1', [userId]);

    res.status(200).json({ message: 'Compte confirmé avec succès.' });
  } catch (error) {
    res.status(400).json({ message: 'Lien invalide ou expiré.' });
  }
});

export default router;
