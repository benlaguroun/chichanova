"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronRight } from "lucide-react"
import NewsletterSignup from "@/components/newsletter-signup"
import { getProductsFromAPI, getMockProducts, type Product } from "@/lib/product-service"
import ProductCard from "@/components/product-card"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

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

    // Fetch featured products from API
    const fetchFeaturedProducts = async () => {
      setIsLoading(true)
      try {
        console.log("Fetching products for featured section...")
        const products = await getProductsFromAPI()
        console.log(`Fetched ${products.length} products for featured section`)

        if (products.length > 0) {
          // Get 4 random products for featured section
          const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 4)
          setFeaturedProducts(randomProducts)
        } else {
          // Fallback to mock data
          console.warn("No products found for featured section, using mock data")
          setFeaturedProducts(getMockProducts())
        }
      } catch (error) {
        console.error("Error fetching featured products:", error)
        setFeaturedProducts(getMockProducts())
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedProducts()

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
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop')",
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
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all"
            >
              <Link href="/products" className="group flex items-center">
                Shop Collection
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
              <Link href="/about">Our Story</Link>
            </Button>
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
              href="/products"
              className="flex items-center text-sm font-medium hover:text-primary transition-colors group"
            >
              View All <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-secondary aspect-[4/5] rounded-lg mb-3"></div>
                  <div className="h-4 bg-secondary rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-secondary rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {featuredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={Array.isArray(product.image) ? product.image[0] : product.image}
                  category={product.category}
                  rating={product.rating}
                  reviews={product.reviews}
                />
              ))}
            </div>
          )}
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
              <Button asChild className="group">
                <Link href="/about" className="flex items-center">
                  Learn More
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl transform rotate-2 hover-lift">
                <Image
                  src="https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1974&auto=format&fit=crop"
                  alt="About our brand"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -top-6 -right-6 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4 md:px-6 lg:px-8 section-reveal">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center relative inline-block mx-auto">
            Shop By Category
            <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-primary rounded-full"></span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <CategoryCard
              name="T-Shirts"
              image="https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop"
              delay={1}
            />
            <CategoryCard
              name="Hoodies"
              image="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop"
              delay={2}
            />
            <CategoryCard
              name="Sweatshirts"
              image="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop"
              delay={3}
            />
            <CategoryCard
              name="Accessories"
              image="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1974&auto=format&fit=crop"
              delay={4}
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-accent text-primary-foreground section-reveal">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Community</h2>
            <p className="mb-8 text-lg">Subscribe to get updates on new collections, exclusive offers, and more.</p>
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </div>
  )
}

function CategoryCard({ name, image, delay = 0 }: { name: string; image: string; delay?: number }) {
  return (
    <Link
      href={`/products?category=${name.toLowerCase()}`}
      className={`group relative h-[200px] rounded-xl overflow-hidden shadow-lg hover-lift opacity-0 animate-scale-in`}
      style={{ animationDelay: `${0.1 * delay}s` }}
    >
      <Image
        src={image || "/placeholder.svg?height=400&width=300"}
        alt={name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <div className="bg-white/20 backdrop-blur-sm text-white text-sm px-4 py-1 rounded-full opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          Shop Now
        </div>
      </div>
    </Link>
  )
}

