"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface LoadingScreenProps {
  onLoadingComplete: () => void
  duration?: number
  logo?: string
}

export default function LoadingScreen({ onLoadingComplete, duration = 3000, logo = "/logo.png" }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("LOADING_SYSTEM: 00V7GJ@$")

  useEffect(() => {
    const interval = 30 // Update every 30ms
    const steps = duration / interval
    const increment = 100 / steps

    let currentProgress = 0
    const timer = setInterval(() => {
      currentProgress += increment

      if (currentProgress >= 100) {
        clearInterval(timer)
        currentProgress = 100
        setTimeout(() => {
          onLoadingComplete()
        }, 500) // Wait a bit after reaching 100%
      }

      setProgress(Math.min(Math.round(currentProgress), 100))

      // Randomly change loading text characters for effect
      if (Math.random() > 0.7) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+"
        const randomChar = chars.charAt(Math.floor(Math.random() * chars.length))
        const position = Math.floor(Math.random() * 10) + 15 // Position after "LOADING_SYSTEM: "

        setLoadingText((prev) => {
          const arr = prev.split("")
          if (arr[position]) {
            arr[position] = randomChar
          }
          return arr.join("")
        })
      }
    }, interval)

    return () => clearInterval(timer)
  }, [duration, onLoadingComplete])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
      <div className="w-48 h-48 mb-8 relative">
        <Image src={logo || "/placeholder.svg"} alt="Logo" fill className="object-contain" />
      </div>

      <div className="text-sm font-mono mb-4 tracking-wider">{loadingText}</div>

      <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-white transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
      </div>

      <div className="text-sm font-mono mt-2">{progress}%</div>
    </div>
  )
}

