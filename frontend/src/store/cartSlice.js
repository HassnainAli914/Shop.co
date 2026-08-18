import { createSlice } from "@reduxjs/toolkit";

const initialCart = (() => {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }
})();

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: initialCart,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(
        (i) =>
          (i.id === item.id || i.productId === item.productId) &&
          i.size === item.size &&
          i.color === item.color
      );

      if (existing) {
        existing.quantity = (Number(existing.quantity) || 1) + (Number(item.quantity) || 1);
      } else {
        state.items.push({
          id: item.id || Date.now().toString(),
          productId: item.productId || item.id,
          name: item.name,
          price: Number(item.price),
          quantity: Number(item.quantity) || 1,
          image: item.image || "/images/might1.png",
          size: item.size || "Large",
          color: item.color || "Black",
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    updateCartQty: (state, action) => {
      const { id, quantity } = action.payload;
      const existing = state.items.find((item) => item.id === id);
      if (existing) {
        existing.quantity = Math.max(1, quantity);
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, updateCartQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
