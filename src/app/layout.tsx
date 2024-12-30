"use client"

import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { PageLayout } from "@/components/page-layout"
import { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Leeor Nahum",
  description: "Electrical and Computer Engineer | Software Developer | Entrepreneur",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`} suppressHydrationWarning>
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  )
}
