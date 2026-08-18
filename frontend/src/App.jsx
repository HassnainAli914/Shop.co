import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, removeProduct } from "./store/productsSlice";
import { addToCart, removeFromCart, updateCartQty } from "./store/cartSlice";
import { loginUser, signupUser, logoutUser } from "./store/authSlice";

import Header from "./components/Header";
import Hero from "./components/Herro";
import FontShowcase from "./components/Retangle";
import Product from "./components/products";
import Top_sell from "./components/Top_sell";
import Dress from "./components/dress";
import CustomerCarousel from "./components/Customer";
import Footer from "./components/Footer";
import CasualPage from "./pages/CasualPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import BrandsPage from "./pages/BrandsPage";
import AuthModal from "./components/AuthModal";

export default function App() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.products.items);
  const cart = useSelector((state) => state.cart.items);

  const [currentView, setCurrentView] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSignup = async (email, password) => {
    await dispatch(signupUser(email, password));
    setAuthOpen(false);
  };

  const handleLogin = async (email, password) => {
    await dispatch(loginUser(email, password));
    setAuthOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setCurrentView("home");
  };

  const handleDeleteProduct = (productId) => {
    if (!user) return;
    dispatch(removeProduct(productId, user.uid));
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleUpdateCartQty = (id, quantity) => {
    dispatch(updateCartQty({ id, quantity }));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleSelectProduct = (prod) => {
    setSelectedProduct(prod);
    setCurrentView("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredProducts = searchQuery
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-gray-900 font-sans">
      <Header
        cart={cart}
        user={user}
        onNavigate={handleNavigate}
        onOpenAuth={() => setAuthOpen(true)}
        onLogout={handleLogout}
        onSearch={setSearchQuery}
      />

      <main className="flex-grow">
        {currentView === "home" && (
          <div>
            <Hero onNavigate={handleNavigate} />
            <FontShowcase />
            <Product
              products={filteredProducts}
              onSelectProduct={handleSelectProduct}
              onNavigate={handleNavigate}
            />
            <Top_sell
              products={filteredProducts}
              onSelectProduct={handleSelectProduct}
              onNavigate={handleNavigate}
            />
            <Dress onNavigate={handleNavigate} />
            <CustomerCarousel />
          </div>
        )}

        {currentView === "casual" && (
          <CasualPage
            products={filteredProducts}
            currentUser={user}
            onDeleteProduct={handleDeleteProduct}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === "detail" && (
          <ProductDetailPage
            product={selectedProduct}
            products={products}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === "cart" && (
          <CartPage
            cart={cart}
            onUpdateQty={handleUpdateCartQty}
            onRemoveItem={handleRemoveFromCart}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === "brands" && (
          <BrandsPage onNavigate={handleNavigate} />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    </div>
  );
}
