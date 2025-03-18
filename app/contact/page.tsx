"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    })

    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/90 z-10" />
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=2070&auto=format&fit=crop"
            alt="Contact us"
            fill
            className="object-cover"
          />
        </div>
        <div className="container relative z-20 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Get In Touch</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            We'd love to hear from you. Reach out with questions, feedback, or collaboration ideas.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-card p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-muted-foreground mb-2">For general inquiries:</p>
              <a href="mailto:hello@bluethread.com" className="text-primary hover:underline">
                hello@bluethread.com
              </a>
              <p className="text-muted-foreground mt-2 mb-2">For support:</p>
              <a href="mailto:support@bluethread.com" className="text-primary hover:underline">
                support@bluethread.com
              </a>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-muted-foreground mb-2">Customer Service:</p>
              <a href="tel:+18005551234" className="text-primary hover:underline">
                +1 (800) 555-1234
              </a>
              <p className="text-muted-foreground mt-4 mb-2">Hours:</p>
              <p>Monday - Friday: 9am - 5pm EST</p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="text-muted-foreground mb-2">Headquarters:</p>
              <address className="not-italic">
                123 Fashion Street
                <br />
                Suite 500
                <br />
                New York, NY 10001
                <br />
                United States
              </address>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6 relative">
                Send Us a Message
                <span className="absolute -bottom-2 left-0 w-1/4 h-1 bg-primary rounded-full"></span>
              </h2>

              {isSubmitted ? (
                <div className="bg-card p-8 rounded-lg shadow-sm text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. We've received your message and will get back to you as soon as
                    possible.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Map */}
            <div>
              <h2 className="text-3xl font-bold mb-6 relative">
                Find Us
                <span className="absolute -bottom-2 left-0 w-1/4 h-1 bg-primary rounded-full"></span>
              </h2>
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://maps.googleapis.com/maps/api/staticmap?center=New+York,NY&zoom=13&size=600x400&key=YOUR_API_KEY"
                  alt="Map location"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="bg-card p-4 rounded-lg shadow-lg">
                    <h3 className="font-semibold">BlueThread Headquarters</h3>
                    <p className="text-sm text-muted-foreground">123 Fashion Street, New York, NY</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <h3 className="text-xl font-semibold">Directions</h3>
                <p className="text-muted-foreground">
                  Our office is conveniently located in the Fashion District, easily accessible by public
                  transportation.
                </p>
                <div className="space-y-2">
                  <p className="font-medium">By Subway:</p>
                  <p className="text-muted-foreground">
                    Take the A, C, E to 34th St-Penn Station or the 1, 2, 3 to 34th St. We're a short 5-minute walk from
                    either station.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">By Bus:</p>
                  <p className="text-muted-foreground">
                    The M34 and M34A crosstown buses stop directly in front of our building.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">What are your shipping times?</h3>
              <p className="text-muted-foreground">
                Standard shipping typically takes 3-5 business days within the US. International shipping can take 7-14
                business days depending on the destination.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Do you offer returns?</h3>
              <p className="text-muted-foreground">
                Yes, we offer a 30-day return policy for unworn items in their original packaging. Please visit our
                Returns page for more details.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">How can I track my order?</h3>
              <p className="text-muted-foreground">
                Once your order ships, you'll receive a tracking number via email. You can also track your order in your
                account dashboard.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Do you ship internationally?</h3>
              <p className="text-muted-foreground">
                Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by
                location.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Can't find the answer you're looking for?</p>
            <Button asChild>
              <a href="mailto:support@bluethread.com">Contact Our Support Team</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

