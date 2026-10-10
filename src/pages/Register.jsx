import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Register() {
  const { user, register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  if (user) return <Navigate to="/" replace />;

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Demo only: no account is created on a server.
    register(name.trim(), email.trim());
    navigate("/", { replace: true });
  }

  return (
    <main className="form-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">JOIN SHOPSPHERE</p>
        <h1>Create Account</h1>
        <p className="form-subtitle">Set up your demo shopping profile.</p>

        {error && <p className="form-error">{error}</p>}

        <label htmlFor="name">Full name</label>
        <input
          id="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />

        <label htmlFor="confirm-password">Confirm password</label>
        <input
          id="confirm-password"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button className="full-width" type="submit">
          Create Account
        </button>

        <p className="auth-switch">
          Already registered? <Link to="/login">Login</Link>
        </p>

        <p className="demo-notice">
          This demo does not store or verify passwords on a server.
        </p>
      </form>
    </main>
  );
}

export default Register;