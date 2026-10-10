import { Link, NavLink } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        ShopSphere
      </Link>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/cart">Cart ({cartCount})</NavLink>

        {user ? (
          <>
            <span className="welcome">
              Hi, {user.name || user.email}
            </span>
            <button className="nav-button" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;