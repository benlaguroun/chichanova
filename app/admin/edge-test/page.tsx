"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, AlertCircle, CheckCircle, Copy } from "lucide-react"

export default function EdgeTestPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [testData, setTestData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const runTest = async () => {
      try {
        setIsLoading(true)
        console.log("Running Edge Runtime Printify API test...")

        const response = await fetch("/api/edge-printify-test")
        const data = await response.json()

        setTestData(data)

        if (data.error) {
          setError(data.error)
        }
      } catch (error) {
        console.error("Error running test:", error)
        setError(error instanceof Error ? error.message : "Unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    runTest()
  }, [])

  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Edge Runtime Printify API Test</h1>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
          <span>Testing Edge Runtime connection to Printify API...</span>
        </div>
      ) : (
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Edge Runtime Test Results</CardTitle>
              <CardDescription>Testing Printify API connection from Edge Runtime</CardDescription>
            </CardHeader>
            <CardContent>
              {error ? (
                <div className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 p-3 rounded-md mb-4">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span>Error: {error}</span>
                  </div>
                </div>
              ) : testData?.success ? (
                <div className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 p-3 rounded-md mb-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>Successfully connected to Printify API from Edge Runtime!</span>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 p-3 rounded-md mb-4">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span>Test completed with issues</span>
                  </div>
                </div>
              )}

              <div className="mt-4 bg-secondary p-4 rounded-md overflow-auto max-h-96">
                <pre className="text-xs">{JSON.stringify(testData, null, 2)}</pre>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={handleRetry}>Retry Test</Button>
              <Button
                variant="outline"
                onClick={() => navigator.clipboard.writeText(JSON.stringify(testData, null, 2))}
                className="flex items-center"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Results
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Edge Runtime vs Node.js</CardTitle>
              <CardDescription>Understanding the differences</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Edge Runtime and Node.js serverless functions have different characteristics that can affect API
                connectivity:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-secondary p-4 rounded-md">
                  <h3 className="font-bold mb-2">Edge Runtime</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Runs closer to the user (global edge network)</li>
                    <li>Faster cold starts</li>
                    <li>Limited Node.js APIs</li>
                    <li>Different network connectivity</li>
                    <li>May have different IP ranges</li>
                  </ul>
                </div>

                <div className="bg-secondary p-4 rounded-md">
                  <h3 className="font-bold mb-2">Node.js Runtime</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Runs in specific regions</li>
                    <li>Full Node.js API support</li>
                    <li>Longer cold starts</li>
                    <li>Different network connectivity</li>
                    <li>May have different IP ranges</li>
                  </ul>
                </div>
              </div>

              <p className="mt-4">
                If one runtime works but the other doesn't, consider converting your API routes to use the working
                runtime.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

