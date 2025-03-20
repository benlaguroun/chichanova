"use client"

import { useEffect, useRef } from "react"

interface VideoBackgroundProps {
  src: string
  fallbackImage?: string
  overlay?: boolean
  overlayOpacity?: number
}

export default function VideoBackground({
  src,
  fallbackImage = "/placeholder.svg?height=1080&width=1920",
  overlay = true,
  overlayOpacity = 0.5,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    console.log("Attempting to play video from:", src)

    // Check if video exists
    fetch(src)
      .then((response) => {
        if (!response.ok) {
          console.error("Video file not found or not accessible:", src, response.status)
        } else {
          console.log("Video file exists and is accessible")
        }
      })
      .catch((error) => {
        console.error("Error checking video file:", error)
      })

    // Play video when component mounts
    video.play().catch((error) => {
      console.error("Error playing video:", error)
    })

    // Handle autoplay issues on mobile
    const handleInteraction = () => {
      if (video.paused) {
        video.play().catch((e) => console.error("Error playing video after interaction:", e))
      }
    }

    document.addEventListener("click", handleInteraction)
    document.addEventListener("touchstart", handleInteraction)

    return () => {
      document.removeEventListener("click", handleInteraction)
      document.removeEventListener("touchstart", handleInteraction)
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={fallbackImage}
      >
        <source src={src} type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        <img
          src={fallbackImage || "/placeholder.svg"}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </video>
      {overlay && <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />}
    </div>
  )
}

