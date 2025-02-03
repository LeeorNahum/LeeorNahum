"use client"

import { GitHubStats } from "@/components/github-stats"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { ExternalLink } from "lucide-react"
import Image from "next/image"

export default function Portfolio() {
  return (
    <main className="flex min-h-screen flex-col items-center pb-16">
      <motion.section 
        className="container flex flex-col items-center justify-center gap-4 pt-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-center">Portfolio</h1>
        <p className="text-muted-foreground text-center max-w-[600px]">
          Explore my projects and contributions in software development, hardware design, and more.
        </p>
      </motion.section>

      <Separator className="my-16" />

      {/* GitHub Stats Section */}
      <motion.section 
        className="container space-y-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-center">GitHub Activity</h2>
        <GitHubStats />
      </motion.section>

      <Separator className="my-16" />

      {/* Projects Section */}
      <motion.section 
        className="container space-y-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-center">Projects</h2>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>View My Projects</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              Explore my complete portfolio of projects, including detailed descriptions, 
              technologies used, and outcomes achieved.
            </p>
            <Button 
              asChild
              size="lg"
              className="gap-2"
            >
              <a 
                href="https://www.notion.so/ee0e4ab0544b40c5a8c8d388481c26a2?v=1fb6f7657386497f8cfea6aad1aa7080"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Projects in Notion <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <div className="mt-8 flex justify-center w-full">
              <div className="max-w-[1000px] w-full">
                <a 
                  href="https://possible-baroness-8d5.notion.site/ee0e4ab0544b40c5a8c8d388481c26a2?v=12002633220480d8aadb000c8e4a68f0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/completed-projects.png"
                    alt="Completed Projects"
                    width={1500}
                    height={900}
                    className="rounded-lg shadow-lg w-full"
                    priority
                  />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>
    </main>
  )
} 