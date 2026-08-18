const fs = require("fs");
const path = require("path");

const filePath = path.join(process.cwd(), "data", "cart.json");

const readData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          return resolve([]);
        }
        reject(err);
      } else {
        try {
          const str = data.toString().trim();
          resolve(str ? JSON.parse(str) : []);
        } catch (e) {
          resolve([]);
        }
      }
    });
  });
};

const writeData = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

exports.addToCart = async (productId, name, price, quantity, userId) => {
  const cartItems = await readData();
  const newItem = {
    id: Date.now().toString(),
    productId,
    name,
    price,
    quantity: quantity || 1,
    userId
  };
  await writeData([...cartItems, newItem]);
  return newItem;
};

exports.getCart = async (userId) => {
  const cartItems = await readData();
  return cartItems.filter(item => item.userId === userId);
};

exports.removeFromCart = async (id, userId) => {
  const cartItems = await readData();
  const itemExists = cartItems.find(item => item.id === id && item.userId === userId);
  if (!itemExists) {
    throw new Error("Cart item not found or unauthorized");
  }
  const filteredCart = cartItems.filter(item => !(item.id === id && item.userId === userId));
  await writeData(filteredCart);
};
