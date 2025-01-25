import React, { useState } from "react";
import "./Products.css";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
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
    {
      id: 3,
      name: "Reebok Classic",
      price: "$90",
      image: "/images/products/product1.jpg",
      colors: ["Black", "White"],
      variations: ["Size 8", "Size 9"],
    },
    {
      id: 4,
      name: "Balenciaga Runner",
      price: "$200",
      image: "/images/products/product2.jpg",
      colors: ["Gray", "Blue"],
      variations: ["Size 9", "Size 10"],
    },
    {
      id: 5,
      name: "Puma RS-X",
      price: "$120",
      image: "/images/products/product1.jpg",
      colors: ["Red", "Yellow"],
      variations: ["Size 8", "Size 9"],
    },
    {
      id: 6,
      name: "New Balance 574",
      price: "$100",
      image: "/images/products/product2.jpg",
      colors: ["Gray", "Blue"],
      variations: ["Size 7", "Size 8"],
    },
  ];

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const closeDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <section className="products">
      {selectedProduct && (
        <div className="product-details">
          <button className="close-button" onClick={closeDetails}>
            ×
          </button>
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="details-image"
          />
          <h2 className="details-name">{selectedProduct.name}</h2>
          <p className="details-price">{selectedProduct.price}</p>
          <div className="details-section">
            <h3>Colors</h3>
            <ul>
              {selectedProduct.colors.map((color, index) => (
                <li key={index}>{color}</li>
              ))}
            </ul>
          </div>
          <div className="details-section">
            <h3>Variations</h3>
            <ul>
              {selectedProduct.variations.map((variation, index) => (
                <li key={index}>{variation}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
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
            <button
              className="view-details-button"
              onClick={() => handleViewDetails(product)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
