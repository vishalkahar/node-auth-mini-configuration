const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const isAdminUser = require('../middleware/admin-middleware');
const router = express.Router();

router.get('/welcome', authMiddleware, isAdminUser, (req, res) => {
    res.json({ message: 'Admin page' });
});

module.exports = router;

