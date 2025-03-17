// src/components/Menu/Menu.jsx
import React from "react";
import "./Menu.css";

const Menu = ({ onNavigate }) => {
  return (
    <nav className="menu">
      <ul>
        <li onClick={() => onNavigate("home")}>Home</li>
        <li onClick={() => onNavigate("products")}>Products</li>
        <li onClick={() => onNavigate("about")}>About</li>
        <li onClick={() => onNavigate("contact")}>Contact</li>
      </ul>
    </nav>
  );
};

export default Menu;
