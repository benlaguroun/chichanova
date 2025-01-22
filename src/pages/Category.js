import React from "react";
import { useParams } from "react-router-dom";

function Category() {
  const { name } = useParams();

  return (
    <div>
      <h1>Category: {name}</h1>
      <p>Displaying products for the "{name}" category.</p>
    </div>
  );
}

export default Category;
