import React, { createContext, useContext, useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

// Components
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Shopping from "./pages/Shopping.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderHistory from "./pages/OrderHistory.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

//TermsAndConditions
import TermsAndConditions from "./components/TermsAndConditions";

//privacy Policy
import Privacypolicy from "./components/Privacypolicy";

//Return Policy
import Returnpolicy from "./components/Returnpolicy";
import ScrollReset from "./components/scrolls/ScrollReset.jsx";

// Create App Context
const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const location = useLocation();

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("techbasket_user");
    const savedCart = localStorage.getItem("techbasket_cart");
    const savedOrders = localStorage.getItem("techbasket_orders");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("techbasket_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("techbasket_user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("techbasket_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("techbasket_orders", JSON.stringify(orders));
  }, [orders]);

  // Auth functions
  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem("techbasket_user");
    localStorage.removeItem("techbasket_cart");
  };

  // Cart functions
  const addToCart = (product, quantity = 1) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...currentCart, { ...product, quantity }];
      }
    });

    // Show success message (you could add a toast here)
    console.log(`Added ${product.name} to cart`);
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Order functions
  const addOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      userId: user?.id,
      orderDate: new Date().toISOString(),
      status: "pending",
      ...orderData,
    };

    setOrders((currentOrders) => [newOrder, ...currentOrders]);
    clearCart();

    // Simulate order status updates
    setTimeout(() => {
      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === newOrder.id ? { ...order, status: "processing" } : order
        )
      );
    }, 5000);

    setTimeout(() => {
      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === newOrder.id ? { ...order, status: "shipped" } : order
        )
      );
    }, 15000);
  };

  // Context value
  const contextValue = {
    user,
    cart,
    orders,
    login,
    logout,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    addOrder,
  };

  const hideNavbarFooter = ["/admin"].includes(location.pathname);

  return (
    <AppContext.Provider value={contextValue}>
      <div className="App">
        {!hideNavbarFooter && <Navbar />}

        <main className={hideNavbarFooter ? "" : "main-content"}>
          <ScrollReset />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/privacy" element={<Privacypolicy />} />
            <Route path="/return" element={<Returnpolicy />} />
          </Routes>
        </main>

        {!hideNavbarFooter && <Footer />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
