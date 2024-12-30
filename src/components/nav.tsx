"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

const LINKS = [
  { href: "/home", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/skills", label: "Skills" },
]

export function Nav() {
  const pathname = usePathname()
  const isHome = pathname === "/" || pathname === "/home"

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm z-50" />
      <nav className="fixed top-0 left-0 right-0 h-16 flex items-center justify-center z-50">
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Link href="/home" className="text-xl font-bold px-4">
            LN
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-md transition-colors ${
                  (href === "/home" && isHome) || pathname === href
                    ? "bg-white/10 text-white"
                    : "hover:bg-white/5 text-white/70 hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                className="px-4 text-xl font-bold hover:bg-transparent hover:opacity-70"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                {LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      (href === "/home" && isHome) || pathname === href
                        ? "bg-white/10 text-white"
                        : "hover:bg-white/5 text-white/70 hover:text-white"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  )
} 