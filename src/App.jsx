import { BrowserRouter, Route, Routes } from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/products/:id"
              element={<ProductDetails />}
            />

            <Route path="/cart" element={<Cart />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>

          <footer className="footer">
            <p>© {new Date().getFullYear()} ShopSphere</p>
            <p>Built with React for learning and demonstration.</p>
          </footer>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;