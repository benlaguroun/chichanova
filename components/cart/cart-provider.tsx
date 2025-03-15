"use client"

import type React from "react"

import { createContext, useContext, useReducer, useEffect } from "react"

type CartItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  size?: string
  color?: string
}

type CartState = {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
}

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)
  return { totalItems, totalPrice }
}

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size && item.color === action.payload.color,
      )

      let updatedItems

      if (existingItemIndex > -1) {
        updatedItems = [...state.items]
        updatedItems[existingItemIndex].quantity += action.payload.quantity
      } else {
        updatedItems = [...state.items, action.payload]
      }

      const { totalItems, totalPrice } = calculateTotals(updatedItems)

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice,
      }
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter((item) => item.id !== action.payload.id)
      const { totalItems, totalPrice } = calculateTotals(updatedItems)

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice,
      }
    }

    case "UPDATE_QUANTITY": {
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
      )

      const { totalItems, totalPrice } = calculateTotals(updatedItems)

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice,
      }
    }

    case "CLEAR_CART": {
      return initialState
    }

    default:
      return state
  }
}

type CartContextType = {
  cart: CartState
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        Object.keys(cartReducer(initialState, { type: "CLEAR_CART" })).forEach((key) => {
          if (!(key in parsedCart)) {
            throw new Error(`Invalid cart data: missing ${key}`)
          }
        })

        // Manually dispatch each item to ensure proper state calculation
        parsedCart.items.forEach((item: CartItem) => {
          dispatch({ type: "ADD_ITEM", payload: item })
        })
      } catch (error) {
        console.error("Failed to parse saved cart:", error)
        localStorage.removeItem("cart")
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addItem = (item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: item })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } })
  }

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

