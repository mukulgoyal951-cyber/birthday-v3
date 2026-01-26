"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import GradientButton from "../GradientButton"

const playSound = (src) => {
  const audio = new Audio(src)
  audio.volume = 0.6
  audio.play()
}

const vibrate = (pattern = [100]) => {
  if (navigator.vibrate) navigator.vibrate(pattern)
}

const burst = () => {
  confetti({
    particleCount: 200,
    spread: 140,
    startVelocity: 50,
    origin: { y: 0.6 },
    colors: ["#FF3CAC", "#D8B4FE", "#C084FC", "#F472B6"],
  })
}

export default function WishScreen({ onNext }) {
  const [started, setStarted] = useState(false)
  const [count, setCount] = useState(3)
  const [done, setDone] = useState(false)

  const startWish = () => {
    playSound("/sounds/tap.mp3")
    vibrate([80])
    setStarted(true)

    let i = 3
    const timer = setInterval(() => {
      playSound("/sounds/count.mp3")
      vibrate([60])
      i--
      setCount(i)

      if (i === 0) {
        clearInterval(timer)

        setTimeout(() => {
          playSound("/sounds/magic.mp3")
          vibrate([200, 80, 200])
          burst()
          setDone(true)
        }, 600)
      }
    }, 1000)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-black via-[#120018] to-black overflow-hidden">

      {/* 🌌 FLOATING MAGIC */}
      {[...Array(30)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-white/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.6, 0.1] }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 🌊 MAGIC WAVE */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute inset-0 bg-pink-500/20 rounded-full blur-3xl"
          />
        )}
      </AnimatePresence>

      {/* 🎇 CENTER */}
      <div className="relative z-10 text-center max-w-xl w-full">

        {!started && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text
              bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 mb-6"
            >
              Close your eyes  
              <br />and make a wish ✨
            </motion.h1>

            <p className="text-white/70 mb-8">
              Trust the moment 🌙
            </p>

            <GradientButton onClick={startWish}>
              Make a Wish 🌠
            </GradientButton>
          </motion.div>
        )}

        {/* ⏳ COUNTDOWN */}
        <AnimatePresence>
          {started && !done && (
            <motion.div
              key={count}
              initial={{ scale: 0.3, opacity: 0, rotate: -12 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 1.8, opacity: 0, rotate: 12 }}
              transition={{ duration: 0.55 }}
              className="text-8xl md:text-9xl font-black text-white
              drop-shadow-[0_0_30px_rgba(236,72,153,0.9)]"
            >
              {count}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🔮 WISH LOCKED */}
        {done && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.h2
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text
              bg-gradient-to-r from-pink-400 via-violet-400 to-indigo-400 mb-6"
            >
              Your wish is locked 🔒✨
            </motion.h2>

            <p className="text-white/70 mb-8">
              Universe is working on it 🌌
            </p>

            <GradientButton onClick={onNext}>
              Continue →
            </GradientButton>
          </motion.div>
        )}
      </div>
    </div>
  )
}