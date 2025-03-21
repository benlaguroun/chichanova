import Image from "next/image"
import Link from "next/link"
import { Truck, Package, RefreshCw, Clock, Globe, CreditCard } from "lucide-react"

export default function ShippingReturnsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/90 z-10" />
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
            alt="Shipping & Returns"
            fill
            className="object-cover"
          />
        </div>
        <div className="container relative z-20 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Shipping & Returns</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Everything you need to know about our shipping policies and return process
          </p>
        </div>
      </section>

      {/* Shipping Information */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 relative">
              Shipping Information
              <span className="absolute -bottom-2 left-0 w-1/4 h-1 bg-primary rounded-full"></span>
            </h2>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="mr-4 p-2 bg-primary/10 rounded-full">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Processing Time</h3>
                  <p className="text-muted-foreground">
                    All CHICHANOVA products are made to order, which means we start production once you place your
                    order. Our typical processing time is 2-3 business days before your order ships. During high-volume
                    periods (such as holiday seasons or special releases), processing may take up to 5 business days.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 p-2 bg-primary/10 rounded-full">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Shipping Methods & Timeframes</h3>
                  <p className="text-muted-foreground mb-4">We offer the following shipping options:</p>

                  <div className="bg-secondary rounded-lg p-4 mb-4">
                    <h4 className="font-semibold mb-2">United States</h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Standard Shipping (3-5 business days)</span>
                        <span className="font-medium">$5.99</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Express Shipping (2-3 business days)</span>
                        <span className="font-medium">$12.99</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Free Standard Shipping on orders over $100</span>
                        <span className="font-medium">FREE</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-secondary rounded-lg p-4 mb-4">
                    <h4 className="font-semibold mb-2">Canada</h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Standard Shipping (5-10 business days)</span>
                        <span className="font-medium">$9.99</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Express Shipping (3-5 business days)</span>
                        <span className="font-medium">$19.99</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Free Standard Shipping on orders over $150</span>
                        <span className="font-medium">FREE</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-secondary rounded-lg p-4">
                    <h4 className="font-semibold mb-2">International</h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Standard Shipping (10-20 business days)</span>
                        <span className="font-medium">$14.99</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Express Shipping (7-10 business days)</span>
                        <span className="font-medium">$29.99</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Free Standard Shipping on orders over $200</span>
                        <span className="font-medium">FREE</span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-muted-foreground mt-4">
                    Please note that these timeframes are estimates and do not include processing time. Actual delivery
                    times may vary based on location and other factors.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 p-2 bg-primary/10 rounded-full">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">International Shipping</h3>
                  <p className="text-muted-foreground">
                    We ship to most countries worldwide. International customers may be subject to import duties, taxes,
                    and customs clearance fees, which are not included in the purchase price or shipping cost. These
                    charges are the responsibility of the recipient and vary by country. Please check your local customs
                    regulations before placing an order.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 p-2 bg-primary/10 rounded-full">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Order Tracking</h3>
                  <p className="text-muted-foreground">
                    Once your order ships, you'll receive a confirmation email with tracking information. You can also
                    track your order by logging into your account on our website or by contacting our customer service
                    team. Please allow 24-48 hours for tracking information to update after you receive the shipping
                    confirmation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Returns & Exchanges */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 relative">
              Returns & Exchanges
              <span className="absolute -bottom-2 left-0 w-1/4 h-1 bg-primary rounded-full"></span>
            </h2>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="mr-4 p-2 bg-primary/10 rounded-full">
                  <RefreshCw className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Return Policy</h3>
                  <p className="text-muted-foreground mb-4">
                    We want you to be completely satisfied with your CHICHANOVA purchase. If you're not happy with your
                    order for any reason, we accept returns within 30 days of delivery under the following conditions:
                  </p>

                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Items must be unworn, unwashed, and in their original condition with all tags attached</li>
                    <li>Items must be returned in their original packaging</li>
                    <li>Sale items and custom orders are final sale and cannot be returned unless defective</li>
                    <li>Shipping costs are non-refundable</li>
                    <li>
                      Return shipping costs are the responsibility of the customer unless the item is defective or was
                      shipped incorrectly
                    </li>
                  </ul>

                  <p className="text-muted-foreground">
                    To initiate a return, please contact our customer service team at returns@chichanova.com with your
                    order number and reason for return. We'll provide you with a return authorization and instructions
                    for sending your item back to us.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 p-2 bg-primary/10 rounded-full">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Exchanges</h3>
                  <p className="text-muted-foreground">
                    We currently do not offer direct exchanges. If you need a different size or color, please return
                    your original purchase for a refund and place a new order for the desired item. This helps us
                    process your request more efficiently, as all our items are made to order.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 p-2 bg-primary/10 rounded-full">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Refund Process</h3>
                  <p className="text-muted-foreground">
                    Once we receive and inspect your return, we'll process your refund within 3-5 business days. Refunds
                    will be issued to the original payment method used for the purchase. Depending on your payment
                    provider, it may take an additional 5-10 business days for the refund to appear in your account.
                  </p>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg mt-8">
                <h3 className="text-xl font-semibold mb-4">Damaged or Defective Items</h3>
                <p className="text-muted-foreground mb-4">
                  If you receive a damaged or defective item, please contact us within 7 days of delivery with photos of
                  the issue. We'll work with you to resolve the problem as quickly as possible, either by replacing the
                  item or providing a refund. In these cases, we'll cover the return shipping costs.
                </p>
                <p className="text-muted-foreground">
                  Please note that minor variations in color, print placement, or fabric texture are not considered
                  defects, as each item is made to order and may have slight variations.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="mb-4">Have questions about shipping or returns?</p>
              <Link href="/contact" className="text-primary hover:underline font-medium">
                Contact Our Support Team →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

