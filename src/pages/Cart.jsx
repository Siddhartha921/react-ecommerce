import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";

function Cart() {
  const {
    cart,
    subtotal,
    updateQuantity,
    removeFromCart,
  } = useCart();

  if (cart.length === 0) {
    return (
      <main className="container empty-cart">
        <h1>Your cart is empty</h1>
        <p>Explore the store and find something you like.</p>
        <Link className="primary-link" to="/">
          Browse Products
        </Link>
      </main>
    );
  }

  return (
    <main className="container">
      <h1 className="page-title">Your Shopping Cart</h1>

      <div className="cart-layout">
        <section className="cart-items">
          {cart.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.title} />

              <div className="cart-item-info">
                <Link to={`/products/${item.id}`}>
                  <h3>{item.title}</h3>
                </Link>

                <p>₹{item.price.toFixed(2)} each</p>

                <div className="quantity-controls">
                  <button
                    aria-label={`Decrease quantity of ${item.title}`}
                    disabled={item.quantity <= 1}
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    aria-label={`Increase quantity of ${item.title}`}
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item-end">
                <strong>
                  ₹{(item.price * item.quantity).toFixed(2)}
                </strong>
                <button
                  className="text-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </section>

        <aside className="summary-card">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="summary-row summary-total">
            <span>Total</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <Link className="primary-link full-width" to="/checkout">
            Proceed to Checkout
          </Link>

          <Link className="continue-link" to="/">
            Continue shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}

export default Cart;