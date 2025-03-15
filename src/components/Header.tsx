"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ShoppingBag, User, Search, Menu, X } from "lucide-react"
import { useCart } from "../contexts/CartContext"

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { cart } = useCart()

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
        scrolled ? "bg-background/95 backdrop-blur border-b border-border py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </button>

          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl">BRANDNAME</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link to="/products" className="transition-colors hover:text-primary relative group">
              Shop All
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/products?category=t-shirts" className="transition-colors hover:text-primary relative group">
              T-Shirts
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/products?category=hoodies" className="transition-colors hover:text-primary relative group">
              Hoodies
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/about" className="transition-colors hover:text-primary relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/contact" className="transition-colors hover:text-primary relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-background pt-16 px-4 md:hidden">
            <button className="absolute top-4 right-4 p-2" onClick={() => setMobileMenuOpen(false)}>
              <X className="h-5 w-5" />
            </button>
            <nav className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-lg font-medium hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-lg font-medium hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop All
              </Link>
              <Link
                to="/products?category=t-shirts"
                className="text-lg font-medium hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                T-Shirts
              </Link>
              <Link
                to="/products?category=hoodies"
                className="text-lg font-medium hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Hoodies
              </Link>
              <Link
                to="/about"
                className="text-lg font-medium hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-lg font-medium hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}

        <div className="flex items-center space-x-2">
          {searchOpen ? (
            <div className="relative animate-fade-in">
              <input
                type="search"
                placeholder="Search..."
                className="w-[200px] lg:w-[300px] h-9 bg-secondary pr-8 rounded-md px-3"
                autoFocus
              />
              <button
                type="button"
                className="absolute right-0 top-0 h-9 w-9 flex items-center justify-center"
                onClick={() => setSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button className="p-2 hover:text-primary transition-colors" onClick={() => setSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </button>
          )}

          <button className="p-2 hover:text-primary transition-colors">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </button>

          <Link to="/cart" className="p-2 hover:text-primary transition-colors relative">
            <ShoppingBag className="h-5 w-5" />
            {cart.totalItems > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground text-xs rounded-full">
                {cart.totalItems}
              </span>
            )}
            <span className="sr-only">Cart</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header

