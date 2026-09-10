const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const authRouter = require("./routes/user.router");
const productRouter = require("./routes/product.router");
const customerRouter = require("./routes/customer.router");
const orderRouter = require("./routes/order.router");
const chatRouter = require("./routes/chat.router");
const statsRouter = require("./routes/stats.router");

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register routes
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/customers", customerRouter);
app.use("/orders", orderRouter);
app.use("/chat", chatRouter);
app.use("/stats", statsRouter);

app.get("/", (req, res) => {
  res.send({
    Port: port,
    Health: "OK",
    Status: "server is running",
    endpoints: [
      "/auth",
      "/products",
      "/customers",
      "/orders",
      "/chat",
      "/stats"
    ]
  });
});

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Backend running on Port: ${port}`);
  });
}

module.exports = app;
