"use client"

import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import { useEffect, useState } from "react"

export function ShareButton() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleShare = async () => {
    const url = window.location.href
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Leeor Nahum',
          url: url
        })
      } catch (err) {
        console.error('Error sharing:', err)
      }
    } else {
      try {
        await navigator.clipboard.writeText(url)
      } catch (err) {
        console.error('Error copying to clipboard:', err)
      }
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="fixed right-4 z-50 bg-background/50 backdrop-blur-sm hover:bg-background/80 p-2.5"
      onClick={handleShare}
      style={{ top: 'var(--nav-height, 4rem)' }}
    >
      <Share2 className="h-5 w-5" />
      <span className="sr-only">Share</span>
    </Button>
  )
} 