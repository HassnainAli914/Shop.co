const fs = require("fs");
const path = require("path");

const filePath = path.join(process.cwd(), "data", "products.json");

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

exports.addProduct = async (name, price, userId, category = "tshirt", image = "/images/might1.png", description = "") => {
  const products = await readData();
  const newProduct = {
    id: Date.now().toString(),
    name,
    price: Number(price),
    userId,
    category,
    image: image || "/images/might1.png",
    description: description || "Quality product available on SHOP.CO",
    discountPercent: 0,
    colors: ["Black", "Blue"],
    sizes: ["S", "M", "L", "XL"]
  };
  await writeData([...products, newProduct]);
  return newProduct;
};

exports.getProducts = async () => {
  return await readData();
};

exports.removeProduct = async (id, userId) => {
  const products = await readData();
  const productExists = products.find(p => p.id === id && p.userId === userId);
  if (!productExists) {
    throw new Error("Product not found or unauthorized");
  }
  const filteredProducts = products.filter(p => !(p.id === id && p.userId === userId));
  await writeData(filteredProducts);
};
