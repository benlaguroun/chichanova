import Image from "next/image"
import Link from "next/link"
import { Ruler, Shirt, Info } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SizeGuidePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/90 z-10" />
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2070&auto=format&fit=crop"
            alt="Size Guide"
            fill
            className="object-cover"
          />
        </div>
        <div className="container relative z-20 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Size Guide</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Find your perfect fit with our detailed size charts and measurement guide
          </p>
        </div>
      </section>

      {/* How to Measure */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 relative">
              How to Measure
              <span className="absolute -bottom-2 left-0 w-1/4 h-1 bg-primary rounded-full"></span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <p className="text-lg mb-6">
                  To find your perfect fit, take your measurements using a soft measuring tape. For the most accurate
                  results, have someone help you and measure directly against your body wearing only lightweight
                  clothes.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="mr-4 p-2 bg-primary/10 rounded-full">
                      <Ruler className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Chest/Bust</h3>
                      <p className="text-muted-foreground text-sm">
                        Measure around the fullest part of your chest/bust, keeping the measuring tape horizontal.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 p-2 bg-primary/10 rounded-full">
                      <Ruler className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Waist</h3>
                      <p className="text-muted-foreground text-sm">
                        Measure around your natural waistline, which is the narrowest part of your torso.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 p-2 bg-primary/10 rounded-full">
                      <Ruler className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Hips</h3>
                      <p className="text-muted-foreground text-sm">
                        Measure around the fullest part of your hips, keeping the measuring tape horizontal.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 p-2 bg-primary/10 rounded-full">
                      <Ruler className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Sleeve Length</h3>
                      <p className="text-muted-foreground text-sm">
                        Measure from the center back of your neck, across your shoulder, and down to your wrist.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative h-[300px] md:h-auto">
                <Image
                  src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1470&auto=format&fit=crop"
                  alt="How to measure"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>

            <div className="bg-secondary p-6 rounded-lg mb-12">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Streetwear Fit Guide</h3>
                  <p className="text-muted-foreground">
                    CHICHANOVA streetwear is designed with a modern, relaxed fit. If you prefer a more oversized look
                    (typical for streetwear style), we recommend sizing up. For a more fitted look, consider sizing
                    down. Our size charts provide garment measurements, not body measurements, to help you find your
                    perfect fit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Size Charts */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 relative">
              Size Charts
              <span className="absolute -bottom-2 left-0 w-1/4 h-1 bg-primary rounded-full"></span>
            </h2>

            <Tabs defaultValue="tshirts">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="tshirts">T-Shirts</TabsTrigger>
                <TabsTrigger value="hoodies">Hoodies</TabsTrigger>
                <TabsTrigger value="sweatshirts">Sweatshirts</TabsTrigger>
                <TabsTrigger value="accessories">Accessories</TabsTrigger>
              </TabsList>

              <TabsContent value="tshirts" className="mt-6">
                <div className="bg-card rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Shirt className="h-5 w-5 text-primary mr-2" />
                    <h3 className="text-xl font-semibold">T-Shirts Size Chart (in inches)</h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left">Size</th>
                          <th className="py-2 px-4 text-left">Chest Width</th>
                          <th className="py-2 px-4 text-left">Length</th>
                          <th className="py-2 px-4 text-left">Sleeve Length</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-4">S</td>
                          <td className="py-2 px-4">18"</td>
                          <td className="py-2 px-4">27"</td>
                          <td className="py-2 px-4">8"</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">M</td>
                          <td className="py-2 px-4">20"</td>
                          <td className="py-2 px-4">28"</td>
                          <td className="py-2 px-4">8.25"</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">L</td>
                          <td className="py-2 px-4">22"</td>
                          <td className="py-2 px-4">29"</td>
                          <td className="py-2 px-4">8.5"</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">XL</td>
                          <td className="py-2 px-4">24"</td>
                          <td className="py-2 px-4">30"</td>
                          <td className="py-2 px-4">8.75"</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4">2XL</td>
                          <td className="py-2 px-4">26"</td>
                          <td className="py-2 px-4">31"</td>
                          <td className="py-2 px-4">9"</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-sm text-muted-foreground mt-4">
                    Measurements are of the garment laid flat, not body measurements. Chest width is measured 1" below
                    the armhole, length is measured from the highest point of the shoulder to the bottom hem, and sleeve
                    length is measured from the shoulder seam to the sleeve hem.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="hoodies" className="mt-6">
                <div className="bg-card rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Shirt className="h-5 w-5 text-primary mr-2" />
                    <h3 className="text-xl font-semibold">Hoodies Size Chart (in inches)</h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left">Size</th>
                          <th className="py-2 px-4 text-left">Chest Width</th>
                          <th className="py-2 px-4 text-left">Length</th>
                          <th className="py-2 px-4 text-left">Sleeve Length</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-4">S</td>
                          <td className="py-2 px-4">20"</td>
                          <td className="py-2 px-4">26"</td>
                          <td className="py-2 px-4">25"</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">M</td>
                          <td className="py-2 px-4">22"</td>
                          <td className="py-2 px-4">27"</td>
                          <td className="py-2 px-4">25.5"</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">L</td>
                          <td className="py-2 px-4">24"</td>
                          <td className="py-2 px-4">28"</td>
                          <td className="py-2 px-4">26"</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">XL</td>
                          <td className="py-2 px-4">26"</td>
                          <td className="py-2 px-4">29"</td>
                          <td className="py-2 px-4">26.5"</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4">2XL</td>
                          <td className="py-2 px-4">28"</td>
                          <td className="py-2 px-4">30"</td>
                          <td className="py-2 px-4">27"</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-sm text-muted-foreground mt-4">
                    Measurements are of the garment laid flat, not body measurements. Chest width is measured 1" below
                    the armhole, length is measured from the highest point of the shoulder to the bottom hem, and sleeve
                    length is measured from the shoulder seam to the sleeve hem.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="sweatshirts" className="mt-6">
                <div className="bg-card rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Shirt className="h-5 w-5 text-primary mr-2" />
                    <h3 className="text-xl font-semibold">Sweatshirts Size Chart (in inches)</h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left">Size</th>
                          <th className="py-2 px-4 text-left">Chest Width</th>
                          <th className="py-2 px-4 text-left">Length</th>
                          <th className="py-2 px-4 text-left">Sleeve Length</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-4">S</td>
                          <td className="py-2 px-4">20"</td>
                          <td className="py-2 px-4">26"</td>
                          <td className="py-2 px-4">24"</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">M</td>
                          <td className="py-2 px-4">22"</td>
                          <td className="py-2 px-4">27"</td>
                          <td className="py-2 px-4">24.5"</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">L</td>
                          <td className="py-2 px-4">24"</td>
                          <td className="py-2 px-4">28"</td>
                          <td className="py-2 px-4">25"</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">XL</td>
                          <td className="py-2 px-4">26"</td>
                          <td className="py-2 px-4">29"</td>
                          <td className="py-2 px-4">25.5"</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4">2XL</td>
                          <td className="py-2 px-4">28"</td>
                          <td className="py-2 px-4">30"</td>
                          <td className="py-2 px-4">26"</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-sm text-muted-foreground mt-4">
                    Measurements are of the garment laid flat, not body measurements. Chest width is measured 1" below
                    the armhole, length is measured from the highest point of the shoulder to the bottom hem, and sleeve
                    length is measured from the shoulder seam to the sleeve hem.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="accessories" className="mt-6">
                <div className="bg-card rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Shirt className="h-5 w-5 text-primary mr-2" />
                    <h3 className="text-xl font-semibold">Accessories Size Chart</h3>
                  </div>

                  <h4 className="font-semibold mb-2">Hats & Caps</h4>
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left">Size</th>
                          <th className="py-2 px-4 text-left">Head Circumference (inches)</th>
                          <th className="py-2 px-4 text-left">Head Circumference (cm)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-4">S/M</td>
                          <td className="py-2 px-4">21" - 22"</td>
                          <td className="py-2 px-4">53 - 56 cm</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4">L/XL</td>
                          <td className="py-2 px-4">22" - 24"</td>
                          <td className="py-2 px-4">56 - 61 cm</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 className="font-semibold mb-2">Tote Bags</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left">Size</th>
                          <th className="py-2 px-4 text-left">Width (inches)</th>
                          <th className="py-2 px-4 text-left">Height (inches)</th>
                          <th className="py-2 px-4 text-left">Depth (inches)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-4">Standard</td>
                          <td className="py-2 px-4">15"</td>
                          <td className="py-2 px-4">16"</td>
                          <td className="py-2 px-4">4"</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4">Large</td>
                          <td className="py-2 px-4">18"</td>
                          <td className="py-2 px-4">18"</td>
                          <td className="py-2 px-4">5"</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-12 text-center">
              <p className="mb-4">Still not sure about your size?</p>
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

