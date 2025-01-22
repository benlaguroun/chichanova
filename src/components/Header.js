import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <h1>My POD Store</h1>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/category/shirts">Shirts</a>
          </li>
          <li>
            <a href="/category/accessories">Accessories</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
