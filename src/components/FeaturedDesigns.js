import React from "react";
import "./FeaturedDesigns.css";

function FeaturedDesigns() {
  return (
    <section className="featured-designs">
      <h2>Featured Designs</h2>
      <div className="design-grid">
        <div className="design-card">Design 1</div>
        <div className="design-card">Design 2</div>
        <div className="design-card">Design 3</div>
        <div className="design-card">Design 4</div>
      </div>
    </section>
  );
}

export default FeaturedDesigns;
