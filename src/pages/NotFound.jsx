import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="container not-found">
      <p className="eyebrow">404 ERROR</p>
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link className="primary-link" to="/">
        Return Home
      </Link>
    </main>
  );
}

export default NotFound;