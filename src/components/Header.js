import React, { useEffect, useState } from "react";
import "./Header.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu state
  };

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <h1 className="brand">CHICHANOVA</h1>
      <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
        <a href="/" className="nav-link">
          Home
        </a>
        <a href="/about" className="nav-link">
          About
        </a>
        <a href="/about" className="nav-link">
          Contact Us
        </a>
      </nav>
      <button className="menu-toggle" onClick={toggleMenu}>
        <span className="menu-icon">&#9776;</span>
      </button>
    </header>
  );
};

export default Header;
