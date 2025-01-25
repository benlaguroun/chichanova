import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Products from "../components/Products";
import AboutUs from "../components/AboutUs";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <HeroSection />
      <Products />
      <AboutUs />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
