import {create} from 'zustand';

/**
 * A store for managing product-related state and actions.
 * 
 * @module useProductStore
 */

/**
 * Creates a Zustand store for managing products.
 * 
 * @function useProductStore
 * @param {Function} set - Zustand's set function to update the store state.
 * @returns {Object} The product store with state and actions.
 */

/**
 * @typedef {Object} Product
 * @property {string} _id - The unique identifier of the product.
 * @property {string} name - The name of the product.
 * @property {string} imageURL - The URL of the product's image.
 * @property {number} price - The price of the product.
 */

/**
 * @property {Product[]} products - The list of products in the store.
 * @property {Function} setProducts - Updates the list of products in the store.
 * @property {Function} createProduct - Adds a new product to the store.
 * @property {Function} fetchProducts - Fetches all products from the server and updates the store.
 * @property {Function} deleteProduct - Deletes a product from the store and the server.
 */

/**
 * Adds a new product to the store and the server.
 * 
 * @async
 * @function createProduct
 * @param {Object} newProduct - The product to be added.
 * @param {string} newProduct.name - The name of the product.
 * @param {string} newProduct.imageURL - The URL of the product's image.
 * @param {number} newProduct.price - The price of the product.
 * @returns {Promise<Object>} A result object containing success status and a message.
 */

/**
 * Fetches all products from the server and updates the store.
 * 
 * @async
 * @function fetchProducts
 * @returns {Promise<void>}
 */

/**
 * Deletes a product from the store and the server.
 * 
 * @async
 * @function deleteProduct
 * @param {string} pid - The unique identifier of the product to be deleted.
 * @returns {Promise<Object>} A result object containing success status and a message.
 */
export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.imageURL || !newProduct.price) {
            return {success:false, message:"Please fill in all fields"};
        }
        const res = await fetch("/api/products", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newProduct)
        });
        const data = await res.json();
        set((state) => ({products: [...state.products, data.data] }));
        return { success: true, message: "Product Added Successfully!"};
    },
    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        console.log("Fetched products = ", data.data);
        set({ products: data.data });
    },
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if(!data.success) {
            return { success: false, message: data.message };
        } else {
            set(state => ({ products: state.products.filter(product => product._id !== pid) }));
            return { success: true, message: data.message };
        }
    },
    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message};

        // Immediately update the UI
        set((state) => ({
            products: state.products.map((product) => (product._id === pid ? data.data : product)),
        }))
    }
}))
/*

This is similar to doing this, but it's global:

const [state,setState] = useState([]);
*/