import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import Image from "next/image"

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/90 z-10" />
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1480&auto=format&fit=crop"
            alt="FAQ"
            fill
            className="object-cover"
          />
        </div>
        <div className="container relative z-20 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Find answers to common questions about our products, ordering, shipping, and more
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div className="col-span-1">
                <h2 className="text-xl font-bold mb-4">Categories</h2>
                <nav className="space-y-2">
                  <a href="#products" className="block text-primary hover:underline">
                    Products
                  </a>
                  <a href="#ordering" className="block text-primary hover:underline">
                    Ordering
                  </a>
                  <a href="#shipping" className="block text-primary hover:underline">
                    Shipping & Returns
                  </a>
                  <a href="#sizing" className="block text-primary hover:underline">
                    Sizing
                  </a>
                  <a href="#care" className="block text-primary hover:underline">
                    Product Care
                  </a>
                </nav>
              </div>

              <div className="md:col-span-3">
                <h2 id="products" className="text-2xl font-bold mb-6 scroll-mt-20">
                  Products
                </h2>
                <Accordion type="single" collapsible className="mb-8">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What materials are used in your clothing?</AccordionTrigger>
                    <AccordionContent>
                      Our streetwear is made from high-quality materials that vary by product. Most of our t-shirts are
                      made from 100% organic cotton or a cotton/polyester blend. Our hoodies and sweatshirts typically
                      use a cotton/polyester blend for durability and comfort. You can find specific material
                      information on each product page.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>Are your products sustainable?</AccordionTrigger>
                    <AccordionContent>
                      Yes, sustainability is a core value at CHICHANOVA. We use on-demand production to minimize waste,
                      prioritize eco-friendly materials, and work with production partners who share our commitment to
                      ethical manufacturing. You can learn more on our{" "}
                      <Link href="/sustainability" className="text-primary hover:underline">
                        Sustainability page
                      </Link>
                      .
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>How often do you release new designs?</AccordionTrigger>
                    <AccordionContent>
                      We release new designs regularly throughout the year. The best way to stay updated on new releases
                      is to subscribe to our newsletter or follow us on social media. We typically drop new collections
                      seasonally, with limited edition releases in between.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <h2 id="ordering" className="text-2xl font-bold mb-6 scroll-mt-20">
                  Ordering
                </h2>
                <Accordion type="single" collapsible className="mb-8">
                  <AccordionItem value="item-4">
                    <AccordionTrigger>How do I place an order?</AccordionTrigger>
                    <AccordionContent>
                      Placing an order is simple! Browse our products, select your desired size and color, add items to
                      your cart, and proceed to checkout. You'll need to provide shipping information and payment
                      details to complete your purchase. You'll receive an order confirmation email once your order is
                      placed.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                    <AccordionContent>
                      We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple
                      Pay, and Google Pay. All payments are securely processed and your payment information is never
                      stored on our servers.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger>Can I modify or cancel my order?</AccordionTrigger>
                    <AccordionContent>
                      Since we use on-demand production, we begin processing orders immediately. You can request
                      modifications or cancellations within 2 hours of placing your order by contacting our customer
                      service team. After this window, we cannot guarantee that changes can be made, but we'll do our
                      best to accommodate your request.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <h2 id="shipping" className="text-2xl font-bold mb-6 scroll-mt-20">
                  Shipping & Returns
                </h2>
                <Accordion type="single" collapsible className="mb-8">
                  <AccordionItem value="item-7">
                    <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                    <AccordionContent>
                      Production typically takes 2-3 business days. Once your order ships, delivery times are as
                      follows:
                      <ul className="list-disc pl-6 mt-2">
                        <li>United States: 3-5 business days</li>
                        <li>Canada: 5-10 business days</li>
                        <li>International: 10-20 business days</li>
                      </ul>
                      You'll receive tracking information via email once your order ships.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-8">
                    <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by
                      location. Please note that international orders may be subject to customs fees, import duties, or
                      taxes, which are the responsibility of the recipient.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-9">
                    <AccordionTrigger>What is your return policy?</AccordionTrigger>
                    <AccordionContent>
                      We accept returns within 30 days of delivery for unworn items in their original packaging with
                      tags attached. To initiate a return, please contact our customer service team. Return shipping
                      costs are the responsibility of the customer unless the item is defective or was shipped
                      incorrectly. For more details, please visit our{" "}
                      <Link href="/shipping-returns" className="text-primary hover:underline">
                        Shipping & Returns page
                      </Link>
                      .
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <h2 id="sizing" className="text-2xl font-bold mb-6 scroll-mt-20">
                  Sizing
                </h2>
                <Accordion type="single" collapsible className="mb-8">
                  <AccordionItem value="item-10">
                    <AccordionTrigger>How do your sizes run?</AccordionTrigger>
                    <AccordionContent>
                      Our streetwear generally follows standard sizing, but we recommend checking the size guide on each
                      product page for specific measurements. Most of our styles have a relaxed fit, which is typical
                      for streetwear. If you're between sizes, we recommend sizing up for a more oversized look or
                      sizing down for a more fitted look.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-11">
                    <AccordionTrigger>Where can I find size charts?</AccordionTrigger>
                    <AccordionContent>
                      Size charts are available on each product page. We also have a comprehensive{" "}
                      <Link href="/size-guide" className="text-primary hover:underline">
                        Size Guide
                      </Link>{" "}
                      that provides detailed measurements for all our products. If you're still unsure about sizing,
                      please contact our customer service team for assistance.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-12">
                    <AccordionTrigger>Do your clothes shrink after washing?</AccordionTrigger>
                    <AccordionContent>
                      We pre-shrink most of our garments to minimize shrinkage after washing. However, some minor
                      shrinkage (approximately 5%) may occur, especially with 100% cotton items. To maintain the size
                      and quality of your CHICHANOVA pieces, we recommend following the care instructions on the product
                      label.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <h2 id="care" className="text-2xl font-bold mb-6 scroll-mt-20">
                  Product Care
                </h2>
                <Accordion type="single" collapsible className="mb-8">
                  <AccordionItem value="item-13">
                    <AccordionTrigger>How should I wash my CHICHANOVA clothing?</AccordionTrigger>
                    <AccordionContent>
                      For best results, we recommend:
                      <ul className="list-disc pl-6 mt-2">
                        <li>Machine wash cold with like colors</li>
                        <li>Use mild detergent</li>
                        <li>Avoid bleach and fabric softeners</li>
                        <li>Turn garments inside out to protect prints and graphics</li>
                        <li>Tumble dry low or hang to dry</li>
                        <li>Iron inside out on low heat if needed</li>
                      </ul>
                      Following these care instructions will help maintain the quality and longevity of your CHICHANOVA
                      pieces.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-14">
                    <AccordionTrigger>How can I preserve the print on my clothing?</AccordionTrigger>
                    <AccordionContent>
                      To preserve the prints and graphics on your CHICHANOVA clothing, always turn the garment inside
                      out before washing and drying. Avoid high heat when washing, drying, and ironing, as heat can
                      cause prints to crack or fade. We also recommend avoiding fabric softeners, as they can break down
                      the print over time.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-15">
                    <AccordionTrigger>How long should my CHICHANOVA clothing last?</AccordionTrigger>
                    <AccordionContent>
                      With proper care, your CHICHANOVA pieces should last for years. We prioritize quality materials
                      and construction to ensure durability. If you experience any issues with the quality of your
                      purchase, please contact our customer service team, as it may be covered under our quality
                      guarantee.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="bg-secondary p-6 rounded-lg mt-12">
                  <h3 className="text-xl font-bold mb-4">Still have questions?</h3>
                  <p className="mb-4">
                    If you couldn't find the answer you were looking for, our customer service team is here to help.
                  </p>
                  <Link href="/contact" className="text-primary hover:underline font-medium">
                    Contact Us →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

