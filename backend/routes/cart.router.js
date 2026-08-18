const express = require("express");
const { addToCart, removeFromCart, getCart } = require("../controllers/cart.controller");

const router = express.Router();

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await getCart(userId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/add", async (req, res) => {
  const { productId, name, price, quantity, userId } = req.body;
  try {
    const item = await addToCart(productId, name, price, quantity, userId);
    res.status(201).json({ message: "Item added to cart successfully", item });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/remove/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    await removeFromCart(id, userId);
    res.status(200).json({ message: "Item removed from cart successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
