"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";
import Script from "next/script";

export default function PayPalTestPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSdkLoad = () => {
    console.log("PayPal SDK loaded successfully");
    setSdkLoaded(true);
    setIsLoading(false);

    // Try to render a simple PayPal button
    setTimeout(() => {
      try {
        const container = document.getElementById("paypal-test-container");
        if (container && window.paypal) {
          // Clear any existing content
          container.innerHTML = "";

          // Create a very simple button
          window.paypal
            .Buttons({
              // Use sandbox mode
              fundingSource: window.paypal.FUNDING.PAYPAL,

              // Simplest possible configuration
              style: { height: 40 },

              createOrder: () => "test-order-id",

              onApprove: () => {
                console.log("Test payment approved");
                alert("Test payment approved!");
              },
            })
            .render("#paypal-test-container")
            .then(() => console.log("Test button rendered"))
            .catch((err) => {
              console.error("Test button error:", err);
              setError(
                `Error rendering test button: ${
                  err.message || JSON.stringify(err)
                }`
              );
            });
        } else {
          setError("Container not found or PayPal SDK not available");
        }
      } catch (err) {
        console.error("Error rendering test button:", err);
        setError(
          `Error setting up test button: ${
            err instanceof Error ? err.message : String(err)
          }`
        );
      }
    }, 1000);
  };

  const handleSdkError = (error: any) => {
    console.error("PayPal SDK failed to load:", error);
    setError(
      `PayPal SDK failed to load: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
    setIsLoading(false);
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Simple PayPal Test</h1>

      <Script
        src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`}
        onLoad={handleSdkLoad}
        onError={handleSdkError}
        strategy="afterInteractive"
      />

      <Card>
        <CardHeader>
          <CardTitle>PayPal Sandbox Test</CardTitle>
          <CardDescription>
            Testing with the sandbox client ID "sb"
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
              <span>Loading PayPal SDK...</span>
            </div>
          ) : error ? (
            <div className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 p-3 rounded-md">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>Error: {error}</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 p-3 rounded-md">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>PayPal SDK loaded successfully!</span>
                </div>
              </div>

              <div id="paypal-test-container" className="min-h-[50px]"></div>

              <p className="text-sm text-muted-foreground mt-4">
                This test uses the PayPal sandbox client ID "sb" which should
                work for anyone. If this test works but your real integration
                doesn't, the issue is likely with your PayPal client ID or
                account configuration.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={() => window.location.reload()}>Refresh Test</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
