import React, { useState, useEffect } from "react";
import "./Categories.css";

// Mock API Function to Fetch Products
const fetchProducts = async (category, page) => {
  // Replace this with a real API call
  const products = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: `${category} Product ${index + 1}`,
    price: `$${(Math.random() * 100).toFixed(2)}`,
    image: "https://via.placeholder.com/200x200",
  }));

  const pageSize = 12; // Number of products per page
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return products.slice(start, end);
};

const Categories = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Fetch products whenever the category or page changes
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts(category, page);
      setProducts(fetchedProducts);
    };
    loadProducts();
  }, [category, page]);

  return (
    <section className="categories-page">
      <h1 className="categories-title">{`Explore ${category} Products`}</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{product.price}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="page-number">Page {page}</span>
        <button
          className="pagination-button"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Categories;
