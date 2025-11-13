import React, { createContext, useContext, useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import axios from "axios";

// Components
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollReset from "./components/scrolls/ScrollReset.jsx";
import ScrollToTop from "./components/scrolls/ScrollToTop.jsx";

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
import MyOrders from "./pages/MyOrders.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import TermsAndConditions from "./components/TermsAndConditions";
import Privacypolicy from "./components/Privacypolicy";
import Returnpolicy from "./components/Returnpolicy";

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

  // ✅ Restore user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Invalid user in storage:", e);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // ✅ Fetch cart when user is restored or logs in
  useEffect(() => {
    const fetchCart = async () => {
      if (!user?.token) {
        setCart([]);
        return;
      }
      try {
        const res = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setCart(res.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [user]);



  // ✅ Login (save to both state and localStorage)
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // ✅ Logout (clear from both state and localStorage)
  const logout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem("user");
  };
  

const addToCart = async (productId, quantity = 1) => {
  try {
    const existingItem = cart.find(
      (item) => item.productId._id === productId || item.productId === productId
    );

    if (existingItem) {
      // If item exists, update quantity (override with new value)
      await axios.put(
        "http://localhost:5000/api/cart/update",
        {
          productId,
          quantity, // override instead of adding
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } else {
      // Add new item
      await axios.post(
        "http://localhost:5000/api/cart",
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    }

    // Sync cart from backend after change
    const updatedCart = await axios.get("http://localhost:5000/api/cart", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setCart(updatedCart.data);
  } catch (err) {
    console.error("❌ addToCart error:", err.message);
  }
};




  const updateCartQuantity = async (productId, newQuantity) => {
    if (!user?.token) return;
    if (newQuantity <= 0) return removeFromCart(productId);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/cart/${productId}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("🔁 Updated cart quantity:", res.data);
      setCart(res.data);
    } catch (error) {
      console.error(
        "❌ Failed to update quantity:",
        error.response?.data || error.message
      );
    }
  };

  const removeFromCart = async (productId) => {
    if (!user?.token) return;
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/cart/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log("🗑️ Removed from cart:", res.data);

      // Update frontend cart state
      setCart(res.data); // If your backend returns updated cart
      // OR use this if it doesn't:
      // setCart((prevCart) => prevCart.filter((item) => item.productId._id !== productId));
    } catch (err) {
      console.error(
        "❌ Error removing from cart:",
        err.response?.data || err.message
      );
    }
  };

  const clearCart = async () => {
    if (!user?.token) return;
    try {
      await axios.delete("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log("🧹 Cleared cart");
      setCart([]);
    } catch (error) {
      console.error(
        "❌ Failed to clear cart:",
        error.response?.data || error.message
      );
    }
  };

  const updateCartFromServer = (items) => {
    setCart(items);
  };

  const fetchCartFromBackend = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setCart(res.data.cartItems || res.data);
    } catch (error) {
      console.error("Fetch cart error:", error);
    }
  };

  const isInCart = (productId) => {
    return cart.some(
      (item) =>
        item.productId === productId || item.productId?._id === productId
    );
  };

  const addOrder = (orderData) => {
    console.log("Place order logic should go here. Payload:", orderData);
  };

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
    updateCartFromServer,
    fetchCartFromBackend,
    isInCart,
  };

  const hideNavbarFooter = ["/admin"].includes(location.pathname);

  return (
    <AppContext.Provider value={contextValue}>
      <div className="App">
        {!hideNavbarFooter && <Navbar />}
        <main className={hideNavbarFooter ? "" : "main-content"}>
          <ScrollReset />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/my-orders" element={<MyOrders />} />
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
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
        </main>
        {!hideNavbarFooter && <Footer />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
