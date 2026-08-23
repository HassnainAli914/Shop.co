const express = require("express");
const { addProduct, removeProduct, getProducts } = require("../controllers/product.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/add", authMiddleware, async (req, res) => {
  const { name, price, category, image, description } = req.body;
  const userId = req.user?.uid || req.body.userId;
  try {
    const product = await addProduct(name, price, userId, category, image, description);
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/remove/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.uid || req.body.userId;
  try {
    await removeProduct(id, userId);
    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
