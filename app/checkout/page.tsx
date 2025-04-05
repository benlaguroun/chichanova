"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart/cart-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { CreditCard, Truck, ShieldCheck, ArrowLeft, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"
import { createOrder, createPayPalOrder, capturePayPalPayment } from "@/lib/payment-service"
import Script from "next/script"

// Define PayPal button props
declare global {
  interface Window {
    paypal?: any
  }
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [paypalLoaded, setPaypalLoaded] = useState(false)
  const [paypalButtonsRendered, setPaypalButtonsRendered] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    cardNumber: "",
    expiry: "",
    cvc: "",
    nameOnCard: "",
  })

  // For React 18 compatibility
  const [state, setState] = useState(null)
  const [isPending, setIsPending] = useState(false)

  const shippingCost = shippingMethod === "express" ? 12.99 : 5.99
  const totalWithShipping = totalPrice + shippingCost

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Initialize PayPal buttons when the SDK is loaded
  useEffect(() => {
    if (paypalLoaded && !paypalButtonsRendered && window.paypal && items.length > 0) {
      try {
        const paypalButtonsContainer = document.getElementById("paypal-button-container")
        if (paypalButtonsContainer) {
          // Clear any existing buttons
          paypalButtonsContainer.innerHTML = ""

          window.paypal
            .Buttons({
              // Set up the transaction
              createOrder: async () => {
                setIsSubmitting(true)
                try {
                  // Create a PayPal order
                  const orderDetails = {
                    id: `ORDER-${Date.now()}`,
                    amount: totalWithShipping,
                    items: items.map((item) => ({
                      name: item.name,
                      quantity: item.quantity,
                      price: item.price,
                      currency: "USD",
                    })),
                    shipping: {
                      name: `${formData.firstName} ${formData.lastName}`,
                      address: {
                        line1: formData.address,
                        line2: formData.address2,
                        city: formData.city,
                        state: formData.state,
                        postal_code: formData.zip,
                        country_code: "US",
                      },
                    },
                  }

                  const { id } = await createPayPalOrder(orderDetails)
                  return id
                } catch (error) {
                  console.error("Error creating PayPal order:", error)
                  toast({
                    title: "Error",
                    description: "Failed to create PayPal order. Please try again.",
                    variant: "destructive",
                  })
                  setIsSubmitting(false)
                  throw error
                }
              },
              // Finalize the transaction
              onApprove: async (data: any) => {
                try {
                  // Capture the funds from the transaction
                  const details = await capturePayPalPayment(data.orderID)

                  // Create order in your system
                  await createOrder({
                    paymentMethod: "paypal",
                    paymentId: details.id,
                    items,
                    shipping: {
                      method: shippingMethod,
                      cost: shippingCost,
                      address: {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        address: formData.address,
                        address2: formData.address2,
                        city: formData.city,
                        state: formData.state,
                        zip: formData.zip,
                        country: formData.country,
                      },
                    },
                    total: totalWithShipping,
                  })

                  // Show success message
                  setOrderComplete(true)
                  clearCart()

                  toast({
                    title: "Payment successful!",
                    description: "Thank you for your purchase.",
                  })
                } catch (error) {
                  console.error("Error capturing PayPal payment:", error)
                  toast({
                    title: "Error",
                    description: "Failed to process payment. Please try again.",
                    variant: "destructive",
                  })
                } finally {
                  setIsSubmitting(false)
                }
              },
              onError: (err: any) => {
                console.error("PayPal error:", err)
                toast({
                  title: "PayPal Error",
                  description: "There was an error processing your payment. Please try again.",
                  variant: "destructive",
                })
                setIsSubmitting(false)
              },
            })
            .render("#paypal-button-container")

          setPaypalButtonsRendered(true)
        }
      } catch (error) {
        console.error("Error rendering PayPal buttons:", error)
      }
    }
  }, [paypalLoaded, paypalButtonsRendered, items, totalWithShipping, formData, shippingMethod, clearCart])

  // Reset PayPal buttons when payment method changes
  useEffect(() => {
    setPaypalButtonsRendered(false)
  }, [paymentMethod])

  const validateForm = () => {
    // Required fields for all payment methods
    const requiredFields = ["firstName", "lastName", "email", "phone", "address", "city", "state", "zip", "country"]

    // Additional required fields for credit card payment
    const creditCardFields = ["cardNumber", "expiry", "cvc", "nameOnCard"]

    const fieldsToValidate = paymentMethod === "credit-card" ? [...requiredFields, ...creditCardFields] : requiredFields

    const missingFields = fieldsToValidate.filter((field) => !formData[field as keyof typeof formData])

    if (missingFields.length > 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create order in your system
      await createOrder({
        paymentMethod: "credit-card",
        items,
        shipping: {
          method: shippingMethod,
          cost: shippingCost,
          address: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.address,
            address2: formData.address2,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
            country: formData.country,
          },
        },
        total: totalWithShipping,
      })

      // Order successful
      setOrderComplete(true)
      clearCart()

      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase.",
      })
    } catch (error) {
      console.error("Error processing order:", error)
      toast({
        title: "Error",
        description: "Failed to process your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (orderComplete) {
    return (
      <div className="container max-w-4xl py-12 px-4">
        <div className="text-center space-y-6 py-12">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Order Confirmed!</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>
          <div className="pt-6">
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!items.length) {
    return (
      <div className="container max-w-4xl py-12 px-4">
        <div className="text-center space-y-6 py-12">
          <h1 className="text-3xl font-bold">Your cart is empty</h1>
          <p className="text-muted-foreground">Add some products to your cart to proceed to checkout.</p>
          <div className="pt-6">
            <Button asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Load PayPal SDK */}
      <Script
        src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb"}&currency=USD`}
        onLoad={() => setPaypalLoaded(true)}
      />

      <div className="container max-w-6xl py-8 px-4">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link href="/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Shopping
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmitOrder} className="space-y-8">
              <div className="space-y-8">
                {/* Contact Information */}
                <div className="bg-card rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-card rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address2">Apartment, suite, etc. (optional)</Label>
                      <Input id="address2" name="address2" value={formData.address2} onChange={handleInputChange} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State / Province</Label>
                        <Input id="state" name="state" value={formData.state} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP / Postal Code</Label>
                        <Input id="zip" name="zip" value={formData.zip} onChange={handleInputChange} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        defaultValue="United States"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="bg-card rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
                  <RadioGroup
                    defaultValue="standard"
                    value={shippingMethod}
                    onValueChange={setShippingMethod}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-secondary/50">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Truck className="h-5 w-5 mr-2 text-primary" />
                            <span>Standard Shipping (3-5 business days)</span>
                          </div>
                          <span className="font-semibold">${formatPrice(5.99)}</span>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-secondary/50">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Truck className="h-5 w-5 mr-2 text-primary" />
                            <span>Express Shipping (1-2 business days)</span>
                          </div>
                          <span className="font-semibold">${formatPrice(12.99)}</span>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Payment Method */}
                <div className="bg-card rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                  <Tabs defaultValue="credit-card" value={paymentMethod} onValueChange={setPaymentMethod}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
                      <TabsTrigger value="paypal">PayPal</TabsTrigger>
                    </TabsList>
                    <TabsContent value="credit-card" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <div className="relative">
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            required={paymentMethod === "credit-card"}
                          />
                          <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            name="expiry"
                            placeholder="MM/YY"
                            value={formData.expiry}
                            onChange={handleInputChange}
                            required={paymentMethod === "credit-card"}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input
                            id="cvc"
                            name="cvc"
                            placeholder="123"
                            value={formData.cvc}
                            onChange={handleInputChange}
                            required={paymentMethod === "credit-card"}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nameOnCard">Name on Card</Label>
                        <Input
                          id="nameOnCard"
                          name="nameOnCard"
                          value={formData.nameOnCard}
                          onChange={handleInputChange}
                          required={paymentMethod === "credit-card"}
                        />
                      </div>

                      <div className="flex justify-end mt-4">
                        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            "Place Order"
                          )}
                        </Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="paypal" className="pt-4">
                      <div className="text-center py-4 mb-4">
                        <p className="text-muted-foreground mb-4">
                          You will be redirected to PayPal to complete your purchase securely.
                        </p>
                        <div id="paypal-button-container" className="max-w-md mx-auto"></div>
                        {!paypalLoaded && (
                          <div className="flex justify-center items-center py-4">
                            <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
                            <span>Loading PayPal...</span>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg p-6 shadow-sm sticky top-20">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4 mb-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg?height=64&width=64"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <div className="flex text-xs text-muted-foreground">
                        {item.size && <span className="mr-2">Size: {item.size}</span>}
                        {item.color && <span>Color: {item.color}</span>}
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs">Qty: {item.quantity}</span>
                        <span className="text-sm font-medium">${formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${formatPrice(shippingCost)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${formatPrice(totalWithShipping)}</span>
                </div>
              </div>

              <div className="mt-6 bg-secondary/50 p-3 rounded-lg flex items-start space-x-2">
                <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  Your payment information is processed securely. We do not store credit card details nor have access to
                  your credit card information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

async function submitEmail(formData: FormData): Promise<{ message: string }> {
  // Assuming this is a placeholder for your actual email submission logic
  // and might be a server action in a real-world scenario.
  console.log("Form Data being submitted:", formData)

  await new Promise((resolve) => setTimeout(resolve, 1000))

  return { message: "Email submitted successfully!" }
}

