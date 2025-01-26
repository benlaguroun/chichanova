import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./DesignYourOwn.css"; // Import the CSS file for styling

const DesignYourOwn = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleStartDesigning = () => {
    navigate("/customize"); // Navigate to the customize route
  };

  return (
    <section className="design-your-own">
      <div className="design-container">
        <h2 className="design-title">Design Your Own</h2>
        <p className="design-text">
          Unleash your creativity and design products that reflect your style!
          With our easy-to-use customization tools, you can create personalized
          clothing, accessories, and more. Choose your base product, add images,
          text, or patterns, and make something truly unique.
        </p>
        <button
          className="start-design-button"
          onClick={handleStartDesigning} // Navigate on button click
        >
          Start Designing
        </button>
      </div>
    </section>
  );
};

export default DesignYourOwn;
