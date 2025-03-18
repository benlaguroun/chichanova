"use client"
import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, X, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "./cart-provider"

export function CartButton() {
  const { totalItems } = useCart()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <CartContent />
      </SheetContent>
    </Sheet>
  )
}

function CartContent() {
  const { items = [], removeItem, updateQuantity, totalItems, totalPrice } = useCart()

  if (!Array.isArray(items) || totalItems === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
        <p className="text-muted-foreground mb-6 text-center">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Button asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <SheetHeader>
        <SheetTitle>Your Cart ({totalItems} items)</SheetTitle>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto py-4">
        {items.map((item) => (
          <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 py-4 border-b">
            <div className="relative h-20 w-20 rounded-md overflow-hidden bg-secondary">
              <Image
                src={item.image || "/placeholder.svg?height=80&width=80"}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex justify-between">
                <h4 className="font-medium">{item.name}</h4>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeItem(item.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {item.size && <p className="text-sm text-muted-foreground">Size: {item.size}</p>}
              {item.color && <p className="text-sm text-muted-foreground">Color: {item.color}</p>}

              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-none"
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-none"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-4 text-sm text-muted-foreground">
          <span>Shipping calculated at checkout</span>
        </div>

        <Button className="w-full mb-2" asChild>
          <Link href="/checkout">Proceed to Checkout</Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  )
}

