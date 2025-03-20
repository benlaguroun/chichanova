"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import VideoBackground from "./video-background";

interface IntroScreenProps {
  onEnterSite: () => void;
  logo?: string;
  videoSrc?: string;
}

export default function IntroScreen({
  onEnterSite,
  logo = "/logo.png",
  videoSrc = "/street-video.mp4",
}: IntroScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleEnter = () => {
    setIsVisible(false);
    setTimeout(() => {
      onEnterSite();
    }, 1000); // Wait for exit animation
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      <VideoBackground src={videoSrc} overlayOpacity={0.7} />

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-32 h-32 mb-6"
        >
          <Image
            src={logo || "/placeholder.svg"}
            alt="Logo"
            width={128}
            height={128}
            className="object-contain"
          />
        </motion.div>

        {/* <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight"
        >
          Premium Streetwear
        </motion.h1> */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-200 mb-10"
        >
          Elevate Your Style
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            onClick={handleEnter}
            className="px-12 py-3 bg-black border-2 border-white text-white font-bold tracking-widest hover:bg-white hover:text-black transition-all duration-300"
          >
            SHOP
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
