"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, AlertCircle, CheckCircle, Copy } from "lucide-react"

export default function ApiDebugPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [debugData, setDebugData] = useState<any>(null)
  const [productsData, setProductsData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const runDiagnostics = async () => {
      try {
        setIsLoading(true)

        // Test the debug endpoint
        console.log("Testing debug endpoint...")
        const debugResponse = await fetch("/api/debug-printify")
        const debugData = await debugResponse.json()
        setDebugData(debugData)

        // Test the products endpoint
        console.log("Testing products endpoint...")
        const productsResponse = await fetch("/api/printify/products")
        const productsData = await productsResponse.json()
        setProductsData(productsData)

        if (debugData.error || productsData.error) {
          setError(debugData.error || productsData.error)
        }
      } catch (error) {
        console.error("Error running diagnostics:", error)
        setError(error instanceof Error ? error.message : "Unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    runDiagnostics()
  }, [])

  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">API Diagnostics</h1>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
          <span>Running API diagnostics...</span>
        </div>
      ) : (
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Environment Configuration</CardTitle>
              <CardDescription>Status of your API configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">API Key:</span>
                  <span>{debugData?.apiKeyFirstChars ? "✅ Set" : "❌ Not Set"}</span>
                </div>
                {debugData?.apiKeyFirstChars && (
                  <div className="flex justify-between">
                    <span className="font-medium">API Key Value:</span>
                    <span>{debugData.apiKeyFirstChars}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="font-medium">Shop ID:</span>
                  <span>{debugData?.shopId || "Not found"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Node Environment:</span>
                  <span>{debugData?.environment?.nodeEnv || "Unknown"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Vercel Environment:</span>
                  <span>{debugData?.environment?.vercelEnv || "Not on Vercel"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="debug">
            <TabsList>
              <TabsTrigger value="debug">Debug Endpoint</TabsTrigger>
              <TabsTrigger value="products">Products Endpoint</TabsTrigger>
            </TabsList>

            <TabsContent value="debug">
              <Card>
                <CardHeader>
                  <CardTitle>Debug Endpoint Response</CardTitle>
                  <CardDescription>Raw response from the debug endpoint</CardDescription>
                </CardHeader>
                <CardContent>
                  {error && (
                    <div className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 p-3 rounded-md mb-4">
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        <span>Error: {error}</span>
                      </div>
                    </div>
                  )}

                  {debugData?.success && (
                    <div className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 p-3 rounded-md mb-4">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        <span>{debugData.message}</span>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 bg-secondary p-4 rounded-md overflow-auto max-h-96">
                    <pre className="text-xs">{JSON.stringify(debugData, null, 2)}</pre>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    onClick={() => navigator.clipboard.writeText(JSON.stringify(debugData, null, 2))}
                    className="flex items-center"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Response
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <CardTitle>Products Endpoint Response</CardTitle>
                  <CardDescription>Raw response from the products endpoint</CardDescription>
                </CardHeader>
                <CardContent>
                  {productsData?.error && (
                    <div className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 p-3 rounded-md mb-4">
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        <span>Error: {productsData.error}</span>
                      </div>
                    </div>
                  )}

                  {productsData?.products && (
                    <div className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 p-3 rounded-md mb-4">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        <span>
                          Successfully fetched {productsData.products.length} products from {productsData.source}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 bg-secondary p-4 rounded-md overflow-auto max-h-96">
                    <pre className="text-xs">{JSON.stringify(productsData, null, 2)}</pre>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    onClick={() => navigator.clipboard.writeText(JSON.stringify(productsData, null, 2))}
                    className="flex items-center"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Response
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Troubleshooting Steps</CardTitle>
              <CardDescription>Try these steps to resolve API issues</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  <strong>Check Environment Variables:</strong> Verify that your <code>PRINTIFY_API_KEY</code> is
                  correctly set in your Vercel environment variables.
                </li>
                <li>
                  <strong>API Key Format:</strong> Ensure your API key doesn't have any extra spaces or special
                  characters.
                </li>
                <li>
                  <strong>Vercel Logs:</strong> Check your Vercel deployment logs for any errors related to the API
                  calls.
                </li>
                <li>
                  <strong>CORS Issues:</strong> If you see CORS errors, check if Printify has any restrictions on API
                  access from Vercel's servers.
                </li>
                <li>
                  <strong>Rate Limiting:</strong> Printify might be rate-limiting requests from your deployment. Try
                  implementing caching or reducing the number of requests.
                </li>
                <li>
                  <strong>Network Timeouts:</strong> If you see timeout errors, Vercel's serverless functions might be
                  timing out before Printify responds. Consider increasing the timeout or implementing a caching
                  strategy.
                </li>
                <li>
                  <strong>Test Locally with Production Environment:</strong> Run your app locally with{" "}
                  <code>NODE_ENV=production</code> to see if the issue is environment-specific.
                </li>
              </ol>
            </CardContent>
            <CardFooter>
              <Button onClick={handleRetry}>Retry Diagnostics</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}

