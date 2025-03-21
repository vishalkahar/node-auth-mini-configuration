import 'dotenv/config';
import express from 'express';
import connectDB from './database/db.js';
import authRoutes from './routes/auth-routes.js';
import homeRoutes from './routes/home-routes.js';
import adminRoutes from './routes/admin-routes.js';
import imageRoutes from './routes/image-routes.js';

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/image', imageRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


