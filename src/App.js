// src/App.js
import React, { useState } from "react";
import Menu from "./components/Menu/Menu";
import HeroSection from "./components/HeroSection/HeroSection";
import ShopList from "./components/ShopList/ShopList";
import ProductList from "./ProductList";
import "./App.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedShopId, setSelectedShopId] = useState(null);

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleShopSelect = (shopId) => {
    setSelectedShopId(shopId);
    setCurrentPage("products");
  };

  return (
    <div className="App">
      <Menu onNavigate={handleNavigate} />
      {currentPage === "home" && (
        <>
          <HeroSection />
          <ShopList onShopSelect={handleShopSelect} />
        </>
      )}
      {currentPage === "products" && selectedShopId && (
        <ProductList shopId={selectedShopId} />
      )}
      {currentPage === "about" && <h1>About Us</h1>}
      {currentPage === "contact" && <h1>Contact Us</h1>}
    </div>
  );
};

export default App;
