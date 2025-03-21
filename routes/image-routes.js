const express = require('express');
const router = express.Router();
const { uploadImageController, fetchImagesController, deleteImageController } = require('../controller/image-controller');
const authMiddleware = require('../middleware/auth-middleware');
const isAdminUser = require('../middleware/admin-middleware');
const uploadMiddleware = require('../middleware/upload-middleware');

router.post('/upload', authMiddleware, isAdminUser, uploadMiddleware.single('image'), uploadImageController);
router.get('/get',authMiddleware, fetchImagesController);
router.delete('/:id', authMiddleware, isAdminUser, deleteImageController);

module.exports = router;
