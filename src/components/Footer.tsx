import { Link } from "react-router-dom"
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-secondary pt-16 pb-8 px-4 md:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <h3 className="font-bold text-2xl mb-6">BRANDNAME</h3>
            <p className="text-muted-foreground mb-6">
              Sustainable, custom-designed apparel for the modern individual. Ethically made and printed on-demand.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-card hover:bg-primary hover:text-white transition-colors p-2 rounded-full">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="bg-card hover:bg-primary hover:text-white transition-colors p-2 rounded-full">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="bg-card hover:bg-primary hover:text-white transition-colors p-2 rounded-full">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 relative inline-block">
              Shop
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/products"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <span className="mr-2">→</span> All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=t-shirts"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <span className="mr-2">→</span> T-Shirts
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=hoodies"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <span className="mr-2">→</span> Hoodies
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=sweatshirts"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <span className="mr-2">→</span> Sweatshirts
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 relative inline-block">
              Company
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <span className="mr-2">→</span> About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <span className="mr-2">→</span> Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <span className="mr-2">→</span> FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/sustainability"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <span className="mr-2">→</span> Sustainability
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <span className="text-muted-foreground">
                  123 Fashion Street
                  <br />
                  Design District
                  <br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3" />
                <span className="text-muted-foreground">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3" />
                <span className="text-muted-foreground">hello@brandname.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} BRANDNAME. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm">
            <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/shipping" className="text-muted-foreground hover:text-primary transition-colors">
              Shipping Info
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

