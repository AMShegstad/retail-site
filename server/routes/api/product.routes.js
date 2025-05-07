import express from 'express';
import {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct
} from '../../controllers/productsController.js'

const router = express.Router();

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.post("/", createProduct);

router.delete("/:id", deleteProduct);

router.put("/:id", updateProduct);

export default router;