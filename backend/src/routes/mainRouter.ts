import express, { Request, Response } from 'express';
import { registerUser, loginUser, getProfile, updateProfile } from '../controllers/authController';
import { verifyToken } from '../middleware/authMiddleware';
import { isAdmin } from '../middleware/isAdmin';
import {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  getMyProducts
} from '../controllers/productController';
import {
  addToCart,
  getCart,
  removeFromCart,
  getCartCount,
  checkoutCart
} from '../controllers/cartController';
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders
} from '../controllers/orderController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', verifyToken, getProfile);
router.put('/me', verifyToken, updateProfile);
router.get('/admin/check', verifyToken, isAdmin, (req, res) => {
  res.status(200).json({ message: 'You are an admin!' });
});

// Product Routes
router.post('/products', verifyToken, createProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', async (req: Request, res: Response) => {
  try {
    await getProductById(req, res);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ message: 'Internal Server Error', error: errorMessage });
  }
});
router.delete('/products/:id', verifyToken, deleteProduct);
router.get('/my-products', verifyToken, getMyProducts);

// Cart Routes
router.post('/cart/:id', verifyToken, addToCart);
router.get('/cart', verifyToken, getCart);
router.delete('/cart/:id', verifyToken, removeFromCart);
router.get('/cart-count', verifyToken, getCartCount);
router.post('/cart/checkout', verifyToken, checkoutCart);

// Orders
router.post('/orders', verifyToken, createOrder);
router.get('/orders', verifyToken, getUserOrders);
router.get('/orders/:id', verifyToken, getOrderById);
router.patch('/admin/orders/:id', verifyToken, isAdmin, updateOrderStatus);
router.get('/admin/orders', verifyToken, isAdmin, getAllOrders);

export default router;