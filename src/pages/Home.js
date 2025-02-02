import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";

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
      <CategoriesSection />
      <DesignYourOwn />
      <Testimonials />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default Home;
