import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";

function Checkout() {
  const { user } = useAuth();
  const { cart, subtotal, clearCart } = useCart();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState({});
  const [orderNumber, setOrderNumber] = useState("");

  if (cart.length === 0 && !orderNumber) {
    return <Navigate to="/cart" replace />;
  }

  function handleChange(e) {
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Enter your full name.";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.address.trim()) {
      nextErrors.address = "Enter your delivery address.";
    }

    if (!form.city.trim()) nextErrors.city = "Enter your city.";

    if (!/^\d{5,6}$/.test(form.postalCode.trim())) {
      nextErrors.postalCode = "Enter a 5- or 6-digit postal code.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    // Demo order only: no real payment or order is sent to a server.
    setOrderNumber(`DEMO-${Date.now().toString().slice(-8)}`);
    clearCart();
  }

  if (orderNumber) {
    return (
      <main className="form-page">
        <section className="auth-card success-card">
          <div className="success-icon">✓</div>
          <h1>Order confirmed!</h1>
          <p>Your demo order has been created successfully.</p>
          <p>
            Order reference: <strong>{orderNumber}</strong>
          </p>
          <p className="demo-notice">
            This is a demonstration. No payment was collected and no real
            order was submitted.
          </p>
          <Link className="primary-link full-width" to="/">
            Continue Shopping
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="container checkout-page">
      <h1 className="page-title">Checkout</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Delivery Details</h2>

          <label htmlFor="name">Full name</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="field-error">{errors.name}</p>}

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="field-error">{errors.email}</p>}

          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            rows={3}
            value={form.address}
            onChange={handleChange}
            required
          />
          {errors.address && (
            <p className="field-error">{errors.address}</p>
          )}

          <label htmlFor="city">City</label>
          <input
            id="city"
            name="city"
            value={form.city}
            onChange={handleChange}
            required
          />
          {errors.city && <p className="field-error">{errors.city}</p>}

          <label htmlFor="postalCode">Postal code</label>
          <input
            id="postalCode"
            name="postalCode"
            inputMode="numeric"
            value={form.postalCode}
            onChange={handleChange}
            required
          />
          {errors.postalCode && (
            <p className="field-error">{errors.postalCode}</p>
          )}

          <button className="full-width" type="submit">
            Place Demo Order
          </button>
        </form>

        <aside className="summary-card">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div className="summary-row" key={item.id}>
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <div className="summary-row summary-total">
            <span>Total</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <p className="demo-notice">
            Demo checkout only. No payment is processed.
          </p>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;