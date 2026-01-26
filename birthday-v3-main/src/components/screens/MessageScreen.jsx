"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import GradientButton from "../GradientButton"
import { ArrowRight } from "lucide-react"

const fullMessage = `
Happy Birthday, Priyanshi! 🎉    

Wishing you a very happy birthday and a year filled with happiness,
good health, and success. As you’ve stepped into 12th, new
opportunities, learning experiences, and exciting possibilities
await you.    

Boards bhi hai iss saal ☠️ but aaj ke din full maje karo 😄    
May this year help you grow with confidence, clarity, and positivity
in everything you do.    

Warm wishes for a wonderful birthday and a bright future ahead 💖
`

export default function MessageScreen({ onNext }) {
  const [opened, setOpened] = useState(false)
  const [displayText, setDisplayText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const scrollRef = useRef(null)

  // ⌨️ TYPEWRITER EFFECT (same speed as example)
  useEffect(() => {
    if (!opened) return

    let index = 0
    const timer = setInterval(() => {
      if (index < fullMessage.length) {
        setDisplayText(fullMessage.slice(0, index + 1))
        index++

        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
      } else {
        clearInterval(timer)
        setShowCursor(false)
      }
    }, 25) // 👌 smooth & readable

    return () => clearInterval(timer)
  }, [opened])

  // ⌨️ BLINKING CURSOR
  useEffect(() => {
    if (!opened) return

    const blink = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 450) // smoother blink

    return () => clearInterval(blink)
  }, [opened])

  return (
    <div className="px-4 md:px-6 py-10 text-center flex flex-col items-center">

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 drop-shadow mb-6"
      >
        A Special Message
      </motion.h2>

      {/* Card */}
      <div className="w-full flex justify-center">
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => setOpened(true)}
          className="
            cursor-pointer
            bg-gradient-to-br from-pink-200 via-pink-100 to-pink-50
            rounded-2xl shadow-2xl
            p-5 md:p-6
            w-full max-w-xl
            mx-auto
          "
        >
          {!opened && (
            <div className="flex items-center justify-center h-[260px] text-xl font-semibold text-pink-700">
              Tap to Open 💌
            </div>
          )}

          <AnimatePresence>
            {opened && (
              <motion.p
                ref={scrollRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="
                  text-[#301733]
                  text-base md:text-lg
                  leading-relaxed
                  max-h-[380px]
                  overflow-y-auto
                  px-1
                  whitespace-pre-line
                  will-change-transform
                "
              >
                {displayText}
                {showCursor && (
                <span className="ml-1 font-bold text-[#301733]">|</span>
)}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Next Button */}
      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8"
          >
            <GradientButton onClick={onNext}>
              Next
              <ArrowRight size={20} className="mt-0.5" />
            </GradientButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}