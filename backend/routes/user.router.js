const express = require("express");
const { createUser, loginUser, loginAdmin } = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await createUser(email, password);
    res.status(201).json({ message: "User registered successfully!", user });
  } catch (error) {
    res.status(400).json({ error: error.message || "Failed to register user" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password, requireAdmin } = req.body;
  try {
    const result = await loginUser(email, password, !!requireAdmin);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message || "Login failed" });
  }
});

router.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await loginAdmin(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ error: error.message || "Admin login failed" });
  }
});

router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
