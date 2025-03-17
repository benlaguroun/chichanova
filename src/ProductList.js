import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css";

const ProductList = ({ shopId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${shopId}`
        );
        setProducts(response.data.data);
      } catch (error) {
        setError(
          "Failed to fetch products. Please make sure your backend server is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [shopId]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="product-list">
      {!selectedProduct ? (
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.images[0].src} alt={product.title} />
              <h3>{product.title}</h3>
              <button onClick={() => handleViewProduct(product)}>
                View Product
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="product-details">
          <button className="back-button" onClick={handleBack}>
            &larr; Back to Products
          </button>
          <h2>{selectedProduct.title}</h2>
          <img
            src={selectedProduct.images[0].src}
            alt={selectedProduct.title}
          />
          <p>{selectedProduct.description}</p>
          <button className="add-to-cart">Add to Cart</button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
