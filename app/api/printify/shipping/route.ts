import { NextResponse } from "next/server";
import { getShippingRates, getShopId } from "@/lib/printify";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { address, items } = body;

    // Get API key from environment variables
    const apiKey =
      process.env.PRINTIFY_API_KEY ||
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImE2YTUxZWU0NGI5NTE3OTFiZjU3ZmY3YWQ5ZTI2ZjE1MDcxMWQwOWRhMmJjYmI4NzRmNDJlY2Q0OWNlMmJmMzcwOThiYWZkNzE1ZjNjMDM2IiwiaWF0IjoxNzQxOTA0MDA3LjMxNTgzOCwibmJmIjoxNzQxOTA0MDA3LjMxNTg0LCJleHAiOjE3NzM0NDAwMDcuMzAyODczLCJzdWIiOiIyMjM0ODY3OCIsInNjb3BlcyI6WyJzaG9wcy5tYW5hZ2UiLCJzaG9wcy5yZWFkIiwiY2F0YWxvZy5yZWFkIiwib3JkZXJzLnJlYWQiLCJvcmRlcnMud3JpdGUiLCJwcm9kdWN0cy5yZWFkIiwicHJvZHVjdHMud3JpdGUiLCJ3ZWJob29rcy5yZWFkIiwid2ViaG9va3Mud3JpdGUiLCJ1cGxvYWRzLnJlYWQiLCJ1cGxvYWRzLndyaXRlIiwicHJpbnRfcHJvdmlkZXJzLnJlYWQiLCJ1c2VyLmluZm8iXX0.AGFSpmTqgbNgL2MR1tMeO5m8MrrBjNr3tK--2bD5urJLxkqnv-ZfiY0UwNluUJRanhEzbmTdApEWUn1rFhs";

    // Get shop ID using the API key
    let shopId = process.env.PRINTIFY_SHOP_ID;

    if (!shopId) {
      shopId = await getShopId(apiKey);
    }

    const shippingRates = await getShippingRates(
      shopId,
      address,
      items,
      apiKey
    );

    return NextResponse.json({ shippingRates });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch shipping rates from Printify" },
      { status: 500 }
    );
  }
}
