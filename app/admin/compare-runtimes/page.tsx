"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, AlertCircle, CheckCircle, Copy } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CompareRuntimesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [nodeData, setNodeData] = useState<any>(null)
  const [edgeData, setEdgeData] = useState<any>(null)
  const [nodeError, setNodeError] = useState<string | null>(null)
  const [edgeError, setEdgeError] = useState<string | null>(null)

  useEffect(() => {
    const runTests = async () => {
      try {
        setIsLoading(true)

        // Run both tests in parallel
        const [nodeResponse, edgeResponse] = await Promise.all([
          fetch("/api/direct-printify-test"),
          fetch("/api/edge-printify-test"),
        ])

        const nodeData = await nodeResponse.json()
        const edgeData = await edgeResponse.json()

        setNodeData(nodeData)
        setEdgeData(edgeData)

        if (nodeData.error) {
          setNodeError(nodeData.error)
        }

        if (edgeData.error) {
          setEdgeError(edgeData.error)
        }
      } catch (error) {
        console.error("Error running tests:", error)
      } finally {
        setIsLoading(false)
      }
    }

    runTests()
  }, [])

  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Runtime Comparison Test</h1>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
          <span>Testing Printify API connection in both runtimes...</span>
        </div>
      ) : (
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Test Results Comparison</CardTitle>
              <CardDescription>Comparing Node.js and Edge Runtime connectivity to Printify API</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-2">Node.js Runtime</h3>
                  {nodeError ? (
                    <div className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 p-3 rounded-md mb-4">
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        <span>Error: {nodeError}</span>
                      </div>
                    </div>
                  ) : nodeData?.success ? (
                    <div className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 p-3 rounded-md mb-4">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        <span>Success! Response time: {nodeData.responseTime}</span>
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
                </div>

                <div>
                  <h3 className="font-bold mb-2">Edge Runtime</h3>
                  {edgeError ? (
                    <div className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 p-3 rounded-md mb-4">
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        <span>Error: {edgeError}</span>
                      </div>
                    </div>
                  ) : edgeData?.success ? (
                    <div className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 p-3 rounded-md mb-4">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        <span>Success! Response time: {edgeData.responseTime}</span>
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
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleRetry}>Retry Tests</Button>
            </CardFooter>
          </Card>

          <Tabs defaultValue="node">
            <TabsList>
              <TabsTrigger value="node">Node.js Results</TabsTrigger>
              <TabsTrigger value="edge">Edge Results</TabsTrigger>
            </TabsList>

            <TabsContent value="node">
              <Card>
                <CardHeader>
                  <CardTitle>Node.js Runtime Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-secondary p-4 rounded-md overflow-auto max-h-96">
                    <pre className="text-xs">{JSON.stringify(nodeData, null, 2)}</pre>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    onClick={() => navigator.clipboard.writeText(JSON.stringify(nodeData, null, 2))}
                    className="flex items-center"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Results
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="edge">
              <Card>
                <CardHeader>
                  <CardTitle>Edge Runtime Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-secondary p-4 rounded-md overflow-auto max-h-96">
                    <pre className="text-xs">{JSON.stringify(edgeData, null, 2)}</pre>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    onClick={() => navigator.clipboard.writeText(JSON.stringify(edgeData, null, 2))}
                    className="flex items-center"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Results
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Solutions</CardTitle>
              <CardDescription>Based on test results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold mb-2">If Both Tests Failed:</h3>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Double-check your API key for accuracy</li>
                    <li>Try regenerating your API key in Printify</li>
                    <li>Contact Printify support to check for account or API restrictions</li>
                    <li>Consider implementing a proxy service or middleware</li>
                  </ol>
                </div>

                <div>
                  <h3 className="font-bold mb-2">If Only Node.js Test Succeeded:</h3>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Update your API routes to use Node.js runtime (remove any 'export const runtime = "edge"')</li>
                    <li>Consider increasing the serverless function timeout in your Vercel project settings</li>
                  </ol>
                </div>

                <div>
                  <h3 className="font-bold mb-2">If Only Edge Test Succeeded:</h3>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Update your API routes to use Edge runtime (add 'export const runtime = "edge"')</li>
                    <li>Be aware of Edge runtime limitations for other functionality</li>
                  </ol>
                </div>

                <div>
                  <h3 className="font-bold mb-2">If Both Tests Succeeded:</h3>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Choose the runtime with better performance (lower response time)</li>
                    <li>Implement proper error handling and retry logic</li>
                    <li>Consider adding caching to improve reliability</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

