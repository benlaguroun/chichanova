// This is a client for Printify API integration
const PRINTIFY_API_URL = "https://api.printify.com/v1";

export interface PrintifyProduct {
  id: string;
  title: string;
  description: string;
  images: PrintifyImage[];
  variants: PrintifyVariant[];
  tags: string[];
  options: PrintifyOption[];
  created_at?: string;
  updated_at?: string;
}

export interface PrintifyImage {
  src: string;
  variant_ids: string[];
  position: string;
  is_default: boolean;
}

export interface PrintifyVariant {
  id: string;
  title: string;
  price: number;
  sku: string;
  is_enabled: boolean;
  options: Record<string, string>;
}

export interface PrintifyOption {
  name: string;
  type: string;
  values: string[];
}

export interface PrintifyOrder {
  id: string;
  external_id: string;
  line_items: PrintifyLineItem[];
  shipping_method: number;
  shipping_address: PrintifyAddress;
  send_shipping_notification: boolean;
}

export interface PrintifyLineItem {
  product_id: string;
  variant_id: number;
  quantity: number;
}

export interface PrintifyAddress {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  region: string;
  address1: string;
  address2: string;
  city: string;
  zip: string;
}

export interface PrintifyShop {
  id: string;
  title: string;
  connection_status: string;
}

// Mock data for development and fallback
export const MOCK_SHOP_ID = "mock-shop-id-12345";

// Get shop ID from API key
export async function getShopId(apiKey: string): Promise<string> {
  try {
    console.log("Fetching shop ID from Printify API...");

    if (!apiKey || apiKey.trim() === "") {
      console.error("API Key is empty or invalid");
      return MOCK_SHOP_ID;
    }

    const response = await fetch(`${PRINTIFY_API_URL}/shops.json`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      cache: "no-store", // Disable caching to ensure fresh data
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}): ${errorText}`);
      throw new Error(
        `Failed to fetch shops: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    console.log("Printify shops response:", JSON.stringify(data));

    if (!data.data || data.data.length === 0) {
      console.warn(
        "No shops found for this API key. Using mock shop ID for development."
      );
      return MOCK_SHOP_ID;
    }

    // Return the ID of the first shop
    return data.data[0].id;
  } catch (error) {
    console.error("Error fetching shop ID from Printify:", error);
    console.warn("Using mock shop ID as fallback due to error");
    return MOCK_SHOP_ID;
  }
}

// Get all products
export async function getProducts(
  shopId: string,
  apiKey: string
): Promise<PrintifyProduct[]> {
  try {
    // If using mock shop ID, return mock products
    if (shopId === MOCK_SHOP_ID) {
      console.log("Using mock products data");
      return getMockPrintifyProducts();
    }

    if (!apiKey || apiKey.trim() === "") {
      console.error("API Key is empty or invalid");
      return getMockPrintifyProducts();
    }

    console.log(`Fetching products from Printify for shop ID: ${shopId}`);
    const response = await fetch(
      `${PRINTIFY_API_URL}/shops/${shopId}/products.json`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        cache: "no-store", // Disable caching to ensure fresh data
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}): ${errorText}`);
      throw new Error(
        `Failed to fetch products: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    console.log(`Received ${data.data?.length || 0} products from Printify`);
    return data.data || [];
  } catch (error) {
    console.error("Error fetching products from Printify:", error);
    // Return mock products as fallback
    return getMockPrintifyProducts();
  }
}

// Get single product by ID
export async function getProduct(
  shopId: string,
  productId: string,
  apiKey: string
): Promise<PrintifyProduct> {
  try {
    // If using mock shop ID, return mock product
    if (shopId === MOCK_SHOP_ID) {
      console.log("Using mock product data");
      const mockProducts = getMockPrintifyProducts();
      const mockProduct =
        mockProducts.find((p) => p.id === productId) || mockProducts[0];
      return mockProduct;
    }

    console.log(
      `Fetching product ${productId} from Printify for shop ID: ${shopId}`
    );
    const response = await fetch(
      `${PRINTIFY_API_URL}/shops/${shopId}/products/${productId}.json`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        cache: "no-store", // Disable caching to ensure fresh data
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}): ${errorText}`);
      throw new Error(
        `Failed to fetch product: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    console.log(`Received product data from Printify for ID: ${productId}`);
    return data;
  } catch (error) {
    console.error(`Error fetching product ${productId} from Printify:`, error);
    // Return first mock product as fallback
    return getMockPrintifyProducts()[0];
  }
}

// Create a new order
export async function createOrder(
  shopId: string,
  order: PrintifyOrder,
  apiKey: string
): Promise<any> {
  try {
    // If using mock shop ID, return mock response
    if (shopId === MOCK_SHOP_ID) {
      console.log("Using mock order creation");
      return { success: true, order_id: "mock-order-" + Date.now() };
    }

    const response = await fetch(
      `${PRINTIFY_API_URL}/shops/${shopId}/orders.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}): ${errorText}`);
      throw new Error(
        `Failed to create order: ${response.status} - ${errorText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating order with Printify:", error);
    throw error;
  }
}

// Get shipping rates
export async function getShippingRates(
  shopId: string,
  address: PrintifyAddress,
  items: PrintifyLineItem[],
  apiKey: string
): Promise<any> {
  try {
    // If using mock shop ID, return mock shipping rates
    if (shopId === MOCK_SHOP_ID) {
      console.log("Using mock shipping rates");
      return {
        shipping_methods: [
          { id: 1, title: "Standard Shipping", price: 5.99 },
          { id: 2, title: "Express Shipping", price: 12.99 },
        ],
      };
    }

    const response = await fetch(
      `${PRINTIFY_API_URL}/shops/${shopId}/shipping_rates.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          line_items: items,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}): ${errorText}`);
      throw new Error(
        `Failed to get shipping rates: ${response.status} - ${errorText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching shipping rates from Printify:", error);
    throw error;
  }
}

// Map Printify product to our local product format
export function mapPrintifyProductToLocal(product: PrintifyProduct) {
  // Extract all image URLs
  const imageUrls = product.images?.map((img) => img.src) || [
    "/placeholder.svg?height=600&width=480",
  ];

  // Get all variant prices to find min and max
  const prices = product.variants?.map((variant) => variant.price) || [0];
  const basePrice = prices.length > 0 ? Math.min(...prices) : 0;

  // Extract sizes from options - properly handle case sensitivity and ensure they're strings
  const sizeOption = product.options?.find((opt) =>
    opt.name?.toLowerCase().includes("size")
  );
  const sizes =
    sizeOption?.values?.filter((value) => typeof value === "string") || [];

  // Extract colors from options - properly handle case sensitivity and ensure they're strings
  const colorOption = product.options?.find((opt) =>
    opt.name?.toLowerCase().includes("color")
  );
  const colors =
    colorOption?.values?.filter((value) => typeof value === "string") || [];

  // Determine category from tags
  let category = "T-Shirts"; // Default category
  if (product.tags) {
    if (product.tags.some((tag) => tag.toLowerCase().includes("hoodie"))) {
      category = "Hoodies";
    } else if (
      product.tags.some((tag) => tag.toLowerCase().includes("sweatshirt"))
    ) {
      category = "Sweatshirts";
    } else if (
      product.tags.some(
        (tag) =>
          tag.toLowerCase().includes("accessory") ||
          tag.toLowerCase().includes("hat") ||
          tag.toLowerCase().includes("cap") ||
          tag.toLowerCase().includes("bag")
      )
    ) {
      category = "Accessories";
    }
  }

  // Log the extracted data for debugging
  console.log(`Mapped product ${product.id}:`, {
    title: product.title,
    basePrice,
    sizes,
    colors,
    imageUrls,
  });

  return {
    id: product.id,
    name: product.title,
    price: basePrice,
    description: product.description,
    image: imageUrls,
    sizes,
    colors,
    category,
    rating: 4.5, // Default rating
    reviews: Math.floor(Math.random() * (120 - 5 + 1)) + 5, // Random review count between 5-120
    inStock: true,
    variants: product.variants, // Include all variants for detailed price/option selection
  };
}

// Mock Printify products for development and fallback
function getMockPrintifyProducts(): PrintifyProduct[] {
  return [
    {
      id: "mock-1",
      title: "Classic Cotton Tee",
      description:
        "Our signature classic tee is made from 100% organic cotton for ultimate comfort and durability.",
      images: [
        {
          src: "/placeholder.svg?height=600&width=480",
          variant_ids: ["1"],
          position: "front",
          is_default: true,
        },
      ],
      variants: [
        {
          id: "1",
          title: "S / Black",
          price: 29.99,
          sku: "CT-BLK-S",
          is_enabled: true,
          options: { size: "S", color: "Black" },
        },
      ],
      tags: ["t-shirt", "cotton", "classic"],
      options: [
        {
          name: "Size",
          type: "dropdown",
          values: ["S", "M", "L", "XL", "2XL"],
        },
        {
          name: "Color",
          type: "dropdown",
          values: ["Black", "White", "Navy", "Gray", "Red"],
        },
      ],
    },
    {
      id: "mock-2",
      title: "Vintage Hoodie",
      description:
        "A comfortable hoodie with a vintage feel, perfect for cooler days.",
      images: [
        {
          src: "/placeholder.svg?height=600&width=480",
          variant_ids: ["2"],
          position: "front",
          is_default: true,
        },
      ],
      variants: [
        {
          id: "2",
          title: "M / Navy",
          price: 59.99,
          sku: "VH-NVY-M",
          is_enabled: true,
          options: { size: "M", color: "Navy" },
        },
      ],
      tags: ["hoodie", "vintage", "comfortable"],
      options: [
        {
          name: "Size",
          type: "dropdown",
          values: ["S", "M", "L", "XL"],
        },
        {
          name: "Color",
          type: "dropdown",
          values: ["Navy", "Black", "Gray"],
        },
      ],
    },
    {
      id: "mock-3",
      title: "Statement Sweatshirt",
      description:
        "Make a statement with this comfortable and stylish sweatshirt.",
      images: [
        {
          src: "/placeholder.svg?height=600&width=480",
          variant_ids: ["3"],
          position: "front",
          is_default: true,
        },
      ],
      variants: [
        {
          id: "3",
          title: "L / Gray",
          price: 49.99,
          sku: "SS-GRY-L",
          is_enabled: true,
          options: { size: "L", color: "Gray" },
        },
      ],
      tags: ["sweatshirt", "statement", "stylish"],
      options: [
        {
          name: "Size",
          type: "dropdown",
          values: ["S", "M", "L", "XL"],
        },
        {
          name: "Color",
          type: "dropdown",
          values: ["Gray", "Black", "White"],
        },
      ],
    },
    {
      id: "mock-4",
      title: "Graphic Tee",
      description: "Express yourself with our unique graphic tee designs.",
      images: [
        {
          src: "/placeholder.svg?height=600&width=480",
          variant_ids: ["4"],
          position: "front",
          is_default: true,
        },
      ],
      variants: [
        {
          id: "4",
          title: "M / White",
          price: 34.99,
          sku: "GT-WHT-M",
          is_enabled: true,
          options: { size: "M", color: "White" },
        },
      ],
      tags: ["t-shirt", "graphic", "unique"],
      options: [
        {
          name: "Size",
          type: "dropdown",
          values: ["S", "M", "L", "XL"],
        },
        {
          name: "Color",
          type: "dropdown",
          values: ["White", "Black", "Gray"],
        },
      ],
    },
  ];
}
