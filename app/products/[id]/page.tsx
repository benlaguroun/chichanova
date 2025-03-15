import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, ShoppingBag, Share2, Star, Truck } from "lucide-react"
import ProductCard from "@/components/product-card"

export default function ProductPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the product data based on the ID
  const product = {
    id: params.id,
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
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="w-full lg:w-3/5 space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image src={product.images[0] || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-lg border cursor-pointer">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-2/5 space-y-6">
          <div>
            <Link
              href={`/products/category/${product.category.toLowerCase()}`}
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
                  <Button key={size} variant="outline" className="h-10 px-4">
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Button key={color} variant="outline" className="h-10 px-4">
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              <Button className="flex-1 gap-2">
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="border-t pt-6 space-y-4">
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
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="details">Details & Care</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-6">
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
          </TabsContent>
          <TabsContent value="details" className="py-6">
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
          </TabsContent>
          <TabsContent value="shipping" className="py-6">
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
              <p>
                Please note that due to the custom nature of our products, we cannot accept returns for items that have
                been personalized or custom designed.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-6">
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
                <Button>Write a Review</Button>
              </div>

              {/* Sample Reviews */}
              <div className="space-y-6">
                <div className="border-b pb-6">
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

                <div className="border-b pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Comfortable and stylish</h4>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">1 month ago</span>
                  </div>
                  <p className="mt-2 text-sm">
                    Really happy with this purchase. The material is high quality and the design looks exactly like the
                    pictures. Shipping was faster than expected too!
                  </p>
                  <div className="mt-2 text-sm font-medium">Michael R. - Verified Buyer</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard
            id="2"
            name="Vintage Hoodie"
            price={59.99}
            image="/placeholder.svg?height=600&width=480"
            category="Hoodies"
          />
          <ProductCard
            id="3"
            name="Statement Sweatshirt"
            price={49.99}
            image="/placeholder.svg?height=600&width=480"
            category="Sweatshirts"
          />
          <ProductCard
            id="6"
            name="Eco Tee"
            price={32.99}
            image="/placeholder.svg?height=600&width=480"
            category="T-Shirts"
          />
          <ProductCard
            id="8"
            name="Artist Collab Tee"
            price={39.99}
            image="/placeholder.svg?height=600&width=480"
            category="T-Shirts"
          />
        </div>
      </div>
    </div>
  )
}

