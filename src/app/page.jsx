"use client";

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import LoaderScreen from "@/components/screens/LoaderScreen"
import IntroScreen from "@/components/screens/IntroScreen"
import CakeScreen from "@/components/screens/CakeScreen"
import WishScreen from "@/components/screens/WishScreen"
import RoastScreen from "@/components/screens/RoastScreen"
import PhotosScreen from "@/components/screens/PhotosScreen"
import MessageScreen from "@/components/screens/MessageScreen"
import BalloonScreen from "@/components/screens/BalloonScreen";
import FinalGiftScreen from "@/components/screens/FinalGiftScreen";

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState(0)

const screens = [
  <LoaderScreen onDone={() => setCurrentScreen(1)} />,
  <IntroScreen onNext={() => setCurrentScreen(2)} />,
  <CakeScreen onNext={() => setCurrentScreen(3)} />,
  <WishScreen onNext={() => setCurrentScreen(4)} />,
  <BalloonScreen onNext={() => setCurrentScreen(5)} />,
  <PhotosScreen onNext={() => setCurrentScreen(6)} />,
  <MessageScreen onNext={() => setCurrentScreen(7)} />,
  <RoastScreen onNext={() => setCurrentScreen(8)} />,
  <FinalGiftScreen onReplay={() => setCurrentScreen(1)} />,
  ]

  return (
    <main className="min-h-screen bg-gradient-to-tr from-rose-950/40 via-black to-rose-950/40 overflow-hidden relative">

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            transition={{ duration: 0.8 }}
            className={`w-full ${currentScreen === 4 ? "max-w-7xl" : "max-w-3xl md:max-w-4xl"}`}
          >
            {screens[currentScreen]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Watermark */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1,
          delay: 1,
        }}
        className="fixed bottom-4 right-4 text-sm text-white/40 pointer-events-none z-50 font-light">
        @mukul goyal
      </motion.div>
    </main>
  )
}
