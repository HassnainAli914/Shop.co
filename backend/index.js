const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const auth = require("./routes/user.router");
const productRouter = require("./routes/product.router");
const cartRouter = require("./routes/cart.router");

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', auth);
app.use('/products', productRouter);
app.use('/cart', cartRouter);
app.get("/", (req, res) => {
  res.send({
    Port: port,
    Health: "OK",
    Status: "server is running",
  });
});

app.listen(port, () => {
  console.log(`Backend running on Port: ${port}`);
});
