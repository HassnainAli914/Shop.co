const express = require("express");
const { getOrders, getOrderById, createOrder, updateOrder, removeOrder } = require("../controllers/order.controller");

const router = express.Router();

router.get("/", getOrders);
router.get("/:id", getOrderById);
router.post("/create", createOrder);
router.put("/update/:id", updateOrder);
router.delete("/remove/:id", removeOrder);

module.exports = router;
