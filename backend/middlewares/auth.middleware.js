const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const jwtKey = process.env.JWT_SECRET || "default_jwt_secret";

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : req.headers["x-access-token"] || req.body.token || req.query.token;

    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, jwtKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};
