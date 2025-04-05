"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  size?: string
  color?: string
  variantId?: string | null
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string, size?: string, color?: string) => void
  updateQuantity: (id: string, quantity: number, size?: string, color?: string) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

// Create a default context value to avoid the "undefined" issue
const defaultCartContext: CartContextType = {
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
}

const CartContext = createContext<CartContextType>(defaultCartContext)

export function CartProvider({ children }: { children: ReactNode }) {
  // Initialize with an empty array to ensure items is always an array
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage on client side
  useEffect(() => {
    // Only run this on the client side
    if (typeof window !== "undefined") {
      try {
        const savedCart = localStorage.getItem("cart")
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart)
          // Verify that parsedCart is an array before setting it
          if (Array.isArray(parsedCart)) {
            setItems(parsedCart)
          }
        }
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error)
      }
      setIsLoaded(true)
    }
  }, [])

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items, isLoaded])

  const addItem = (newItem: CartItem) => {
    setItems((prevItems) => {
      // Check if item already exists in cart with the same ID, size, and color
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === newItem.id && item.size === newItem.size && item.color === newItem.color,
      )

      if (existingItemIndex > -1) {
        // Update quantity if item exists
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += newItem.quantity
        return updatedItems
      } else {
        // Add new item if it doesn't exist
        return [...prevItems, newItem]
      }
    })
  }

  const removeItem = (id: string, size?: string, color?: string) => {
    setItems((prevItems) => prevItems.filter((item) => !(item.id === id && item.size === size && item.color === color)))
  }

  const updateQuantity = (id: string, quantity: number, size?: string, color?: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.size === size && item.color === color ? { ...item, quantity } : item,
      ),
    )
  }

  const clearCart = () => {
    setItems([])
  }

  // Ensure items is an array before calling reduce
  const totalItems = Array.isArray(items) ? items.reduce((total, item) => total + item.quantity, 0) : 0

  const totalPrice = Array.isArray(items) ? items.reduce((total, item) => total + item.price * item.quantity, 0) : 0

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

