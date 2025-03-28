import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 font-brand">Chichanova</h3>
            <p className="text-muted-foreground mb-4 font-body">
              Premium streetwear for the modern individual. Ethically produced and printed on demand.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 font-brand">Shop</h3>
            <ul className="space-y-2 font-body">
              <li>
                <Link href="/products/t-shirts" className="text-muted-foreground hover:text-primary transition-colors">
                  T-Shirts
                </Link>
              </li>
              <li>
                <Link href="/products/hoodies" className="text-muted-foreground hover:text-primary transition-colors">
                  Hoodies
                </Link>
              </li>
              <li>
                <Link
                  href="/products/sweatshirts"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Sweatshirts
                </Link>
              </li>
              <li>
                <Link
                  href="/products/accessories"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 font-brand">Company</h3>
            <ul className="space-y-2 font-body">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="text-muted-foreground hover:text-primary transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 font-brand">Support</h3>
            <ul className="space-y-2 font-body">
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-primary transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-muted-foreground hover:text-primary transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground font-body">
            &copy; {new Date().getFullYear()} CHICHANOVA. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 font-secondary">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

