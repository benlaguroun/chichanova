import { Link } from "react-router-dom"

const AboutPage = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] overflow-hidden rounded-lg mb-16">
        <img
          src="/placeholder.svg?height=800&width=1600"
          alt="About our brand"
          className="h-full w-full object-cover"
        />
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
      </section>

      {/* CTA */}
      <section className="text-center py-16 px-4 bg-primary text-primary-foreground rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
        <p className="max-w-2xl mx-auto mb-8">
          Be part of a movement that's redefining fashion with purpose. Shop our collections and help us create a more
          sustainable future, one garment at a time.
        </p>
        <Link to="/products" className="bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-md inline-block">
          Shop Now
        </Link>
      </section>
    </div>
  )
}

export default AboutPage

