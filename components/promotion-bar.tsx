"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

interface PromotionBarProps {
  discount?: number
  code?: string
}

export default function PromotionBar({ discount = 15, code = "WELCOME15" }: PromotionBarProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [email, setEmail] = useState("")
  const [promoCode, setPromoCode] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [showCodeForm, setShowCodeForm] = useState(false)

  // Check if user already has discount in localStorage
  useEffect(() => {
    const hasDiscount = localStorage.getItem("hasDiscount") === "true"
    if (hasDiscount) {
      setIsSubscribed(true)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    // Save email (in a real app, you would send this to your backend)
    console.log("Email submitted:", email)

    // Apply discount
    localStorage.setItem("hasDiscount", "true")
    setIsSubscribed(true)
    setShowEmailForm(false)

    toast({
      title: `${discount}% discount applied!`,
      description: "Your discount will be applied at checkout.",
    })
  }

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (promoCode.toUpperCase() === code) {
      // Apply discount
      localStorage.setItem("hasDiscount", "true")
      setIsSubscribed(true)
      setShowCodeForm(false)

      toast({
        title: `${discount}% discount applied!`,
        description: "Your discount will be applied at checkout.",
      })
    } else {
      toast({
        title: "Invalid code",
        description: "Please try again with a valid promotion code.",
        variant: "destructive",
      })
    }
  }

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 text-center relative">
      <div className="container mx-auto flex items-center justify-center">
        {isSubscribed ? (
          <p className="text-sm font-medium">Your {discount}% discount is active and will be applied at checkout!</p>
        ) : (
          <>
            {!showEmailForm && !showCodeForm ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                <p className="text-sm font-medium">Get {discount}% off your first order!</p>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowEmailForm(true)}
                    className="text-xs bg-white text-blue-600 hover:bg-white/90"
                  >
                    Subscribe
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowCodeForm(true)}
                    className="text-xs bg-transparent text-white border-white hover:bg-white/20"
                  >
                    I have a code
                  </Button>
                </div>
              </div>
            ) : showEmailForm ? (
              <form onSubmit={handleEmailSubmit} className="flex w-full max-w-sm gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-9 bg-white/10 border-white/20 text-white placeholder:text-white/70"
                  required
                />
                <Button
                  type="submit"
                  variant="secondary"
                  size="sm"
                  className="h-9 bg-white text-blue-600 hover:bg-white/90"
                >
                  Get Discount
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowEmailForm(false)}
                  className="h-9 text-white hover:bg-white/20"
                >
                  Cancel
                </Button>
              </form>
            ) : (
              <form onSubmit={handleCodeSubmit} className="flex w-full max-w-sm gap-2">
                <Input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="h-9 bg-white/10 border-white/20 text-white placeholder:text-white/70"
                  required
                />
                <Button
                  type="submit"
                  variant="secondary"
                  size="sm"
                  className="h-9 bg-white text-blue-600 hover:bg-white/90"
                >
                  Apply
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCodeForm(false)}
                  className="h-9 text-white hover:bg-white/20"
                >
                  Cancel
                </Button>
              </form>
            )}
          </>
        )}
      </div>
      <button
        onClick={handleClose}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white"
        aria-label="Close promotion"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

