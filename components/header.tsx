"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, Moon, Sun, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CartButton } from "@/components/cart/cart"
import { useTheme } from "next-themes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import SearchBar from "@/components/search-bar"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-medium px-2 font-brand">
                  Home
                </Link>
                <div className="flex flex-col">
                  <Link href="/products" className="text-lg font-medium px-2 py-2 font-brand">
                    Shop
                  </Link>
                  <div className="pl-4 flex flex-col gap-2 mt-1 font-secondary">
                    <Link href="/products/t-shirts" className="text-md px-2 py-1 hover:text-blue-500">
                      T-Shirts
                    </Link>
                    <Link href="/products/hoodies" className="text-md px-2 py-1 hover:text-blue-500">
                      Hoodies
                    </Link>
                    <Link href="/products/sweatshirts" className="text-md px-2 py-1 hover:text-blue-500">
                      Sweatshirts
                    </Link>
                    <Link href="/products/accessories" className="text-md px-2 py-1 hover:text-blue-500">
                      Accessories
                    </Link>
                  </div>
                </div>
                <Link href="/about" className="text-lg font-medium px-2 font-brand">
                  About
                </Link>
                <Link href="/contact" className="text-lg font-medium px-2 font-brand">
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="text-xl font-bold font-brand tracking-wide">
            Chichanova
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 font-secondary">
            <Link href="/" className="text-sm font-medium hover:text-blue-500 transition-colors">
              Home
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="p-0 h-auto font-medium text-sm flex items-center gap-1 hover:text-blue-500 transition-colors"
                >
                  Shop <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/products" className="cursor-pointer w-full">
                    All Products
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products/t-shirts" className="cursor-pointer w-full">
                    T-Shirts
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products/hoodies" className="cursor-pointer w-full">
                    Hoodies
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products/sweatshirts" className="cursor-pointer w-full">
                    Sweatshirts
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products/accessories" className="cursor-pointer w-full">
                    Accessories
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/about" className="text-sm font-medium hover:text-blue-500 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-blue-500 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-2">
            <SearchBar />
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <CartButton />
          </div>
        </div>
      </div>
    </header>
  )
}

