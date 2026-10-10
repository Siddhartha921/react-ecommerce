import { createContext, useEffect, useState } from "react";

export const CartContext = createContext(null);

function loadCart() {
  try {
    const saved = localStorage.getItem("ecommerce-cart");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCart);

  useEffect(() => {
    localStorage.setItem("ecommerce-cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
  }

  function updateQuantity(id, quantity) {
    if (quantity < 1) return;

    setCart((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }

  function removeFromCart(id) {
    setCart((current) => current.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}