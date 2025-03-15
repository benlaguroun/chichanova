"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { Send } from "lucide-react"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Success!",
      description: "You've been added to our newsletter.",
    })

    setEmail("")
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
      <div className="relative flex items-center">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="pr-32 h-12 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 focus-visible:ring-primary-foreground/30 rounded-full"
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="absolute right-1 h-10 rounded-full px-4 bg-white text-primary hover:bg-white/90"
        >
          {isLoading ? (
            "Subscribing..."
          ) : (
            <>
              Subscribe
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      <p className="text-xs text-center mt-2 text-primary-foreground/70">
        Join 5,000+ subscribers. We'll never share your email address.
      </p>
    </form>
  )
}

