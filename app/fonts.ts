import { Inter, Montserrat, Nunito } from "next/font/google"

// Main body font - clean, modern sans-serif
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

// Secondary font for UI elements and paragraphs
export const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

// Brand font - rounded, friendly font for titles and brand elements
export const nunito = Nunito({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-brand",
})

