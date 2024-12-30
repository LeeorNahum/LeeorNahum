"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export function GitHubStats() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          GitHub Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative w-full min-h-[400px] p-4">
            <Image
              src="https://raw.githubusercontent.com/LeeorNahum/Metrics/main/metrics.classic.svg"
              alt="GitHub Overview"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="relative w-full min-h-[400px] p-4">
            <Image
              src="https://raw.githubusercontent.com/LeeorNahum/Metrics/main/metrics.plugin.languages.svg"
              alt="GitHub Languages"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 