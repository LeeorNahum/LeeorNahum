"use client"

import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { PageLayout } from "@/components/page-layout"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Leeor Nahum</title>
      </head>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`} suppressHydrationWarning>
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  )
}
