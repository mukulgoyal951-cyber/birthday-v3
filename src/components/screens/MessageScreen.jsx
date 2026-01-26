"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import GradientButton from "../GradientButton"
import { ArrowRight } from "lucide-react"

const fullMessage = `
Happy Birthday, Priyanshi! 🎉

Wishing you a very happy birthday and a year filled with happiness,
good health, and success.

As you’ve stepped into 12th, new opportunities, learning experiences,
and exciting possibilities await you.

Boards bhi hai iss saal ☠️
but aaj ke din full maje karo 😄

May this year help you grow with confidence,
clarity, and positivity in everything you do.

Warm wishes for a wonderful birthday
and a bright future ahead 💖
`

const confettiColors = ["#FF3CAC", "#F687B3", "#D8B4FE", "#C084FC", "#F472B6"]

export default function MessageScreen({ onNext }) {
  const [showCover, setShowCover] = useState(true)
  const [text, setText] = useState("")
  const [index, setIndex] = useState(0)
  const scrollRef = useRef(null)

  // Cover animation + confetti burst
  useEffect(() => {
    if (!showCover) return
    const timeout = setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 120,
        startVelocity: 45,
        origin: { y: 0.35 },
        colors: confettiColors,
      })
      setShowCover(false)
    }, 1800) // after cover animation
    return () => clearTimeout(timeout)
  }, [showCover])

  // Typewriter effect
  useEffect(() => {
    if (showCover) return
    if (index >= fullMessage.length) return

    const t = setTimeout(() => {
      setText(prev => prev + fullMessage[index])
      setIndex(prev => prev + 1)

      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }
    }, 50)

    return () => clearTimeout(t)
  }, [index, showCover])

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-black via-[#120018] to-black overflow-hidden">

      {/* Floating particles */}
      {[...Array(18)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-white/10 text-xl select-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✦
        </motion.span>
      ))}

      {/* COVER CARD */}
      <AnimatePresence>
        {showCover && (
          <motion.div
            className="absolute z-20 w-full max-w-lg bg-gradient-to-br from-pink-500/50 via-purple-500/30 to-indigo-500/40 rounded-3xl p-12 text-center shadow-2xl ring-2 ring-white/20"
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 1.3, opacity: 0, rotate: 10 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg"
            >
              Happy Birthday!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-4 text-lg md:text-2xl text-white/80"
            >
              Priyanshi 🎉
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MESSAGE CARD */}
      {!showCover && (
        <motion.div
          ref={scrollRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: [0, -3, 0] }}
          transition={{
            opacity: { duration: 0.8 },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
          className="relative z-10 max-w-xl w-full max-h-[70vh] overflow-y-auto whitespace-pre-line rounded-2xl bg-white/5 backdrop-blur-md p-6 md:p-8 text-white text-lg md:text-xl leading-relaxed shadow-2xl ring-1 ring-pink-500/20"
        >
          {/* Glow background */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500/10 via-transparent to-violet-500/10 blur-xl -z-10" />
          <span>{text}</span>

          {/* Cursor */}
          {index < fullMessage.length && (
            <motion.span
              className="inline-block ml-1 w-[2px] h-[1.2em] bg-pink-400 align-middle"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.div>
      )}

      {/* NEXT BUTTON */}
      {!showCover && index >= fullMessage.length && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute bottom-10"
        >
          <GradientButton onClick={onNext}>
            Next <ArrowRight size={20} />
          </GradientButton>
        </motion.div>
      )}
    </div>
  )
}