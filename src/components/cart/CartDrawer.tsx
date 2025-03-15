"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ShoppingBag, Trash2, Plus, Minus, X } from "lucide-react"
import { useCart } from "../../contexts/CartContext"

const CartDrawer = () => {
  const { cart, removeItem, updateQuantity } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(id, newQuantity)
  }

  return (
    <div>
      <button className="p-2 hover:text-primary transition-colors relative" onClick={() => setIsOpen(true)}>
        <ShoppingBag className="h-5 w-5" />
        {cart.totalItems > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground text-xs rounded-full">
            {cart.totalItems}
          </span>
        )}
        <span className="sr-only">Open cart</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed right-0 top-0 h-full w-full sm:max-w-md bg-background shadow-lg p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Your Cart ({cart.totalItems})</h2>
              <button className="p-2 hover:bg-muted rounded-full" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            {cart.items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                <div className="text-center">
                  <h3 className="font-medium">Your cart is empty</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Looks like you haven't added anything to your cart yet.
                  </p>
                </div>
                <button
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
                  onClick={() => {
                    setIsOpen(false)
                  }}
                >
                  <Link to="/products">Browse Products</Link>
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-auto py-4">
                  <ul className="space-y-4">
                    {cart.items.map((item) => (
                      <li
                        key={`${item.id}-${item.size}-${item.color}`}
                        className="flex gap-4 py-4 border-b border-border/40"
                      >
                        <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {item.size && `Size: ${item.size}`}
                                {item.size && item.color && " / "}
                                {item.color && `Color: ${item.color}`}
                              </p>
                            </div>
                            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-border/40 rounded-md">
                              <button
                                className="h-8 w-8 flex items-center justify-center"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                                <span className="sr-only">Decrease quantity</span>
                              </button>
                              <span className="w-8 text-center text-sm">{item.quantity}</span>
                              <button
                                className="h-8 w-8 flex items-center justify-center"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                                <span className="sr-only">Increase quantity</span>
                              </button>
                            </div>
                            <button
                              className="h-8 w-8 text-muted-foreground hover:text-destructive flex items-center justify-center"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove item</span>
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-border/40 pt-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${cart.totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link
                      to="/checkout"
                      className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      Checkout
                    </Link>
                    <button
                      className="w-full border border-border py-2 px-4 rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CartDrawer

