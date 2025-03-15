"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart/cart-provider"
import { toast } from "@/hooks/use-toast"

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call to create order
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Order placed successfully!",
      description: "You will receive a confirmation email shortly.",
    })

    clearCart()
    window.location.href = "/checkout/success"
  }

  if (cart.items.length === 0) {
    return (
      <div className="container py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Add some products to your cart to proceed to checkout.</p>
        <Button asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Shipping Address</h2>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                  <Input id="apartment" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" required />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" required />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Shipping Method</h2>
              <RadioGroup defaultValue="standard">
                <div className="flex items-center justify-between border p-4 rounded-md">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard">Standard Shipping (5-7 business days)</Label>
                  </div>
                  <span>$5.99</span>
                </div>
                <div className="flex items-center justify-between border p-4 rounded-md">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express">Express Shipping (2-3 business days)</Label>
                  </div>
                  <span>$12.99</span>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Payment</h2>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="expiration">Expiration Date (MM/YY)</Label>
                    <Input id="expiration" placeholder="MM/YY" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" required />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Place Order"}
              </Button>
            </div>
          </form>
        </div>

        <div className="bg-muted p-6 rounded-lg h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-4 mb-6">
            {cart.items.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
                <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
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

          <Separator className="my-4" />

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

          <Separator className="my-4" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${(cart.totalPrice + 5.99 + cart.totalPrice * 0.08).toFixed(2)}</span>
          </div>

          <div className="mt-6 text-sm text-muted-foreground">
            <p>
              By placing your order, you agree to our{" "}
              <Link href="/terms" className="underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

