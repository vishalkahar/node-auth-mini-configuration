const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. No token provided.'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userInfo = decoded;
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Invalid token'
        });
    }
};

module.exports = authMiddleware;
