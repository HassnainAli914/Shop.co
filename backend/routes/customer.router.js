const express = require("express");
const { getCustomers, getCustomerById, addCustomer, updateCustomer, removeCustomer } = require("../controllers/customer.controller");

const router = express.Router();

router.get("/", getCustomers);
router.get("/:id", getCustomerById);
router.post("/add", addCustomer);
router.put("/update/:id", updateCustomer);
router.delete("/remove/:id", removeCustomer);

module.exports = router;
