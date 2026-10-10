import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user) return <Navigate to="/" replace />;

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Demo only: this does not verify credentials with a server.
    login(email.trim());

    navigate(location.state?.from || "/", { replace: true });
  }

  return (
    <main className="form-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">WELCOME BACK</p>
        <h1>Login</h1>
        <p className="form-subtitle">
          Sign in to continue shopping.
        </p>

        {error && <p className="form-error">{error}</p>}

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
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="full-width" type="submit">
          Login
        </button>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register</Link>
        </p>

        <p className="demo-notice">
          Demo login: any valid email and non-empty password will work.
        </p>
      </form>
    </main>
  );
}

export default Login;