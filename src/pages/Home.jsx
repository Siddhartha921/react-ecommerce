import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        if (active) setProducts(data);
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "all" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      result = [...result].sort(
        (a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0)
      );
    }

    return result;
  }, [products, search, category, sort]);

  return (
    <>
      <section className="hero">
        <p className="eyebrow">YOUR EVERYDAY SHOPPING DESTINATION</p>
        <h1>Find something you'll love.</h1>
        <p>Discover products across fashion, accessories, and more.</p>
      </section>

      <main className="container">
        <div className="section-heading">
          <div>
            <h2>Explore Products</h2>
            <p>Find the right product for you.</p>
          </div>
          <span>{filteredProducts.length} products</span>
        </div>

        <div className="toolbar">
          <input
            type="search"
            placeholder="Search products..."
            aria-label="Search products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            aria-label="Filter by category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            aria-label="Sort products"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Default order</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="rating">Highest rated</option>
          </select>
        </div>

        {loading && <Loading />}

        {error && (
          <div className="error-box">
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <p className="status-message">No products match your search.</p>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default Home;