import React, { useState } from "react";
import "./CustomizeTool.css";

const CustomizeTool = () => {
  const [selectedProduct, setSelectedProduct] = useState("T-Shirt");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [customText, setCustomText] = useState("");

  const handleProductChange = (e) => setSelectedProduct(e.target.value);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setUploadedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleTextChange = (e) => setCustomText(e.target.value);

  const handleClearDesign = () => {
    setUploadedImage(null);
    setCustomText("");
  };

  return (
    <div className="customize-tool">
      <h2 className="customize-title">Customize Your {selectedProduct}</h2>

      <div className="customize-options">
        {/* Product Selector */}
        <label htmlFor="product-select">Choose a Product:</label>
        <select
          id="product-select"
          value={selectedProduct}
          onChange={handleProductChange}
        >
          <option value="T-Shirt">T-Shirt</option>
          <option value="Hoodie">Hoodie</option>
          <option value="Mug">Mug</option>
          <option value="Cap">Cap</option>
        </select>

        {/* Image Upload */}
        <label htmlFor="image-upload">Upload Your Image:</label>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleImageUpload}
        />

        {/* Add Custom Text */}
        <label htmlFor="custom-text">Add Your Text:</label>
        <input
          type="text"
          id="custom-text"
          placeholder="Enter your text here"
          value={customText}
          onChange={handleTextChange}
        />
      </div>

      {/* Design Preview */}
      <div className="design-preview">
        <h3>Preview:</h3>
        <div className="preview-product">
          <div className="product-preview-container">
            <p className="preview-text">{customText}</p>
            {uploadedImage && (
              <img
                src={uploadedImage}
                alt="Uploaded Design"
                className="preview-image"
              />
            )}
          </div>
          <p className="preview-product-name">{selectedProduct}</p>
        </div>
      </div>

      {/* Clear Button */}
      <button className="clear-design-button" onClick={handleClearDesign}>
        Clear Design
      </button>
    </div>
  );
};

export default CustomizeTool;
