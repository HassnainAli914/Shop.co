const { addToCart, removeFromCart, getCart } = require("../modules/cart.module");

exports.addToCart = async (productId, name, price, quantity, userId) => {
  return await addToCart(productId, name, price, quantity, userId);
};

exports.getCart = async (userId) => {
  return await getCart(userId);
};

exports.removeFromCart = async (id, userId) => {
  return await removeFromCart(id, userId);
};
