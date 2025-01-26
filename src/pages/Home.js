import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Products from "../components/Products";
import AboutUs from "../components/AboutUs";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import DesignYourOwn from "../components/DesignYourOwn";
import CategoriesSection from "../components/CategoriesSection";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <HeroSection />
      <Products />
      <CategoriesSection />
      <DesignYourOwn />
      <AboutUs />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
