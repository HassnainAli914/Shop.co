const express = require("express");
const { addProduct, removeProduct, getProducts } = require("../controllers/product.controller");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/add", async (req, res) => {
  const { name, price, userId, category, image, description } = req.body;
  try {
    const product = await addProduct(name, price, userId, category, image, description);
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/remove/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    await removeProduct(id, userId);
    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
