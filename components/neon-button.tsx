"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface NeonButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  color?: "blue" | "purple" | "cyan" | "green" | "red"
  variant?: "standard" | "snake"
}

export default function NeonButton({
  children,
  onClick,
  className,
  color = "blue",
  variant = "standard",
}: NeonButtonProps) {
  // Color configurations
  const colors = {
    blue: "rgba(59, 130, 246, 0.8)",
    purple: "rgba(139, 92, 246, 0.8)",
    cyan: "rgba(34, 211, 238, 0.8)",
    green: "rgba(16, 185, 129, 0.8)",
    red: "rgba(239, 68, 68, 0.8)",
  }

  const selectedColor = colors[color]

  // Generate unique CSS variables for this button instance
  const buttonStyle = {
    "--neon-color": selectedColor,
  } as React.CSSProperties

  return (
    <div className={`neon-button-container ${variant === "snake" ? "snake-variant" : ""}`} style={buttonStyle}>
      <button onClick={onClick} className={cn("neon-button", className)}>
        {children}
      </button>
    </div>
  )
}

