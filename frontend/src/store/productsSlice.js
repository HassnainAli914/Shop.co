import { createSlice } from "@reduxjs/toolkit";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    addProductItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeProductItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setProducts, addProductItem, removeProductItem } = productsSlice.actions;

export const fetchProducts = () => async (dispatch) => {
  try {
    const res = await fetch(`${API}/products`);
    const data = await res.json();
    if (res.ok) {
      dispatch(setProducts(data));
    }
  } catch (err) {
    console.error(err);
  }
};

export const addProduct = (productData) => async (dispatch) => {
  const res = await fetch(`${API}/products/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to add product");
  dispatch(addProductItem(data.product));
  return data.product;
};

export const removeProduct = (id, userId) => async (dispatch) => {
  const res = await fetch(`${API}/products/remove/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  if (!res.ok) throw new Error("Failed to remove product");
  dispatch(removeProductItem(id));
};

export default productsSlice.reducer;
