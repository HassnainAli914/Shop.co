import { createSlice } from "@reduxjs/toolkit";
import { clearCartItems } from "./cartSlice";

const API = "http://localhost:4000";

const initialUser = (() => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
})();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: initialUser,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export const signupUser = (email, password) => async (dispatch) => {
  const res = await fetch(`${API}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Signup failed");
  }
  dispatch(setUser(data.user));
  return data.user;
};

export const loginUser = (email, password) => async (dispatch) => {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Login failed");
  }
  dispatch(setUser(data.user));
  return data.user;
};

export const logoutUser = () => (dispatch) => {
  dispatch(clearUser());
  dispatch(clearCartItems());
};

export default authSlice.reducer;
