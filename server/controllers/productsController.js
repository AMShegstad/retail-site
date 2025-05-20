import Product from '../models/product.model.js';
import mongoose from 'mongoose';

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        console.log("Products from DB: ", products);
        res.status(200).json({success: true, data: products});
    } catch(err) {
        res.status(500).json({success: false, message: "Error retrieving products."});
    }
}

export const getProductById = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({success: true, data: product});
    } catch(err) {
        res.status(500).json({success: false, message: "error retrieving product."});
    }
}

export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.imageURL || !product.description) {
        return res.status(400).json({ message: "Please fill all the fields" });
    } else {
        console.error("All necessary fields populated");
    }

    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch(error) {
        console.error("Error creating product: ", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product Deleted Successfully!"});
    } catch(err) {
        res.status(500).json({success: false, message: "Deletation Target Not Found."});
    }
}

export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success: false, message: "Id not found!"});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success: true, data: updatedProduct});
    } catch(err) {
        res.status(500).json({success: true, message: "Server Error"})
    }
}

// app.post("/api/products", async (req, res) => {
//     const product = req.body;

//     if (!product.name || !product.price || !product.imageURL || !product.description) {
//         return res.status(400).json({ message: "Please fill all the fields" });
//     } else {
//         console.error("Error!");
//     }

//     const newProduct = new Product(product);

//     try{
//         await newProduct.save();
//         res.status(201).json({ success: true, data: newProduct });
//     } catch(error) {
//         console.error("Error creating product: ", error.message);
//         res.status(500).json({ success: false, message: "Server Error"});
//     }
// });

// app.delete("/api/products/:id", async (req, res) => {
//     const {id} = req.params;
    
//     try {
//         await Product.findByIdAndDelete(id);
//         res.status(200).json({success: true, message: "Product Deleted Successfully!"});
//     } catch(err) {
//         res.status(500).json({success: false, message: "Deletation Target Not Found."});
//     }
// })

// app.put("/api/products/:id", async (req, res) => {
//     const {id} = req.params;
//     const product = req.body;

//     if(!mongoose.Types.ObjectId.isValid(id)){
//         res.status(404).json({success: false, message: "Id not found!"});
//     }

//     try {
//         const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
//         res.status(200).json({success: true, data: updatedProduct});
//     } catch(err) {
//         res.status(500).json({success: true, message: "Server Error"})
//     }
// })