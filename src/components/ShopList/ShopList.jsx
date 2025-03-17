import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ShopList.css";

const ShopList = ({ onShopSelect }) => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/shops");
        setShops(response.data);
      } catch (error) {
        setError(
          "Failed to fetch shops. Please make sure your backend server is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  if (loading) return <p>Loading shops...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="shop-list">
      <h1>Select a Shop</h1>
      <ul>
        {shops.map((shop) => (
          <li key={shop.id} onClick={() => onShopSelect(shop.id)}>
            {shop.title} (ID: {shop.id})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopList;
