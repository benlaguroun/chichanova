import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, CheckCircle } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/90 z-10" />
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop"
            alt="Team working together"
            fill
            className="object-cover"
          />
        </div>
        <div className="container relative z-20 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-brand">Our Story</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Crafting sustainable fashion with purpose since 2020
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 relative">
                Our Mission
                <span className="absolute -bottom-2 left-0 w-1/4 h-1 bg-primary rounded-full"></span>
              </h2>
              <p className="text-muted-foreground mb-6">
                At BlueThread, we believe that fashion should be a force for good. Our mission is to create
                high-quality, sustainable apparel that not only looks good but also does good for our planet and
                communities.
              </p>
              <p className="text-muted-foreground mb-6">
                We're committed to ethical manufacturing practices, using eco-friendly materials, and supporting
                independent artists and designers. By choosing on-demand production through Printify, we minimize waste
                and reduce our environmental footprint.
              </p>
              <p className="text-muted-foreground">
                Every purchase you make supports our vision of a more sustainable and creative fashion industry.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
                alt="Our mission"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center relative inline-block mx-auto">
            Our Core Values
            <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-primary rounded-full"></span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
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
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="M7 3.6v12.8" />
                  <path d="M17 3.6v12.8" />
                  <path d="M3.6 7h16.8" />
                  <path d="M3.6 17h16.8" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-muted-foreground">
                We're committed to reducing our environmental impact through responsible sourcing, on-demand production,
                and eco-friendly packaging.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
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
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Creativity</h3>
              <p className="text-muted-foreground">
                We celebrate artistic expression and collaborate with talented designers to create unique, meaningful
                apparel that tells a story.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
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
                  <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                  <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-muted-foreground">
                We build meaningful connections with our customers, artists, and partners, fostering a community that
                shares our values and vision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Journey</h2>

          <div className="relative border-l border-primary/30 ml-6 md:ml-0 md:mx-auto md:max-w-3xl pl-6 space-y-12">
            <div className="relative">
              <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full border-4 border-background bg-primary"></div>
              <div>
                <h3 className="text-xl font-semibold">2020: The Beginning</h3>
                <p className="text-muted-foreground mt-2">
                  BlueThread was founded during the global pandemic as a response to the fashion industry's need for
                  more sustainable, on-demand production models. Our founder, Sarah Chen, envisioned a brand that would
                  combine her passion for design with her commitment to environmental responsibility.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full border-4 border-background bg-primary"></div>
              <div>
                <h3 className="text-xl font-semibold">2021: Growing Our Collection</h3>
                <p className="text-muted-foreground mt-2">
                  We expanded our product line beyond t-shirts to include hoodies, sweatshirts, and accessories. We also
                  launched our first artist collaboration program, partnering with independent designers to create
                  limited-edition collections.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full border-4 border-background bg-primary"></div>
              <div>
                <h3 className="text-xl font-semibold">2022: Sustainability Commitment</h3>
                <p className="text-muted-foreground mt-2">
                  We formalized our sustainability practices, switching to 100% organic cotton for our core products and
                  implementing eco-friendly packaging. We also began our carbon offset program to further reduce our
                  environmental footprint.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full border-4 border-background bg-primary"></div>
              <div>
                <h3 className="text-xl font-semibold">2023: Community Building</h3>
                <p className="text-muted-foreground mt-2">
                  We focused on building our community, launching our ambassador program and hosting virtual events to
                  connect with our customers. We also introduced our "Design for Good" initiative, donating a portion of
                  proceeds to environmental causes.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full border-4 border-background bg-primary"></div>
              <div>
                <h3 className="text-xl font-semibold">2024: Looking Forward</h3>
                <p className="text-muted-foreground mt-2">
                  Today, we continue to grow and innovate, exploring new sustainable materials and production methods.
                  We're committed to expanding our impact while staying true to our core values of sustainability,
                  creativity, and community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
                  alt="Sarah Chen - Founder & CEO"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Sarah Chen</h3>
              <p className="text-primary">Founder & CEO</p>
              <p className="text-muted-foreground mt-2 px-4">
                With a background in fashion design and environmental science, Sarah brings a unique perspective to
                sustainable apparel.
              </p>
            </div>

            <div className="text-center">
              <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
                  alt="David Park - Creative Director"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">David Park</h3>
              <p className="text-primary">Creative Director</p>
              <p className="text-muted-foreground mt-2 px-4">
                David leads our design team, bringing over 10 years of experience in graphic design and brand
                development.
              </p>
            </div>

            <div className="text-center">
              <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
                  alt="Maya Johnson - Sustainability Manager"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Maya Johnson</h3>
              <p className="text-primary">Sustainability Manager</p>
              <p className="text-muted-foreground mt-2 px-4">
                Maya ensures our operations align with our environmental values, constantly researching new ways to
                reduce our impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-6 relative">
                Our Sustainability Commitment
                <span className="absolute -bottom-2 left-0 w-1/4 h-1 bg-primary rounded-full"></span>
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 mr-2" />
                  <div>
                    <h3 className="font-semibold">On-Demand Production</h3>
                    <p className="text-muted-foreground">
                      We produce items only when they're ordered, eliminating excess inventory and reducing waste.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 mr-2" />
                  <div>
                    <h3 className="font-semibold">Sustainable Materials</h3>
                    <p className="text-muted-foreground">
                      We prioritize organic cotton, recycled polyester, and other eco-friendly materials.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 mr-2" />
                  <div>
                    <h3 className="font-semibold">Eco-Friendly Packaging</h3>
                    <p className="text-muted-foreground">
                      Our packaging is made from recycled and biodegradable materials, minimizing environmental impact.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 mr-2" />
                  <div>
                    <h3 className="font-semibold">Carbon Offset Program</h3>
                    <p className="text-muted-foreground">
                      We invest in carbon offset projects to neutralize the emissions from our operations and shipping.
                    </p>
                  </div>
                </div>
              </div>
              <Button asChild className="mt-6 group">
                <Link href="/sustainability" className="flex items-center">
                  Learn More About Our Practices
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop"
                  alt="Sustainability"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Be part of our mission to create a more sustainable and creative fashion industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="default" className="bg-white text-blue-900 hover:bg-white/90">
              <Link href="/products">Shop Collection</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

