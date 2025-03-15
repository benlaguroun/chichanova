"use client"

import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Heart, ShoppingBag, Share2, Star, Truck } from "lucide-react"
import { useCart } from "../contexts/CartContext"
import ProductCard from "../components/ProductCard"

// Mock products data
const products = [
  {
    id: "1",
    name: "Classic Tee",
    price: 29.99,
    description:
      "Our signature classic tee is made from 100% organic cotton for ultimate comfort and durability. Features a relaxed fit and comes in a variety of colors to match your style.",
    images: [
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colors: ["Black", "White", "Navy", "Gray", "Red"],
    category: "T-Shirts",
    rating: 4.8,
    reviews: 124,
    inStock: true,
  },
  {
    id: "2",
    name: "Vintage Hoodie",
    price: 59.99,
    description: "A comfortable hoodie with a vintage feel, perfect for cooler days.",
    images: ["/placeholder.svg?height=800&width=600", "/placeholder.svg?height=800&width=600"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy", "Black", "Gray"],
    category: "Hoodies",
    rating: 4.5,
    reviews: 89,
    inStock: true,
  },
]

// Related products
const relatedProducts = [
  {
    id: "2",
    name: "Vintage Hoodie",
    price: 59.99,
    image: "/placeholder.svg?height=600&width=480",
    category: "Hoodies",
  },
  {
    id: "3",
    name: "Statement Sweatshirt",
    price: 49.99,
    image: "/placeholder.svg?height=600&width=480",
    category: "Sweatshirts",
  },
  {
    id: "6",
    name: "Eco Tee",
    price: 32.99,
    image: "/placeholder.svg?height=600&width=480",
    category: "T-Shirts",
  },
]

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [activeTab, setActiveTab] = useState("description")
  const [activeImage, setActiveImage] = useState(0)

  // Find the product by ID
  const product = products.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="bg-primary text-primary-foreground px-6 py-3 rounded-md">
          Browse Products
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      size: selectedSize || "M",
      color: selectedColor || "Black",
    })

    alert("Product added to cart!")
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="w-full lg:w-3/5 space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <img
              src={product.images[activeImage] || "/placeholder.svg"}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`relative aspect-square overflow-hidden rounded-lg border cursor-pointer ${activeImage === index ? "border-primary" : "border-border"}`}
                onClick={() => setActiveImage(index)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} view ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-2/5 space-y-6">
          <div>
            <Link
              to={`/products?category=${product.category.toLowerCase()}`}
              className="text-sm text-muted-foreground hover:underline"
            >
              {product.category}
            </Link>
            <h1 className="text-3xl font-bold mt-1">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
            <p className="text-2xl font-semibold mt-4">${product.price.toFixed(2)}</p>
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`h-10 px-4 rounded-md border ${selectedSize === size ? "border-primary bg-primary/10" : "border-border"}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`h-10 px-4 rounded-md border ${selectedColor === color ? "border-primary bg-primary/10" : "border-border"}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              <button
                className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md flex items-center justify-center"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </button>
              <button className="h-10 w-10 border border-border rounded-md flex items-center justify-center">
                <Heart className="h-5 w-5" />
              </button>
              <button className="h-10 w-10 border border-border rounded-md flex items-center justify-center">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="border-t border-border pt-6 space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="h-4 w-4" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="inline-block h-4 w-4 rounded-full border border-current"></span>
              <span>{product.inStock ? "In stock, ready to ship" : "Out of stock"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="border-b border-border">
          <div className="flex">
            <button
              className={`px-4 py-2 ${activeTab === "description" ? "border-b-2 border-primary" : ""}`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={`px-4 py-2 ${activeTab === "details" ? "border-b-2 border-primary" : ""}`}
              onClick={() => setActiveTab("details")}
            >
              Details & Care
            </button>
            <button
              className={`px-4 py-2 ${activeTab === "shipping" ? "border-b-2 border-primary" : ""}`}
              onClick={() => setActiveTab("shipping")}
            >
              Shipping & Returns
            </button>
            <button
              className={`px-4 py-2 ${activeTab === "reviews" ? "border-b-2 border-primary" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
          </div>
        </div>

        <div className="py-6">
          {activeTab === "description" && (
            <div className="space-y-4">
              <p>
                Our signature classic tee is made from 100% organic cotton for ultimate comfort and durability. Features
                a relaxed fit and comes in a variety of colors to match your style.
              </p>
              <p>
                Each piece is printed on-demand using eco-friendly inks and sustainable production methods. The design
                is applied using a state-of-the-art printing process that ensures vibrant colors and excellent wash
                durability.
              </p>
              <p>
                This versatile tee pairs perfectly with jeans, shorts, or layered under a jacket for a more elevated
                look. It's designed to be a staple in your wardrobe that you'll reach for again and again.
              </p>
            </div>
          )}

          {activeTab === "details" && (
            <div className="space-y-4">
              <h3 className="font-medium">Materials</h3>
              <p>100% Organic Cotton, 180 GSM</p>

              <h3 className="font-medium">Features</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Relaxed fit</li>
                <li>Ribbed crew neck</li>
                <li>Double-needle stitching on sleeves and hem</li>
                <li>Pre-shrunk fabric</li>
                <li>Printed using eco-friendly water-based inks</li>
              </ul>

              <h3 className="font-medium">Care Instructions</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Machine wash cold with like colors</li>
                <li>Tumble dry low</li>
                <li>Do not bleach</li>
                <li>Iron on low heat if needed</li>
              </ul>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="space-y-4">
              <h3 className="font-medium">Shipping</h3>
              <p>
                All orders are printed on-demand through our partner Printify. Production typically takes 2-3 business
                days before shipping. Once shipped, delivery times are as follows:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>United States: 3-5 business days</li>
                <li>Canada: 5-10 business days</li>
                <li>International: 10-20 business days</li>
              </ul>

              <h3 className="font-medium">Returns & Exchanges</h3>
              <p>
                We want you to be completely satisfied with your purchase. If you're not happy with your order, we
                accept returns within 30 days of delivery. Items must be unworn, unwashed, and in their original
                packaging with tags attached.
              </p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">Customer Reviews</h3>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">Based on {product.reviews} reviews</span>
                  </div>
                </div>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">Write a Review</button>
              </div>

              {/* Sample Reviews */}
              <div className="space-y-6">
                <div className="border-b border-border pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Great quality and fit!</h4>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 5 ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">2 weeks ago</span>
                  </div>
                  <p className="mt-2 text-sm">
                    This is my new favorite tee! The fabric is super soft and the fit is perfect. I've already washed it
                    several times and it still looks brand new. Definitely ordering more colors.
                  </p>
                  <div className="mt-2 text-sm font-medium">Sarah T. - Verified Buyer</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              category={product.category}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage

