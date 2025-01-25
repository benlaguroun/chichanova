import React, { useState, useEffect } from "react";
import "./Products.css";

const ProductCard = ({ product, onViewDetails }) => (
  <div className="product-card">
    <img src={product.image} alt={product.name} className="product-image" />
    <h3 className="product-name">{product.name}</h3>
    <p className="product-price">{product.price}</p>
    <button
      className="view-details-button"
      onClick={() => onViewDetails(product)}
    >
      View Details
    </button>
  </div>
);

const ProductDetails = ({ product, onClose }) => (
  <div className="product-details-modal">
    <button className="close-button" onClick={onClose}>
      ×
    </button>
    <img src={product.image} alt={product.name} className="details-image" />
    <h2 className="details-name">{product.name}</h2>
    <p className="details-price">{product.price}</p>
    <div className="details-section">
      <h3>Colors</h3>
      <ul>
        {product.colors.map((color, index) => (
          <li key={index}>{color}</li>
        ))}
      </ul>
    </div>
    <div className="details-section">
      <h3>Variations</h3>
      <ul>
        {product.variations.map((variation, index) => (
          <li key={index}>{variation}</li>
        ))}
      </ul>
    </div>
    <button className="buy-now-button">Buy Now</button>
    <button className="add-to-cart-button">Add to Cart</button>
  </div>
);

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simulating an API call
    const fetchProducts = async () => {
      const data = [
        {
          id: 1,
          name: "Nike Air Max",
          price: "$110",
          image: "/images/products/product1.jpg",
          colors: ["Red", "Blue", "Black"],
          variations: ["Size 8", "Size 9", "Size 10"],
        },
        {
          id: 2,
          name: "Adidas NMD",
          price: "$130",
          image: "/images/products/product2.jpg",
          colors: ["White", "Green"],
          variations: ["Size 7", "Size 8", "Size 9"],
        },
        // Add more products here...
      ];
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const closeDetails = () => {
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.price.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="products">
      <input
        type="text"
        className="search-input"
        placeholder="Search by name or price..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {selectedProduct && (
        <ProductDetails product={selectedProduct} onClose={closeDetails} />
      )}
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
    </section>
  );
};

export default Products;
