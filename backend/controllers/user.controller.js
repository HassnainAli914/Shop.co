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

exports.loginUser = async (email, password) => {
  try {
    const user = await findUser(email);
    if (!user) {
      throw new Error("User not found!");
    }
    const checkPass = await bcrypt.compare(password, user.password);
    if (checkPass) {
      const token = jwt.sign({ email, uid: user.uid }, jwtKey);
      return { token, user: { email: user.email, uid: user.uid } };
    } else {
      throw new Error("Invalid password!");
    }
  } catch (error) {
    throw error;
  }
};
