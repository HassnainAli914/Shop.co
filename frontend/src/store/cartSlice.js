import { createSlice } from "@reduxjs/toolkit";

const API = "http://localhost:4000";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
    },
    addToCartItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromCartItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQtyItem: (state, action) => {
      const { id, quantity } = action.payload;
      const existing = state.items.find((item) => item.id === id);
      if (existing) {
        existing.quantity = Math.max(1, quantity);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  setCart,
  addToCartItem,
  removeFromCartItem,
  updateQtyItem,
  clearCart,
} = cartSlice.actions;

export const fetchCart = (userId) => async (dispatch) => {
  try {
    const res = await fetch(`${API}/cart/${userId}`);
    const data = await res.json();
    if (res.ok) {
      dispatch(setCart(data));
    }
  } catch (err) {
    console.error(err);
  }
};

export const addToCart = (item, userId) => async (dispatch) => {
  const res = await fetch(`${API}/cart/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      productId: item.id || item._id,
      name: item.name,
      price: Number(item.price),
      quantity: Number(item.quantity || item.qty) || 1,
      userId,
    }),
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(
      addToCartItem({
        ...data.item,
        image: item.image || "/images/might1.png",
        size: item.size || "Large",
        color: item.color || "Black",
      })
    );
  }
};

export const removeFromCart = (id, userId) => async (dispatch) => {
  const res = await fetch(`${API}/cart/remove/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  if (res.ok) {
    dispatch(removeFromCartItem(id));
  }
};

export const updateCartQty = (id, quantity) => (dispatch) => {
  dispatch(updateQtyItem({ id, quantity }));
};

export default cartSlice.reducer;
