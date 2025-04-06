"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, AlertCircle, CheckCircle, Copy } from "lucide-react"

export default function DirectTestPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [testData, setTestData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const runTest = async () => {
      try {
        setIsLoading(true)
        console.log("Running direct Printify API test...")

        const response = await fetch("/api/direct-printify-test")
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
      <h1 className="text-3xl font-bold mb-6">Direct Printify API Test</h1>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
          <span>Testing direct connection to Printify API...</span>
        </div>
      ) : (
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
              <CardDescription>Direct connection test to Printify API</CardDescription>
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
                    <span>Successfully connected to Printify API!</span>
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
              <CardTitle>Advanced Troubleshooting</CardTitle>
              <CardDescription>Additional steps to resolve API issues on Vercel</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  <strong>Check API Key Format:</strong> Make sure your API key doesn't have any whitespace or special
                  characters. Try re-copying it directly from Printify.
                </li>
                <li>
                  <strong>Redeploy with Edge Runtime:</strong> Try using Edge Runtime for your API routes, which might
                  have different network connectivity.
                </li>
                <li>
                  <strong>Check Region Restrictions:</strong> Printify might be restricting API access from certain
                  regions. Try deploying your Vercel project to a different region.
                </li>
                <li>
                  <strong>Use a Proxy Service:</strong> If direct connections are failing, consider using a proxy
                  service like Cloudflare Workers to make the API calls.
                </li>
                <li>
                  <strong>Contact Printify Support:</strong> Share the error details with Printify support to see if
                  they can identify any issues on their end.
                </li>
                <li>
                  <strong>Implement Server-Side Caching:</strong> Use Redis or another caching solution to reduce the
                  number of API calls and improve reliability.
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

