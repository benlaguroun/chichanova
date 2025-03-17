const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

console.log("Your API Key:", process.env.PRINTIFY_API_KEY); // Log the API key for debugging

app.get("/api/shops", async (req, res) => {
  try {
    const response = await axios.get("https://api.printify.com/v1/shops.json", {
      headers: {
        Authorization: `Bearer ${process.env.PRINTIFY_API_KEY}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching shops:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch shops", error: error.message });
  }
});

app.get("/api/products/:shopId", async (req, res) => {
  try {
    const { shopId } = req.params;
    const response = await axios.get(
      `https://api.printify.com/v1/shops/${shopId}/products.json`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PRINTIFY_API_KEY}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
