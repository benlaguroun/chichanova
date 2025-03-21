import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Leaf, Recycle, Droplet, Factory, Award } from "lucide-react"

export default function SustainabilityPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-blue-900/90 z-10" />
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop"
            alt="Sustainability"
            fill
            className="object-cover"
          />
        </div>
        <div className="container relative z-20 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our Commitment to Sustainability
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Creating streetwear with purpose and minimal environmental impact
          </p>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 relative">
              Our Approach to Sustainability
              <span className="absolute -bottom-2 left-0 w-1/4 h-1 bg-primary rounded-full"></span>
            </h2>
            <p className="text-lg mb-6">
              At CHICHANOVA, sustainability isn't just a buzzword—it's a core value that guides everything we do. We
              believe that streetwear can be both stylish and sustainable, and we're committed to proving it with every
              piece we create.
            </p>
            <p className="text-lg mb-6">
              Our on-demand production model means we only create items when they're ordered, eliminating excess
              inventory and reducing waste. This approach allows us to be more nimble, more creative, and more
              environmentally responsible than traditional fashion brands.
            </p>
          </div>
        </div>
      </section>

      {/* Key Initiatives */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Sustainability Initiatives</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Eco-Friendly Materials</h3>
              <p className="text-muted-foreground">
                We prioritize organic cotton, recycled polyester, and other sustainable materials that reduce our
                environmental footprint while maintaining the quality and durability our customers expect.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
                <Droplet className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Water Conservation</h3>
              <p className="text-muted-foreground">
                Our production partners use water-saving techniques and technologies, reducing water usage by up to 70%
                compared to traditional dyeing and printing methods.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mb-4">
                <Recycle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Minimal Waste</h3>
              <p className="text-muted-foreground">
                Our on-demand production model eliminates overproduction and excess inventory, significantly reducing
                textile waste compared to traditional fashion manufacturing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Production Process */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 relative">
                Our Production Process
                <span className="absolute -bottom-2 left-0 w-1/4 h-1 bg-primary rounded-full"></span>
              </h2>
              <p className="text-lg mb-6">
                We partner with Printify to create our products on demand, which means each item is produced only when
                you order it. This eliminates waste from unsold inventory and allows us to offer a wider range of
                designs without the environmental impact of mass production.
              </p>
              <p className="text-lg mb-6">
                Our production partners are carefully selected based on their commitment to ethical manufacturing
                practices and environmental responsibility. We regularly review their processes and certifications to
                ensure they meet our standards.
              </p>
              <div className="flex items-start mb-4">
                <Factory className="h-5 w-5 text-primary mt-1 mr-2" />
                <div>
                  <h3 className="font-semibold">Ethical Manufacturing</h3>
                  <p className="text-muted-foreground">
                    All our production partners adhere to fair labor practices and provide safe working conditions.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Award className="h-5 w-5 text-primary mt-1 mr-2" />
                <div>
                  <h3 className="font-semibold">Quality Control</h3>
                  <p className="text-muted-foreground">
                    Each item undergoes rigorous quality checks to ensure durability and longevity, because sustainable
                    fashion should last.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2070&auto=format&fit=crop"
                  alt="Production process"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packaging */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?q=80&w=2070&auto=format&fit=crop"
                  alt="Sustainable packaging"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-6 relative">
                Sustainable Packaging
                <span className="absolute -bottom-2 left-0 w-1/4 h-1 bg-primary rounded-full"></span>
              </h2>
              <p className="text-lg mb-6">
                We're committed to reducing the environmental impact of our packaging without compromising on protection
                for your products.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-1">
                    <span className="text-primary font-bold">1</span>
                  </span>
                  <div>
                    <h3 className="font-semibold">Recycled Materials</h3>
                    <p className="text-muted-foreground">
                      Our mailers and boxes are made from recycled materials and are fully recyclable.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-1">
                    <span className="text-primary font-bold">2</span>
                  </span>
                  <div>
                    <h3 className="font-semibold">Plastic Reduction</h3>
                    <p className="text-muted-foreground">
                      We're working to eliminate single-use plastics from our packaging and replace them with
                      biodegradable alternatives.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-1">
                    <span className="text-primary font-bold">3</span>
                  </span>
                  <div>
                    <h3 className="font-semibold">Minimal Design</h3>
                    <p className="text-muted-foreground">
                      Our packaging is designed to use the minimum amount of material needed to safely deliver your
                      products.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Future Goals */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Future Goals</h2>
            <p className="text-lg mb-8">
              We're proud of what we've accomplished so far, but we know there's always more work to be done. Here are
              some of our sustainability goals for the coming years:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg shadow-sm text-left">
                <h3 className="text-xl font-semibold mb-2">Carbon Neutrality</h3>
                <p className="text-muted-foreground">
                  We're working toward making our operations carbon neutral by 2025 through a combination of emissions
                  reductions and carbon offset investments.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm text-left">
                <h3 className="text-xl font-semibold mb-2">Zero Waste</h3>
                <p className="text-muted-foreground">
                  Our goal is to achieve zero waste in our operations by 2026, with all materials either being recycled,
                  composted, or reused.
                </p>
              </div>
            </div>
            <Button className="mt-8">
              <Link href="/products">Shop Sustainable Streetwear</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

