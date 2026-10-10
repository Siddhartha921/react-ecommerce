import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-image-link">
        <img src={product.image} alt={product.title} />
      </Link>

      <p className="category">{product.category}</p>

      <h3>
        <Link to={`/products/${product.id}`}>
          {product.title}
        </Link>
      </h3>

      <p className="price">₹{product.price.toFixed(2)}</p>

      {product.rating && (
        <p className="rating">
          ★ {product.rating.rate} ({product.rating.count} reviews)
        </p>
      )}

      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </article>
  );
}

export default ProductCard;