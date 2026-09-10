const productModule = require("../modules/product.module");

exports.getProducts = async (req, res) => {
  try {
    const products = await productModule.getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await productModule.getProductById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const product = await productModule.addProduct({
      ...req.body,
      userId: req.user?.uid || req.body.userId
    });
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await productModule.updateProduct(req.params.id, req.body);
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.removeProduct = async (req, res) => {
  try {
    await productModule.removeProduct(req.params.id);
    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
