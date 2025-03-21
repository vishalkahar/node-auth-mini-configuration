require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require('./database/db');
const authRoutes = require('./routes/auth-routes');
const homeRoutes = require('./routes/home-routes');
const adminRoutes = require('./routes/admin-routes');
const imageRoutes = require('./routes/image-routes');
connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/image', imageRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


