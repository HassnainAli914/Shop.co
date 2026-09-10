const orderModule = require("../modules/order.module");

exports.getOrders = async (req, res) => {
  try {
    const orders = await orderModule.getOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await orderModule.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const order = await orderModule.createOrder(req.body);
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await orderModule.updateOrder(req.params.id, req.body);
    res.status(200).json({ message: "Order updated successfully", order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.removeOrder = async (req, res) => {
  try {
    await orderModule.removeOrder(req.params.id);
    res.status(200).json({ message: "Order removed successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
