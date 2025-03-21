import express from 'express';
const router = express.Router();
import { registerUser, loginUser, changePassword } from '../controller/auth-controller.js';
import authMiddleware from '../middleware/auth-middleware.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/change-password', authMiddleware, changePassword);
export default router;
