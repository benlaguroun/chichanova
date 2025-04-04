import { NextResponse } from "next/server";
import {
  getProduct,
  getShopId,
  mapPrintifyProductToLocal,
} from "@/lib/printify";
import { getMockPrintifyProducts } from "@/lib/mock";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;
    console.log(`API route: Fetching product ${productId}`);

    // Get API key from environment variables
    const apiKey = process.env.PRINTIFY_API_KEY;

    if (!apiKey) {
      console.error("PRINTIFY_API_KEY environment variable is not set");
      // Find a mock product with matching ID or return the first mock product
      const mockProducts = getMockPrintifyProducts();
      const mockProduct =
        mockProducts.find((p) => p.id === productId) || mockProducts[0];
      console.log(
        "Using mock product due to missing API key:",
        mockProduct.title
      );
      return NextResponse.json(
        {
          error: "PRINTIFY_API_KEY environment variable is not set",
          product: mapPrintifyProductToLocal(mockProduct),
          source: "mock",
        },
        { status: 200 }
      );
    }

    // Get shop ID using the API key
    let shopId = process.env.PRINTIFY_SHOP_ID;

    if (!shopId) {
      try {
        console.log(
          "No PRINTIFY_SHOP_ID found, attempting to fetch from API..."
        );
        shopId = await getShopId(apiKey);
        console.log(`Using shop ID: ${shopId}`);
      } catch (error) {
        console.error("Error getting shop ID:", error);
        // Find a mock product with matching ID or return the first mock product
        const mockProducts = getMockPrintifyProducts();
        const mockProduct =
          mockProducts.find((p) => p.id === productId) || mockProducts[0];
        console.log(
          "Using mock product due to shop ID error:",
          mockProduct.title
        );
        return NextResponse.json(
          {
            error: "Failed to get shop ID from Printify",
            message: "Using mock data as fallback",
            product: mapPrintifyProductToLocal(mockProduct),
            source: "mock",
          },
          { status: 200 }
        );
      }
    }

    console.log(`Fetching product ${productId} with shop ID: ${shopId}`);
    const product = await getProduct(shopId, productId, apiKey);
    console.log("Product fetched successfully:", product.title);

    // Map to our local format
    const formattedProduct = mapPrintifyProductToLocal(product);
    console.log("Formatted product:", {
      id: formattedProduct.id,
      name: formattedProduct.name,
      price: formattedProduct.price,
      sizes: formattedProduct.sizes,
      colors: formattedProduct.colors,
    });

    return NextResponse.json({
      product: formattedProduct,
      source: shopId.startsWith("mock") ? "mock" : "printify",
    });
  } catch (error) {
    console.error("Error in API route:", error);
    // Find a mock product with matching ID or return the first mock product
    const mockProducts = getMockPrintifyProducts();
    const mockProduct =
      mockProducts.find((p) => p.id === params.id) || mockProducts[0];
    return NextResponse.json(
      {
        error: "Failed to fetch product from Printify",
        errorDetails: error instanceof Error ? error.message : String(error),
        product: mapPrintifyProductToLocal(mockProduct),
        source: "error",
      },
      { status: 200 }
    );
  }
}
