import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container py-12">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] overflow-hidden rounded-lg mb-16">
        <Image src="/placeholder.svg?height=800&width=1600" alt="About our brand" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Story</h1>
          <p className="text-xl text-white max-w-2xl">Crafting sustainable fashion with purpose and passion</p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
        <p className="text-xl text-muted-foreground mb-8">
          We believe that fashion should be a force for good. Our mission is to create high-quality, sustainable apparel
          that allows individuals to express themselves while minimizing environmental impact.
        </p>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
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
                className="text-primary"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="m22 2-20 20"></path>
              </svg>
            </div>
            <h3 className="font-bold">Sustainable</h3>
            <p className="text-sm text-muted-foreground">
              We use eco-friendly materials and on-demand production to reduce waste.
            </p>
          </div>
          <div className="space-y-2">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
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
                className="text-primary"
              >
                <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
              </svg>
            </div>
            <h3 className="font-bold">Ethical</h3>
            <p className="text-sm text-muted-foreground">
              We ensure fair treatment and compensation throughout our supply chain.
            </p>
          </div>
          <div className="space-y-2">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
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
                className="text-primary"
              >
                <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path>
                <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                <path d="M12 2v2"></path>
                <path d="M12 22v-2"></path>
                <path d="m17 20.66-1-1.73"></path>
                <path d="M11 10.27 7 3.34"></path>
                <path d="m20.66 17-1.73-1"></path>
                <path d="m3.34 7 1.73 1"></path>
                <path d="M14 12h8"></path>
                <path d="M2 12h2"></path>
                <path d="m20.66 7-1.73 1"></path>
                <path d="m3.34 17 1.73-1"></path>
                <path d="m17 3.34-1 1.73"></path>
                <path d="m7 20.66 1-1.73"></path>
              </svg>
            </div>
            <h3 className="font-bold">Creative</h3>
            <p className="text-sm text-muted-foreground">
              We collaborate with artists to create unique, meaningful designs.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=800&width=600" alt="Our founders" fill className="object-cover" />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">How We Started</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                BRANDNAME was founded in 2020 by a group of friends who shared a passion for design and a concern for
                the environmental impact of fast fashion. We saw an opportunity to create a clothing brand that
                prioritized sustainability without compromising on style or quality.
              </p>
              <p>
                We started small, with just a few designs and a commitment to on-demand production to eliminate waste.
                By partnering with Printify, we were able to create a business model that allowed us to focus on design
                and community building while ensuring high-quality manufacturing and fulfillment.
              </p>
              <p>
                Today, we've grown into a community of creators and conscious consumers who believe that what we wear
                matters—not just for how it makes us look, but for its impact on the world around us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="mb-16 bg-muted py-16 px-4 rounded-lg">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Process</h2>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-background w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="font-bold mb-2">Design</h3>
              <p className="text-sm text-muted-foreground">
                We collaborate with artists to create unique, meaningful designs that tell a story.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-background w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="font-bold mb-2">Order</h3>
              <p className="text-sm text-muted-foreground">
                When you place an order, it goes directly to our production partner, Printify.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-background w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="font-bold mb-2">Print</h3>
              <p className="text-sm text-muted-foreground">
                Your item is printed on-demand using eco-friendly inks and sustainable materials.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-background w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="font-bold mb-2">Deliver</h3>
              <p className="text-sm text-muted-foreground">
                Your custom-made item is shipped directly to your door in eco-friendly packaging.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=400&width=300" alt="Team member" fill className="object-cover" />
            </div>
            <h3 className="font-bold">Alex Johnson</h3>
            <p className="text-muted-foreground">Founder & Creative Director</p>
          </div>
          <div className="text-center">
            <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=400&width=300" alt="Team member" fill className="object-cover" />
            </div>
            <h3 className="font-bold">Sam Rivera</h3>
            <p className="text-muted-foreground">Head of Design</p>
          </div>
          <div className="text-center">
            <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=400&width=300" alt="Team member" fill className="object-cover" />
            </div>
            <h3 className="font-bold">Jamie Chen</h3>
            <p className="text-muted-foreground">Sustainability Lead</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16 px-4 bg-primary text-primary-foreground rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
        <p className="max-w-2xl mx-auto mb-8">
          Be part of a movement that's redefining fashion with purpose. Shop our collections and help us create a more
          sustainable future, one garment at a time.
        </p>
        <Button asChild size="lg" variant="secondary">
          <Link href="/products">Shop Now</Link>
        </Button>
      </section>
    </div>
  )
}

