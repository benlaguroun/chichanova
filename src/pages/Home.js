import React from "react";
import HeroSection from "../components/HeroSection";
import FeaturedDesigns from "../components/FeaturedDesigns";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedDesigns />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </main>
  );
}

export default Home;
