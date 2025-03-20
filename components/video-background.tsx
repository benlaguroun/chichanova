"use client"

import { useEffect, useRef, useState } from "react"

interface VideoBackgroundProps {
  src: string
  fallbackImage?: string
  overlay?: boolean
  overlayOpacity?: number
  priority?: boolean
}

export default function VideoBackground({
  src,
  fallbackImage = "/placeholder.svg?height=1080&width=1920",
  overlay = true,
  overlayOpacity = 0.5,
  priority = true,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [videoError, setVideoError] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Preload the video
    if (priority) {
      const preloadLink = document.createElement("link")
      preloadLink.rel = "preload"
      preloadLink.as = "video"
      preloadLink.href = src
      document.head.appendChild(preloadLink)
    }

    // Check if video exists
    fetch(src)
      .then((response) => {
        if (!response.ok) {
          console.error("Video file not found or not accessible:", src, response.status)
          setVideoError(true)
          setIsLoading(false)
        } else {
          console.log("Video file exists and is accessible")
        }
      })
      .catch((error) => {
        console.error("Error checking video file:", error)
        setVideoError(true)
        setIsLoading(false)
      })

    // Handle video loading events
    const handleCanPlay = () => {
      setIsLoading(false)
      console.log("Video can play now")
    }

    const handleError = (error: any) => {
      console.error("Error with video:", error)
      setVideoError(true)
      setIsLoading(false)
    }

    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("error", handleError)

    // Play video when component mounts
    video.load() // Force load the video

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.error("Error playing video:", error)
        // Don't set videoError here, as we'll try again on user interaction
      })
    }

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
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("error", handleError)

      // Clean up preload link
      if (priority) {
        const links = document.querySelectorAll('link[rel="preload"][href="' + src + '"]')
        links.forEach((link) => link.remove())
      }
    }
  }, [src, priority])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Fallback image that shows immediately */}
      <div
        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-500 ${!isLoading && !videoError ? "opacity-0" : "opacity-100"}`}
        style={{ backgroundImage: `url(${fallbackImage})` }}
      />

      {/* Video element */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isLoading || videoError ? "opacity-0" : "opacity-100"}`}
        autoPlay
        muted
        loop
        playsInline
        poster={fallbackImage}
        preload="auto"
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Loading indicator */}
      {isLoading && !videoError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Overlay */}
      {overlay && <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />}
    </div>
  )
}

