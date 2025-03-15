import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function CheckoutSuccessPage() {
  return (
    <div className="container py-12 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="max-w-md w-full text-center space-y-6">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
        <h1 className="text-2xl font-bold">Thank you for your order!</h1>
        <p className="text-muted-foreground">
          Your order has been placed successfully. We've sent a confirmation email with all the details.
        </p>

        <div className="bg-muted p-4 rounded-lg">
          <p className="font-medium">Order #12345</p>
          <p className="text-sm text-muted-foreground">March 14, 2025</p>
        </div>

        <p className="text-sm text-muted-foreground">
          Your items will be printed on-demand and shipped within 2-3 business days. You'll receive tracking information
          once your order ships.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/account/orders">View Order</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

