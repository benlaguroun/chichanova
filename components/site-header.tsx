"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { User, Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import CartDrawer from "@/components/cart/cart-drawer"

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex justify-between items-center mb-8">
                <Link href="/" className="font-bold text-xl">
                  BRANDNAME
                </Link>
                <SheetClose className="rounded-full hover:bg-muted p-2">
                  <X className="h-5 w-5" />
                </SheetClose>
              </div>
              <nav className="flex flex-col gap-4">
                <Link href="/" className="text-lg font-medium hover:text-primary transition-colors">
                  Home
                </Link>
                <Link href="/products" className="text-lg font-medium hover:text-primary transition-colors">
                  Shop All
                </Link>
                <Link
                  href="/products/category/t-shirts"
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  T-Shirts
                </Link>
                <Link
                  href="/products/category/hoodies"
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  Hoodies
                </Link>
                <Link
                  href="/products/category/sweatshirts"
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  Sweatshirts
                </Link>
                <Link href="/about" className="text-lg font-medium hover:text-primary transition-colors">
                  About
                </Link>
                <Link href="/contact" className="text-lg font-medium hover:text-primary transition-colors">
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl">BRANDNAME</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link href="/products" className="transition-colors hover:text-primary relative group">
              Shop All
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/products/category/t-shirts" className="transition-colors hover:text-primary relative group">
              T-Shirts
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/products/category/hoodies" className="transition-colors hover:text-primary relative group">
              Hoodies
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/products/category/sweatshirts" className="transition-colors hover:text-primary relative group">
              Sweatshirts
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/about" className="transition-colors hover:text-primary relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/contact" className="transition-colors hover:text-primary relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-2">
          {searchOpen ? (
            <div className="relative animate-fade-in">
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] lg:w-[300px] h-9 bg-secondary pr-8"
                autoFocus
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0 h-9 w-9"
                onClick={() => setSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="hover:text-primary transition-colors"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>

          <CartDrawer />
        </div>
      </div>
    </header>
  )
}

