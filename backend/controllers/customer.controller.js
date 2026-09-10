const customerModule = require("../modules/customer.module");

exports.getCustomers = async (req, res) => {
  try {
    const customers = await customerModule.getCustomers();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const customer = await customerModule.getCustomerById(req.params.id);
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addCustomer = async (req, res) => {
  try {
    const customer = await customerModule.addCustomer(req.body);
    res.status(201).json({ message: "Customer added successfully", customer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const customer = await customerModule.updateCustomer(req.params.id, req.body);
    res.status(200).json({ message: "Customer updated successfully", customer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.removeCustomer = async (req, res) => {
  try {
    await customerModule.removeCustomer(req.params.id);
    res.status(200).json({ message: "Customer removed successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
