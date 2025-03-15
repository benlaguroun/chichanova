import { Link } from "react-router-dom"

const CheckoutSuccessPage = () => {
  return (
    <div className="container mx-auto py-12 px-4 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-green-500 mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h1 className="text-2xl font-bold">Thank you for your order!</h1>
        <p className="text-muted-foreground">
          Your order has been placed successfully. We've sent a confirmation email with all the details.
        </p>

        <div className="bg-secondary p-4 rounded-lg">
          <p className="font-medium">Order #12345</p>
          <p className="text-sm text-muted-foreground">March 14, 2025</p>
        </div>

        <p className="text-sm text-muted-foreground">
          Your items will be printed on-demand and shipped within 2-3 business days. You'll receive tracking information
          once your order ships.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link to="/products" className="bg-primary text-primary-foreground px-6 py-3 rounded-md">
            Continue Shopping
          </Link>
          <Link to="/" className="border border-border px-6 py-3 rounded-md">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSuccessPage

