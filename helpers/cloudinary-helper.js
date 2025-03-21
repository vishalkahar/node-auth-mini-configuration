const cloudinary = require('../config/couldinary');

const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file);

        return {
            url: result.secure_url,
            publicId: result.public_id,
        };
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

module.exports = {
    uploadToCloudinary,
};

