"use client"

import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../contexts/CartContext"

const CheckoutPage = () => {
  const { cart, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call to create order
    await new Promise((resolve) => setTimeout(resolve, 2000))

    alert("Order placed successfully! You will receive a confirmation email shortly.")

    clearCart()
    window.location.href = "/checkout/success"
  }

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4 flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Add some products to your cart to proceed to checkout.</p>
        <Link to="/products" className="bg-primary text-primary-foreground px-6 py-3 rounded-md">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full p-2 bg-secondary border border-border rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Shipping Address</h2>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      id="firstName"
                      required
                      className="w-full p-2 bg-secondary border border-border rounded-md"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" required className="w-full p-2 bg-secondary border border-border rounded-md" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="address">Address</label>
                  <input id="address" required className="w-full p-2 bg-secondary border border-border rounded-md" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="apartment">Apartment, suite, etc. (optional)</label>
                  <input id="apartment" className="w-full p-2 bg-secondary border border-border rounded-md" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="city">City</label>
                    <input id="city" required className="w-full p-2 bg-secondary border border-border rounded-md" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="state">State</label>
                    <input id="state" required className="w-full p-2 bg-secondary border border-border rounded-md" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="zip">ZIP Code</label>
                    <input id="zip" required className="w-full p-2 bg-secondary border border-border rounded-md" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    className="w-full p-2 bg-secondary border border-border rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Place Order"}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-secondary p-6 rounded-lg h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-4 mb-6">
            {cart.items.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
                <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="h-full w-full object-cover" />
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground w-5 h-5 flex items-center justify-center text-xs rounded-full">
                    {item.quantity}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.size && `Size: ${item.size}`}
                    {item.size && item.color && " / "}
                    {item.color && `Color: ${item.color}`}
                  </p>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-border my-4"></div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${cart.totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$5.99</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${(cart.totalPrice * 0.08).toFixed(2)}</span>
            </div>
          </div>

          <div className="border-t border-border my-4"></div>

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${(cart.totalPrice + 5.99 + cart.totalPrice * 0.08).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage

