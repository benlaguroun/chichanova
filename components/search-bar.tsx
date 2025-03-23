"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, X, User, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

export default function SearchBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")

  const searchInputRef = useRef<HTMLInputElement>(null)

  // Check if user is logged in from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("username")
    if (storedUsername) {
      setIsLoggedIn(true)
      setUsername(storedUsername)
    }
  }, [])

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    // In a real app, you would redirect to search results page
    console.log("Searching for:", searchQuery)
    toast({
      title: "Search initiated",
      description: `Searching for "${searchQuery}"`,
    })

    // Close search after submission
    setIsSearchOpen(false)
    setSearchQuery("")
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const username = email.split("@")[0]

    // In a real app, you would validate credentials with your backend
    console.log("Login attempt:", { email, password })

    // Simulate successful login
    setIsLoggedIn(true)
    setUsername(username)
    localStorage.setItem("username", username)

    setIsUserDialogOpen(false)
    toast({
      title: "Login successful",
      description: `Welcome back, ${username}!`,
    })
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string
    const username = email.split("@")[0]

    // Basic validation
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would send this data to your backend
    console.log("Signup attempt:", { email, password })

    // Simulate successful signup
    setIsLoggedIn(true)
    setUsername(username)
    localStorage.setItem("username", username)

    setIsUserDialogOpen(false)
    toast({
      title: "Account created",
      description: `Welcome, ${username}!`,
    })
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername("")
    localStorage.removeItem("username")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  return (
    <div className="flex items-center gap-2">
      {/* Search Button/Form */}
      {isSearchOpen ? (
        <form onSubmit={handleSearch} className="relative">
          <Input
            ref={searchInputRef}
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[200px] sm:w-[300px] h-9 border-blue-500 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </form>
      ) : (
        <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      )}

      {/* User Account Button/Dialog */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <User className="h-5 w-5" />
            {isLoggedIn && <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></span>}
            <span className="sr-only">Account</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isLoggedIn ? `Welcome, ${username}` : "Account"}</DialogTitle>
          </DialogHeader>

          {isLoggedIn ? (
            <div className="space-y-4 py-4">
              <p className="text-sm text-muted-foreground">
                You are currently logged in as <strong>{username}</strong>.
              </p>
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  asChild
                  className="border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950"
                >
                  <a href="/account">My Account</a>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950"
                >
                  <a href="/orders">My Orders</a>
                </Button>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950"
                >
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <Tabs defaultValue="login" className="py-4">
              <TabsList className="grid w-full grid-cols-2 bg-blue-100 dark:bg-blue-900/30">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-blue-800"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-blue-800"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4 py-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      required
                      className="border-blue-200 focus:border-blue-500 dark:border-blue-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      name="password"
                      type="password"
                      required
                      className="border-blue-200 focus:border-blue-500 dark:border-blue-800"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4 py-4">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      required
                      className="border-blue-200 focus:border-blue-500 dark:border-blue-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      name="password"
                      type="password"
                      required
                      className="border-blue-200 focus:border-blue-500 dark:border-blue-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                    <Input
                      id="signup-confirm-password"
                      name="confirmPassword"
                      type="password"
                      required
                      className="border-blue-200 focus:border-blue-500 dark:border-blue-800"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

