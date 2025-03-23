import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/components/cart/cart-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import PromotionBar from "@/components/promotion-bar"
import { inter, montserrat, nunito } from "./fonts"

export const metadata: Metadata = {
  title: "CHICHANOVA - Premium Streetwear",
  description: "Sustainable, custom-designed streetwear for the modern individual",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${montserrat.variable} ${nunito.variable} font-sans flex min-h-screen flex-col`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <PromotionBar />
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'