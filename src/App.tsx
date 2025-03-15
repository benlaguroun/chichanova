import { Routes, Route } from "react-router-dom"
import { CartProvider } from "./contexts/CartContext"
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import ProductsPage from "./pages/ProductsPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import CheckoutPage from "./pages/CheckoutPage"
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage"

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="checkout/success" element={<CheckoutSuccessPage />} />
        </Route>
      </Routes>
    </CartProvider>
  )
}

export default App

