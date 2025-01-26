import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Categories from "./pages/Categories";
import CustomizeTool from "./components/CustomizeTool";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />
        <Route path="/categories/:category" element={<Categories />} />
        <Route path="/customize" element={<CustomizeTool />} />
      </Routes>
    </Router>
  );
}

export default App;
