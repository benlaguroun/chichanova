import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  variant?: "default" | "white" | "black"
  withText?: boolean
  size?: "sm" | "md" | "lg"
}

export default function Logo({ variant = "default", withText = true, size = "md" }: LogoProps) {
  const sizes = {
    sm: { container: "h-8", image: 32 },
    md: { container: "h-10", image: 40 },
    lg: { container: "h-16", image: 64 },
  }

  const textColors = {
    default: "text-foreground",
    white: "text-white",
    black: "text-black",
  }

  return (
    <Link href="/" className={`flex items-center gap-2 ${sizes[size].container}`}>
      <div className="relative aspect-square h-full">
        <Image
          src="/logo.png" // Replace with your actual logo path
          alt="BlueThread Logo"
          width={sizes[size].image}
          height={sizes[size].image}
          className="object-contain"
        />
      </div>
      {withText && (
        <span className={`font-bold text-xl ${textColors[variant]}`}>
          BLUE<span className="text-primary">THREAD</span>
        </span>
      )}
    </Link>
  )
}

