const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { createUser, findUser } = require("../modules/user.module");

dotenv.config();
const jwtKey = process.env.JWT_SECRET || "default_jwt_secret";

exports.createUser = async (email, password) => {
  try {
    const uid = Date.now().toString();
    await createUser(email, password, uid);
    return { email, uid };
  } catch (error) {
    throw error;
  }
};

exports.loginUser = async (email, password, requireAdmin = false) => {
  try {
    const user = await findUser(email);
    
    // Built-in default admin account fallback if database has not seeded one
    if (!user && (email === "admin@dashboard.com" || email === "admin@berry.com" || email === "admin@admin.com" || email === "admin@gmail.com") && password === "admin123") {
      const adminPayload = { email, uid: "admin_default", role: "admin" };
      const token = jwt.sign(adminPayload, jwtKey);
      return { token, user: { email, uid: "admin_default", role: "admin", name: "Administrator" } };
    }

    if (!user) {
      throw new Error("User not found!");
    }

    const checkPass = await bcrypt.compare(password, user.password);
    if (checkPass) {
      const userRole = user.role || (email.includes("admin") ? "admin" : "user");
      if (requireAdmin && userRole !== "admin") {
        throw new Error("Access denied: Only users with the 'admin' role can log in to this dashboard.");
      }
      const token = jwt.sign({ email, uid: user.uid, role: userRole }, jwtKey);
      return { token, user: { email: user.email, uid: user.uid, role: userRole, name: user.name || "Admin User" } };
    } else {
      throw new Error("Invalid password!");
    }
  } catch (error) {
    throw error;
  }
};

exports.loginAdmin = async (email, password) => {
  return exports.loginUser(email, password, true);
};
