import React from "react";
import "./HomePage.css";
import Menu from "../Menu/Menu";
import HeroSection from "../HeroSection/HeroSection";

const HomePage = () => {
  return (
    <div className="home-page">
      <Menu />
      <HeroSection />
    </div>
  );
};

export default HomePage;
