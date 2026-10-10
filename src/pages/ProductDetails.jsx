import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import useCart from "../hooks/useCart";
import Loading from "../components/Loading";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadProduct() {
      try {
        setLoading(true);
        setError("");
        setProduct(null);

        const data = await getProductById(id);

        if (active) setProduct(data);
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProduct();

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) return <Loading />;

  if (error) {
    return <p className="status-message error-message">{error}</p>;
  }

  if (!product) {
    return <p className="status-message">Product not found.</p>;
  }

  return (
    <main className="container details-page">
      <Link to="/" className="back-link">
        ← Back to products
      </Link>

      <div className="product-details">
        <div className="details-image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="details-info">
          <p className="category">{product.category}</p>
          <h1>{product.title}</h1>

          {product.rating && (
            <p className="rating">
              ★ {product.rating.rate} · {product.rating.count} reviews
            </p>
          )}

          <p className="details-price">₹{product.price.toFixed(2)}</p>
          <p className="description">{product.description}</p>

          <button onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;