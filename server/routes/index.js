import Express from 'express';
import productRoutes from './api/product.routes.js';
//import userRoutes from './api/users.routes.js'

const Router = Express.Router();

Router.use("/products", productRoutes);
//Router.use("users", userRoutes);

export default Router;