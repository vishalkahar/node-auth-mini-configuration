import { uploadToCloudinary } from '../helpers/cloudinary-helper.js';
import Image from '../models/Image.js';
import fs from 'fs';
import cloudinary from '../config/couldinary.js';

const uploadImageController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'File is required. Please upload a file.',
            });
        }

        const { url, publicId } = await uploadToCloudinary(req.file.path);
        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId,
        });

        await newlyUploadedImage.save();

        fs.unlinkSync(req.file.path);

        res.status(201).json({
            success: true,
            message: 'Image uploaded successfully',
            image: newlyUploadedImage,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Image upload failed',
            error: error.message,
        });
    }
}

const fetchImagesController = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
        const totalImages = await Image.countDocuments();
        const totalPages = Math.ceil(totalImages / limit);

        const sortObj = {};
        sortObj[sortBy] = sortOrder;
        const images = await Image.find().sort(sortObj).skip(skip).limit(limit);

        if (images) {
            res.status(200).json({
                success: true,
                currentPage: page,
                totalPages,
                totalImages,
                message: 'Images fetched successfully',
                images,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching images',
            error: error.message,
        });
    }
}

const deleteImageController = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.userInfo;

        const image = await Image.findById(id);

        if (!image) {
            return res.status(404).json({
                success: false,
                message: 'Image not found',
            });
        }

        if (image.uploadedBy.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized to delete this image',
            });
        }

        await cloudinary.uploader.destroy(image.publicId);

        await Image.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Image deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting image',
            error: error.message,
        });
    }
}

export {
    uploadImageController,
    fetchImagesController,
    deleteImageController,
};
