const express = require("express");
const { getProducts, getProductById, addProduct, updateProduct, removeProduct } = require("../controllers/product.controller");

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/add", addProduct);
router.put("/update/:id", updateProduct);
router.delete("/remove/:id", removeProduct);

module.exports = router;
