"use client"
import Image from "next/image"
import { ShoppingBag, X, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "./cart-provider"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { formatPrice } from "@/lib/utils"

export function CartButton() {
  const { totalItems } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <CartContent closeSheet={() => setIsOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}

function CartContent({ closeSheet }: { closeSheet: () => void }) {
  const { items = [], removeItem, updateQuantity, totalItems, totalPrice } = useCart()
  const router = useRouter()

  if (!Array.isArray(items) || totalItems === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
        <p className="text-muted-foreground mb-6 text-center">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow-sm"
          onClick={() => {
            closeSheet()
            router.push("/products")
          }}
        >
          Browse Products
        </Button>
      </div>
    )
  }

  const handleCheckout = () => {
    closeSheet()
    router.push("/checkout")
  }

  const handleContinueShopping = () => {
    closeSheet()
    router.push("/products")
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
                <p className="font-medium">
                  <span className="text-sm font-medium">${formatPrice(item.price * item.quantity)}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between mb-4 text-sm text-muted-foreground">
          <span>Shipping calculated at checkout</span>
        </div>

        <Button
          className="w-full mb-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md shadow-sm transition-all"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </Button>
        <Button
          variant="outline"
          className="w-full border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 font-semibold py-3 px-6 rounded-md transition-all"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  )
}

