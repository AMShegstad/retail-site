import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
//import productRoutes from './routes/api/product.routes.js';
//import userRoutes from './routes/api/users.routes.js';
import apiRoutes from './routes/index.js'
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api', apiRoutes);
//app.use('/api/users', userRoutes);

// Serve static files from the React app
const __dirname = path.resolve(); // Get the current directory
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Catch-all route to serve the React app for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});