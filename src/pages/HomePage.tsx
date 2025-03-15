"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, ChevronRight } from "lucide-react"
import ProductCard from "../components/ProductCard"

// Mock data for featured products
const featuredProducts = [
  {
    id: "1",
    name: "Classic Tee",
    price: 29.99,
    image: "/placeholder.svg?height=600&width=480",
    category: "T-Shirts",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Vintage Hoodie",
    price: 59.99,
    image: "/placeholder.svg?height=600&width=480",
    category: "Hoodies",
    rating: 4.5,
  },
  {
    id: "3",
    name: "Statement Sweatshirt",
    price: 49.99,
    image: "/placeholder.svg?height=600&width=480",
    category: "Sweatshirts",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Graphic Tee",
    price: 34.99,
    image: "/placeholder.svg?height=600&width=480",
    category: "T-Shirts",
    rating: 4.6,
  },
]

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    // Intersection Observer for revealing sections on scroll
    const sections = document.querySelectorAll(".section-reveal")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background z-10" />
        <div
          className={`absolute inset-0 bg-cover bg-center transform transition-transform duration-10000 ease-in-out ${isLoaded ? "scale-110" : "scale-100"}`}
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
            transformOrigin: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/50 z-10" />

        <div className="relative z-20 container mx-auto h-full flex flex-col items-center justify-center text-center p-4 md:p-8">
          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight opacity-0 ${isLoaded ? "animate-fade-in" : ""}`}
          >
            <span className="block">ELEVATE YOUR</span>
            <span className="text-gradient">STYLE</span>
          </h1>

          <p
            className={`text-xl md:text-2xl text-white/90 mb-10 max-w-2xl opacity-0 ${isLoaded ? "animate-fade-in stagger-1" : ""}`}
          >
            Sustainable, custom-designed apparel for the modern individual
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 opacity-0 ${isLoaded ? "animate-fade-in stagger-2" : ""}`}>
            <Link
              to="/products"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all px-6 py-3 rounded-md flex items-center justify-center group"
            >
              Shop Collection
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/about" className="text-white border border-white hover:bg-white/10 px-6 py-3 rounded-md">
              Our Story
            </Link>
          </div>

          <div
            className={`absolute bottom-8 left-0 right-0 flex justify-center opacity-0 ${isLoaded ? "animate-fade-in stagger-3 animate-float" : ""}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 md:px-6 lg:px-8 section-reveal">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold relative">
              Featured Collection
              <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary rounded-full"></span>
            </h2>
            <Link
              to="/products"
              className="flex items-center text-sm font-medium hover:text-primary transition-colors group"
            >
              View All <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="opacity-0 animate-scale-in"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  category={product.category}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-secondary section-reveal">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 relative">
                Our Story
                <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary rounded-full"></span>
              </h2>
              <p className="text-muted-foreground mb-6 text-lg">
                Founded with a passion for sustainable fashion and unique designs, our brand combines artistic
                expression with eco-conscious production methods. Each piece is printed on-demand through Printify,
                reducing waste and ensuring quality.
              </p>
              <p className="text-muted-foreground mb-8 text-lg">
                We collaborate with independent artists to create limited edition collections that tell a story and make
                a statement. Our commitment to ethical manufacturing means you can feel good about what you wear.
              </p>
              <Link
                to="/about"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-md inline-flex items-center group"
              >
                Learn More
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl transform rotate-2 hover-lift">
                <img
                  src="/placeholder.svg?height=800&width=600"
                  alt="About our brand"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -top-6 -right-6 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-accent text-primary-foreground section-reveal">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Community</h2>
            <p className="mb-8 text-lg">Subscribe to get updates on new collections, exclusive offers, and more.</p>
            <form className="relative max-w-md mx-auto">
              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder="Your email address"
                  required
                  className="w-full pr-32 h-12 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 focus:ring-primary-foreground/30 rounded-full px-4"
                />
                <button
                  type="submit"
                  className="absolute right-1 h-10 rounded-full px-4 bg-white text-primary hover:bg-white/90 flex items-center"
                >
                  Subscribe
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2"
                  >
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-center mt-2 text-primary-foreground/70">
                Join 5,000+ subscribers. We'll never share your email address.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

