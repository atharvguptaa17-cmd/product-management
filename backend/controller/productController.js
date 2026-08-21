import Product from "../models/product.js";

const createProduct = async (req, res) => {
    try {
        const { name, price, category, inStock } = req.body;
        const newProduct = new Product({
            name,
            price,
            category,
            inStock
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Unable to add product' });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Unable to load products' });
    }
};

const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Unable to load product' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { name, price, category, inStock } = req.body;
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, category, inStock, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Unable to update product' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Unable to delete product' });
    }
};

export { createProduct, getProduct, getProducts, updateProduct, deleteProduct };