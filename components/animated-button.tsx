"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps {
  href: string
  children: React.ReactNode
  variant?: "neon" | "pulse" | "glitch" | "gradient"
  color?: "blue" | "purple" | "green" | "red" | "cyan"
  className?: string
  delay?: number
  alwaysAnimate?: boolean
  onClick?: () => void
}

export default function AnimatedButton({
  href,
  children,
  variant = "neon",
  color = "blue",
  className,
  delay = 0,
  alwaysAnimate = true,
  onClick,
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Color configurations
  const colors = {
    blue: {
      primary: "from-blue-500 to-blue-600 border-blue-500 text-blue-500",
      glow: "from-blue-500/20 to-blue-600/20 group-hover:from-blue-500/40 group-hover:to-blue-600/40",
      shadow: "shadow-blue-500/30 group-hover:shadow-blue-500/50",
      border: "border-blue-500/50 group-hover:border-blue-500",
      text: "text-blue-500",
      background: "bg-blue-500",
    },
    purple: {
      primary: "from-purple-500 to-purple-600 border-purple-500 text-purple-500",
      glow: "from-purple-500/20 to-purple-600/20 group-hover:from-purple-500/40 group-hover:to-purple-600/40",
      shadow: "shadow-purple-500/30 group-hover:shadow-purple-500/50",
      border: "border-purple-500/50 group-hover:border-purple-500",
      text: "text-purple-500",
      background: "bg-purple-500",
    },
    green: {
      primary: "from-green-500 to-green-600 border-green-500 text-green-500",
      glow: "from-green-500/20 to-green-600/20 group-hover:from-green-500/40 group-hover:to-green-600/40",
      shadow: "shadow-green-500/30 group-hover:shadow-green-500/50",
      border: "border-green-500/50 group-hover:border-green-500",
      text: "text-green-500",
      background: "bg-green-500",
    },
    red: {
      primary: "from-red-500 to-red-600 border-red-500 text-red-500",
      glow: "from-red-500/20 to-red-600/20 group-hover:from-red-500/40 group-hover:to-red-600/40",
      shadow: "shadow-red-500/30 group-hover:shadow-red-500/50",
      border: "border-red-500/50 group-hover:border-red-500",
      text: "text-red-500",
      background: "bg-red-500",
    },
    cyan: {
      primary: "from-cyan-500 to-cyan-600 border-cyan-500 text-cyan-500",
      glow: "from-cyan-500/20 to-cyan-600/20 group-hover:from-cyan-500/40 group-hover:to-cyan-600/40",
      shadow: "shadow-cyan-500/30 group-hover:shadow-cyan-500/50",
      border: "border-cyan-500/50 group-hover:border-cyan-500",
      text: "text-cyan-500",
      background: "bg-cyan-500",
    },
  }

  const selectedColor = colors[color]

  const variants = {
    neon: {
      button: `relative px-8 py-4 bg-transparent border-2 ${selectedColor.border} ${selectedColor.text} font-bold tracking-wider overflow-hidden group`,
      effects: (
        <>
          <span
            className={`absolute inset-0 ${alwaysAnimate ? "animate-pulse-slow" : "group-hover:animate-pulse-slow"}`}
          ></span>
          <span
            className={`absolute inset-0 bg-gradient-to-r ${selectedColor.glow} ${alwaysAnimate ? "animate-pulse-slow blur-xl" : "opacity-0 group-hover:opacity-100 group-hover:blur-xl"} transition-all duration-500`}
          ></span>
          <span
            className={`absolute bottom-0 left-0 right-0 h-1 ${selectedColor.background} transform scale-x-0 ${alwaysAnimate ? "animate-neon-border" : "group-hover:scale-x-100"} transition-transform duration-500 origin-left`}
          ></span>
          <span
            className={`absolute top-0 left-0 right-0 h-1 ${selectedColor.background} transform scale-x-0 ${alwaysAnimate ? "animate-neon-border-reverse" : "group-hover:scale-x-100"} transition-transform duration-500 origin-right`}
          ></span>
          <span
            className={`absolute left-0 top-0 bottom-0 w-1 ${selectedColor.background} transform scale-y-0 ${alwaysAnimate ? "animate-neon-border-vertical" : "group-hover:scale-y-100"} transition-transform duration-500 origin-bottom`}
          ></span>
          <span
            className={`absolute right-0 top-0 bottom-0 w-1 ${selectedColor.background} transform scale-y-0 ${alwaysAnimate ? "animate-neon-border-vertical-reverse" : "group-hover:scale-y-100"} transition-transform duration-500 origin-top`}
          ></span>
          <span
            className={`absolute inset-0 ${selectedColor.border} opacity-0 ${alwaysAnimate ? "animate-pulse-slow" : "group-hover:opacity-100 group-hover:animate-pulse-slow"} transition-opacity duration-500`}
          ></span>
          <span className={`relative z-10 ${alwaysAnimate ? "animate-pulse-text" : ""}`}>{children}</span>
        </>
      ),
    },
    pulse: {
      button: `relative px-8 py-4 ${selectedColor.background} text-white font-bold tracking-wider overflow-hidden group ${alwaysAnimate ? "shadow-lg " + selectedColor.shadow : ""}`,
      effects: (
        <>
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          <span
            className={`absolute inset-0 flex justify-center items-center ${alwaysAnimate ? "animate-pulse-fast" : "group-hover:animate-pulse-fast"}`}
          >
            <span className={`h-full w-full ${selectedColor.background} opacity-100`}></span>
          </span>
          <span
            className={`absolute -inset-1 bg-gradient-to-r ${selectedColor.primary} opacity-30 ${alwaysAnimate ? "blur animate-pulse-slow" : "group-hover:opacity-100 blur group-hover:animate-pulse-slow"}`}
          ></span>
          <span className="relative z-10">{children}</span>
        </>
      ),
    },
    glitch: {
      button: `relative px-8 py-4 bg-transparent border border-white/50 ${selectedColor.text} font-bold tracking-wider overflow-hidden group`,
      effects: (
        <>
          <span className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-all duration-300"></span>
          <span className={`absolute inset-0 ${alwaysAnimate ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
            <span
              className={`absolute inset-0 bg-gradient-to-r ${selectedColor.primary} opacity-20 ${alwaysAnimate ? "animate-gradient-x" : "group-hover:animate-gradient-x"}`}
            ></span>
          </span>
          <span
            className={`absolute top-0 left-0 right-0 h-px bg-white/50 transform translate-y-px ${alwaysAnimate ? "animate-glitch-h" : "group-hover:animate-glitch-h"}`}
          ></span>
          <span
            className={`absolute bottom-0 left-0 right-0 h-px bg-white/50 transform -translate-y-px ${alwaysAnimate ? "animate-glitch-h" : "group-hover:animate-glitch-h"}`}
          ></span>
          <span
            className={`absolute top-0 bottom-0 left-0 w-px bg-white/50 transform translate-x-px ${alwaysAnimate ? "animate-glitch-v" : "group-hover:animate-glitch-v"}`}
          ></span>
          <span
            className={`absolute top-0 bottom-0 right-0 w-px bg-white/50 transform -translate-x-px ${alwaysAnimate ? "animate-glitch-v" : "group-hover:animate-glitch-v"}`}
          ></span>
          <span className={`relative z-10 ${alwaysAnimate ? "animate-pulse-text" : "group-hover:animate-pulse-text"}`}>
            {children}
          </span>
        </>
      ),
    },
    gradient: {
      button: `relative px-8 py-4 bg-transparent border-2 border-white/50 text-white font-bold tracking-wider overflow-hidden group ${alwaysAnimate ? "shadow-lg " + selectedColor.shadow : ""}`,
      effects: (
        <>
          <span
            className={`absolute inset-0 bg-gradient-to-r ${selectedColor.primary} ${alwaysAnimate ? "opacity-100 animate-gradient-xy" : "opacity-0 group-hover:opacity-100 group-hover:animate-gradient-xy"} transition-opacity duration-500`}
          ></span>
          <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 mix-blend-overlay transition-opacity duration-500"></span>
          <span
            className={`absolute -inset-1 bg-gradient-to-r ${selectedColor.primary} ${alwaysAnimate ? "opacity-30 blur-lg animate-pulse-slow" : "opacity-0 group-hover:opacity-30 blur-lg group-hover:animate-pulse-slow"}`}
          ></span>
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">{children}</span>
        </>
      ),
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {onClick ? (
        <button onClick={onClick} className={cn(variants[variant].button, className)}>
          {variants[variant].effects}
        </button>
      ) : (
        <Link href={href} className={cn(variants[variant].button, className)}>
          {variants[variant].effects}
        </Link>
      )}
    </motion.div>
  )
}

