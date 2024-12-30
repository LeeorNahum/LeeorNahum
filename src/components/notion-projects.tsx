"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function NotionProjects() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Reset loading state when iframe loads
    const handleIframeLoad = () => {
      setIsLoading(false)
    }

    // Add event listener to iframe
    const iframe = document.getElementById("notion-iframe") as HTMLIFrameElement
    if (iframe) {
      iframe.addEventListener("load", handleIframeLoad)
      
      // Handle load timeout
      const timeout = setTimeout(() => {
        if (isLoading) {
          setError("Loading took too long. Please refresh the page.")
        }
      }, 10000)

      return () => {
        iframe.removeEventListener("load", handleIframeLoad)
        clearTimeout(timeout)
      }
    }
  }, [isLoading])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Completed Projects</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        )}
        {error && (
          <p className="text-destructive">{error}</p>
        )}
        <iframe
          id="notion-iframe"
          src="https://possible-baroness-8d5.notion.site/ee0e4ab0544b40c5a8c8d388481c26a2"
          className={`w-full h-[600px] border-none transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        />
      </CardContent>
    </Card>
  )
} 