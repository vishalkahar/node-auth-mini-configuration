import express from 'express';
const router = express.Router();
import { uploadImageController, fetchImagesController, deleteImageController } from '../controller/image-controller.js';
import authMiddleware from '../middleware/auth-middleware.js';
import isAdminUser from '../middleware/admin-middleware.js';
import uploadMiddleware from '../middleware/upload-middleware.js';

router.post('/upload', authMiddleware, isAdminUser, uploadMiddleware.single('image'), uploadImageController);
router.get('/get', authMiddleware, fetchImagesController);
router.delete('/:id', authMiddleware, isAdminUser, deleteImageController);

export default router;
