import React from "react";
import { useNavigate } from "react-router-dom";
import "./CategoriesSection.css";

const CategoriesSection = () => {
  const navigate = useNavigate();

  const handleNavigate = (category) => {
    navigate(`/categories/${category}`); // Navigate to the specific category
  };

  return (
    <section className="categories-section">
      <h2 className="categories-title">Shop By Categories</h2>
      <div className="categories-container">
        <div className="category-card" onClick={() => handleNavigate("men")}>
          <img
            src="/images/categories/CA-MEN.jpg"
            alt="Men"
            className="category-image"
          />
          <div className="category-overlay">
            <p className="category-text">Men</p>
          </div>
        </div>
        <div className="category-card" onClick={() => handleNavigate("women")}>
          <img
            src="/images/categories/CA-WOMEN.jpg"
            alt="Women"
            className="category-image"
          />
          <div className="category-overlay">
            <p className="category-text">Women</p>
          </div>
        </div>
        <div
          className="category-card"
          onClick={() => handleNavigate("children")}
        >
          <img
            src="/images/categories/CA-CHILDREN.jpg"
            alt="Children"
            className="category-image"
          />
          <div className="category-overlay">
            <p className="category-text">Children</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
