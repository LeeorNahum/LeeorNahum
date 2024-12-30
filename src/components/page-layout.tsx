"use client"

import { Nav } from "@/components/nav"
import { ShareButton } from "@/components/share-button"

interface PageLayoutProps {
  children: React.ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <Nav />
      <ShareButton />
      {children}
    </>
  )
} 