import React, { useState } from "react";
import "./Products.css";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const products = [
    {
      id: 1,
      name: "Daily 2.0 Shoes",
      price: "$60",
      images: {
        Black: "/images/products/black-shoe.jpg",
        White: "/images/products/white-shoe.jpg",
        Gray: "/images/products/black-shoe.jpg",
      },
      colors: ["Black", "White", "Gray"],
      sizes: ["7", "8", "9", "10"],
    },
    {
      id: 1,
      name: "Daily 2.0 Shoes",
      price: "$60",
      images: {
        Black: "/images/products/black-shoe.jpg",
        White: "/images/products/white-shoe.jpg",
        Gray: "/images/products/black-shoe.jpg",
      },
      colors: ["Black", "White", "Gray"],
      sizes: ["7", "8", "9", "10"],
    },
  ];

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setSelectedColor(product.colors[0]); // Set default color
    setSelectedImage(product.images[product.colors[0]]);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setSelectedImage(selectedProduct.images[color]);
  };

  const closeDetails = () => {
    setSelectedProduct(null);
    setSelectedColor(null);
    setSelectedImage(null);
  };

  return (
    <section className="products">
      {selectedProduct && (
        <div className="product-details-modal">
          <button className="close-button" onClick={closeDetails}>
            ×
          </button>
          <div className="product-details-content">
            <div className="details-image-section">
              <img
                src={selectedImage}
                alt={selectedProduct.name}
                className="details-image"
              />
              <div className="color-options">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    className={`color-button ${
                      selectedColor === color ? "active" : ""
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    onClick={() => handleColorChange(color)}
                  />
                ))}
              </div>
            </div>
            <div className="details-info">
              <h2>{selectedProduct.name}</h2>
              <p className="details-price">{selectedProduct.price}</p>
              <div className="dropdowns">
                <select className="dropdown">
                  {selectedProduct.sizes.map((size) => (
                    <option key={size} value={size}>
                      Size {size}
                    </option>
                  ))}
                </select>
                <select className="dropdown">
                  {[1, 2, 3, 4, 5].map((qty) => (
                    <option key={qty} value={qty}>
                      Qty {qty}
                    </option>
                  ))}
                </select>
              </div>
              <button className="add-to-bag-button">Add to Bag</button>
            </div>
          </div>
        </div>
      )}
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={Object.values(product.images)[0]}
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
