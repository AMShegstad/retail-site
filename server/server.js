import express, { urlencoded } from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();
import productRoutes from "./routes/product.routes.js";
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001

app.use(express.json()); // Accept JSON data in req.body.
app.use(express.urlencoded({extended: true }));
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`server started at http://localhost:${PORT}`);
})