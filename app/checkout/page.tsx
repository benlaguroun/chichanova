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
import { CreditCard, Truck, ShieldCheck, ArrowLeft, CheckCircle, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"
import { createOrder } from "@/lib/payment-service"
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
  const [paypalError, setPaypalError] = useState<string | null>(null)
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

  const shippingCost = shippingMethod === "express" ? 12.99 : 5.99
  const totalWithShipping = totalPrice + shippingCost

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Function to render PayPal buttons
  const renderPayPalButtons = () => {
    try {
      console.log("Attempting to render PayPal buttons...")
      const paypalButtonsContainer = document.getElementById("paypal-button-container")

      if (!paypalButtonsContainer) {
        console.error("PayPal button container not found")
        setPaypalError("Button container not found in DOM")
        return
      }

      if (!window.paypal || !window.paypal.Buttons) {
        console.error("PayPal SDK not loaded correctly")
        setPaypalError("PayPal SDK not loaded correctly (window.paypal.Buttons is undefined)")
        return
      }

      // Clear any existing buttons
      paypalButtonsContainer.innerHTML = ""

      // Create a simpler button configuration
      const buttonConfig = {
        // Funding source explicitly set to PayPal
        fundingSource: window.paypal.FUNDING.PAYPAL,

        // Style with minimal options
        style: {
          layout: "vertical",
          color: "blue",
          shape: "rect",
          label: "paypal",
        },

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

            // For testing, just return a mock order ID
            // In production, you would call your API to create a real PayPal order
            return "test-order-id"
          } catch (error) {
            console.error("Error creating PayPal order:", error)
            setIsSubmitting(false)
            throw error
          }
        },

        // Finalize the transaction
        onApprove: async (data: any) => {
          try {
            console.log("Payment approved:", data)

            // In a real implementation, you would capture the payment here

            // Show success message
            setOrderComplete(true)
            clearCart()

            toast({
              title: "Payment successful!",
              description: "Thank you for your purchase.",
            })
          } catch (error) {
            console.error("Error processing payment:", error)
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
          setPaypalError(`PayPal error: ${err.message || JSON.stringify(err)}`)
          setIsSubmitting(false)
        },

        onCancel: () => {
          console.log("Payment cancelled")
          setIsSubmitting(false)
        },
      }

      // Check if the button is eligible for rendering
      const button = window.paypal.Buttons(buttonConfig)

      if (!button.isEligible()) {
        console.error("PayPal button is not eligible for rendering")
        setPaypalError(
          "PayPal button is not eligible for rendering. This could be due to an invalid configuration or funding source restrictions.",
        )
        return
      }

      // Render the button
      button
        .render("#paypal-button-container")
        .then(() => {
          console.log("PayPal buttons rendered successfully")
          setPaypalButtonsRendered(true)
          setPaypalError(null)
        })
        .catch((err: any) => {
          console.error("Error rendering PayPal buttons:", err)
          setPaypalError(`Error rendering PayPal buttons: ${err.message || JSON.stringify(err)}`)
        })
    } catch (error) {
      console.error("Error setting up PayPal buttons:", error)
      setPaypalError(`Error setting up PayPal buttons: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  // Initialize PayPal buttons when the SDK is loaded
  useEffect(() => {
    if (paypalLoaded && !paypalButtonsRendered && paymentMethod === "paypal") {
      renderPayPalButtons()
    }
  }, [paypalLoaded, paypalButtonsRendered, paymentMethod, items, totalWithShipping, formData, shippingMethod])

  // Reset PayPal buttons when payment method changes
  useEffect(() => {
    if (paymentMethod === "paypal") {
      setPaypalButtonsRendered(false)
      // If SDK is already loaded, render buttons immediately
      if (paypalLoaded) {
        renderPayPalButtons()
      }
    }
  }, [paymentMethod, paypalLoaded])

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
        src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb"}&currency=USD&debug=true&components=buttons,funding-eligibility`}
        onLoad={() => {
          console.log("PayPal SDK loaded successfully")
          setPaypalLoaded(true)
        }}
        onError={(e) => {
          console.error("PayPal SDK failed to load:", e)
          setPaypalError(`Failed to load PayPal SDK: ${e.message || JSON.stringify(e)}`)
        }}
        strategy="afterInteractive"
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
                        {paypalError && (
                          <div className="bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300 p-3 rounded-md mt-4">
                            <div className="flex items-center">
                              <AlertCircle className="h-5 w-5 mr-2" />
                              <span>PayPal Error: {paypalError}</span>
                            </div>
                            <div className="mt-2 text-sm">
                              <p>Try these troubleshooting steps:</p>
                              <ol className="list-decimal pl-5 mt-1 space-y-1">
                                <li>Check your browser console for detailed errors</li>
                                <li>Try using a different browser</li>
                                <li>Disable any ad blockers or privacy extensions</li>
                                <li>
                                  Visit the{" "}
                                  <Link href="/admin/paypal-debug" className="text-blue-600 hover:underline">
                                    PayPal Debug Page
                                  </Link>{" "}
                                  for more information
                                </li>
                              </ol>
                            </div>
                          </div>
                        )}
                        {paypalLoaded && !paypalButtonsRendered && !paypalError && (
                          <Button onClick={renderPayPalButtons} className="mt-4">
                            Retry Loading PayPal Buttons
                          </Button>
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

