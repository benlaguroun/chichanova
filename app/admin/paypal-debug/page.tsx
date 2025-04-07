"use client";

import { useState, useEffect } from "react";
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

export default function PayPalDebugPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [buttonRendered, setButtonRendered] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  const [detailedError, setDetailedError] = useState<string | null>(null);
  const [paypalObject, setPaypalObject] = useState<any>(null);

  useEffect(() => {
    // Get the client ID from environment variable
    const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    setClientId(paypalClientId || null);

    if (!paypalClientId) {
      setError("NEXT_PUBLIC_PAYPAL_CLIENT_ID environment variable is not set");
    }

    setIsLoading(false);
  }, []);

  const handleSdkLoad = () => {
    console.log("PayPal SDK loaded successfully");
    setSdkLoaded(true);

    // Store the PayPal object for debugging
    if (window.paypal) {
      setPaypalObject({
        version: window.paypal.version || "unknown",
        hasButtons: !!window.paypal.Buttons,
        hasCheckout: !!window.paypal.Checkout,
      });
    }

    // Try to render a simple PayPal button
    setTimeout(() => {
      try {
        const paypalButtonsContainer = document.getElementById(
          "paypal-debug-button-container"
        );
        if (paypalButtonsContainer && window.paypal) {
          console.log("Creating test PayPal button...");

          // First, clear any existing content
          paypalButtonsContainer.innerHTML = "";

          // Create a very simple button with minimal configuration
          const button = window.paypal.Buttons({
            fundingSource: window.paypal.FUNDING.PAYPAL,
            style: {
              layout: "vertical",
              color: "blue",
              shape: "rect",
              label: "paypal",
            },
            createOrder: () => "test-order-id",
            onApprove: () => {
              console.log("Test payment approved");
            },
          });

          // Check if the button is eligible for rendering
          if (!button.isEligible()) {
            const eligibilityError =
              "PayPal button is not eligible for rendering. This could be due to an invalid configuration or funding source restrictions.";
            console.error(eligibilityError);
            setDetailedError(eligibilityError);
            return;
          }

          // Render the button
          button
            .render("#paypal-debug-button-container")
            .then(() => {
              console.log("Debug PayPal button rendered successfully");
              setButtonRendered(true);
            })
            .catch((err) => {
              const renderError = `Error rendering PayPal button: ${
                err.message || JSON.stringify(err)
              }`;
              console.error(renderError, err);
              setDetailedError(renderError);
            });
        } else {
          const containerError = paypalButtonsContainer
            ? "PayPal SDK not available (window.paypal is undefined or missing Buttons method)"
            : "PayPal button container not found";
          console.error(containerError);
          setDetailedError(containerError);
        }
      } catch (error) {
        const setupError = `Error setting up PayPal button: ${
          error instanceof Error ? error.message : String(error)
        }`;
        console.error(setupError, error);
        setDetailedError(setupError);
      }
    }, 1000);
  };

  const handleSdkError = (error: any) => {
    const sdkError = `PayPal SDK failed to load: ${
      error instanceof Error ? error.message : String(error)
    }`;
    console.error(sdkError, error);
    setError(sdkError);
    setDetailedError(JSON.stringify(error, null, 2));
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">PayPal Integration Debug</h1>

      <Script
        src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`}
        onLoad={handleSdkLoad}
        onError={handleSdkError}
        strategy="afterInteractive"
      />

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
          <span>Loading...</span>
        </div>
      ) : (
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>PayPal Configuration</CardTitle>
              <CardDescription>
                Status of your PayPal integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Client ID:</span>
                  <span>
                    {clientId
                      ? `${clientId.substring(0, 5)}...${clientId.substring(
                          clientId.length - 5
                        )}`
                      : "❌ Not Set"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">SDK Loaded:</span>
                  <span>{sdkLoaded ? "✅ Yes" : "❌ No"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Button Rendered:</span>
                  <span>{buttonRendered ? "✅ Yes" : "❌ No"}</span>
                </div>
                {error && (
                  <div className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 p-3 rounded-md">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      <span>Error: {error}</span>
                    </div>
                  </div>
                )}
                {detailedError && (
                  <div className="bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300 p-3 rounded-md mt-2">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 mr-2 mt-0.5" />
                      <div>
                        <span className="font-medium">Detailed Error:</span>
                        <pre className="text-xs mt-1 whitespace-pre-wrap">
                          {detailedError}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
                {paypalObject && (
                  <div className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 p-3 rounded-md">
                    <div className="flex items-start">
                      <div>
                        <span className="font-medium">PayPal Object Info:</span>
                        <pre className="text-xs mt-1">
                          {JSON.stringify(paypalObject, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
                {sdkLoaded && buttonRendered && (
                  <div className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 p-3 rounded-md">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>PayPal integration is working correctly!</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test PayPal Button</CardTitle>
              <CardDescription>
                This is a test button to verify PayPal SDK integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                id="paypal-debug-button-container"
                className="min-h-[150px] flex items-center justify-center"
              >
                {!sdkLoaded && (
                  <div className="flex items-center">
                    <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
                    <span>Loading PayPal SDK...</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alternative PayPal Button</CardTitle>
              <CardDescription>
                Testing with minimal configuration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div id="paypal-minimal-button" className="min-h-[150px]">
                {sdkLoaded && (
                  <Button
                    onClick={() => {
                      try {
                        if (window.paypal && window.paypal.Buttons) {
                          const container = document.getElementById(
                            "paypal-minimal-button"
                          );
                          if (container) {
                            container.innerHTML = "";
                            window.paypal
                              .Buttons({
                                fundingSource: window.paypal.FUNDING.PAYPAL,
                                style: { height: 40 },
                                createOrder: () => "test-order-id",
                                onApprove: () => console.log("Approved"),
                              })
                              .render("#paypal-minimal-button")
                              .then(() =>
                                console.log("Minimal button rendered")
                              )
                              .catch((err) =>
                                console.error("Minimal button error:", err)
                              );
                          }
                        }
                      } catch (err) {
                        console.error("Error rendering minimal button:", err);
                      }
                    }}
                  >
                    Try Minimal Button
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Troubleshooting Steps</CardTitle>
              <CardDescription>
                Try these steps to resolve PayPal integration issues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  <strong>Check Client ID Format:</strong> Ensure your PayPal
                  client ID doesn't have any spaces, line breaks, or special
                  characters. It should be a single string.
                </li>
                <li>
                  <strong>Try Sandbox Mode:</strong> If you're using a live
                  client ID, try using the sandbox client ID "sb" temporarily to
                  verify the integration works.
                </li>
                <li>
                  <strong>Check Browser Console:</strong> Look for any
                  JavaScript errors or network errors in your browser's
                  developer console.
                </li>
                <li>
                  <strong>Disable Browser Extensions:</strong> Some ad blockers
                  or privacy extensions might interfere with PayPal's SDK.
                </li>
                <li>
                  <strong>Try a Different Browser:</strong> If it works in one
                  browser but not another, it could be a browser-specific issue.
                </li>
                <li>
                  <strong>Check PayPal Account Status:</strong> Ensure your
                  PayPal developer account is in good standing and the app you
                  created has the correct permissions.
                </li>
                <li>
                  <strong>Update SDK URL:</strong> Try adding more parameters to
                  the SDK URL, such as "components=buttons,funding-eligibility".
                </li>
              </ol>
            </CardContent>
            <CardFooter>
              <Button onClick={() => window.location.reload()}>
                Refresh Page
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
