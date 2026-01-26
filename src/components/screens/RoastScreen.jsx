"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

/* =======================
   CONSTANTS
======================= */
const TARGET = ["H","B","D","P","R","I","N","C","Y"]

/* =======================
   HELPERS
======================= */
const generateLetters = () => {
  const letters = new Set(TARGET)
  while (letters.size < 24) {
    letters.add(String.fromCharCode(65 + Math.floor(Math.random() * 26)))
  }
  return Array.from(letters).sort(() => Math.random() - 0.5)
}

const wait = (ms) => new Promise(res => setTimeout(res, ms))

const vibrate = (pattern) => {
  if (typeof window === "undefined") return
  if (!("vibrate" in navigator)) return
  navigator.vibrate(pattern)
}

/* =======================
   MAIN COMPONENT
======================= */
export default function MemoryGameScreen({ onNext }) {

  /* ---------- STATES ---------- */
  const [started, setStarted] = useState(false)
  const [letters] = useState(generateLetters)
  const [round, setRound] = useState(1)
  const [showing, setShowing] = useState(false)
  const [active, setActive] = useState(null)
  const [input, setInput] = useState([])
  const [error, setError] = useState(false)
  const [tapFlash, setTapFlash] = useState(null)
  const [wrongTap, setWrongTap] = useState(null)
  const [showWin, setShowWin] = useState(false)

  /* ---------- LOCK (STRICT MODE FIX) ---------- */
  const sequenceRunning = useRef(false)

  /* =======================
     EFFECT
  ======================= */
  useEffect(() => {
    if (!started) return
    if (showWin) return
    playSequence()
    // eslint-disable-next-line
  }, [round, started])

  /* =======================
     SEQUENCE PLAYER
  ======================= */
const playSequence = async () => {
  setShowing(true)
  setInput([])

  // 🔥 AUTO SPEED LOGIC
  // Round badhne par speed kam hoti jayegi
  const speedOn = Math.max(180, 500 - round * 30)   // blink ON
  const speedOff = Math.max(80, 260 - round * 15)   // blink gap

  for (let i = 0; i < round; i++) {
    setActive(TARGET[i])
    vibrate(40)

    await wait(speedOn)   // 👁️ letter visible time

    setActive(null)

    await wait(speedOff)  // ⏱️ gap between letters
  }

  setShowing(false)
}
  /* =======================
     TAP HANDLER
  ======================= */
  const tapLetter = (letter) => {
    if (showing || showWin) return

    setTapFlash(letter)
    vibrate(40)
    setTimeout(() => setTapFlash(null), 220)

    const nextInput = [...input, letter]
    setInput(nextInput)

    /* ❌ WRONG */
    if (letter !== TARGET[nextInput.length - 1]) {
      vibrate([200,100,200])
      setWrongTap(letter)
      setError(true)

      setTimeout(() => {
        setError(false)
        setWrongTap(null)
        playSequence()
      }, 900)
      return
    }

    /* ✅ ROUND COMPLETE */
    if (nextInput.length === round) {
      if (round === TARGET.length) {
        vibrate([200,100,200,100,300])
        setTimeout(() => setShowWin(true), 800)
      } else {
        setTimeout(() => setRound(r => r + 1), 800)
      }
    }
  }

  /* =======================
     RENDER
  ======================= */
  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden px-4">

      {/* 🌌 BACKGROUND STARS */}
      {[...Array(24)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-white/10 select-none"
          style={{
            left: `${Math.random()*100}%`,
            top: `${Math.random()*100}%`
          }}
          animate={{ y:[0,-20,0], opacity:[0.1,0.3,0.1] }}
          transition={{ duration: 5 + Math.random()*3, repeat: Infinity }}
        >
          ✦
        </motion.span>
      ))}

      {/* 🚀 INTRO */}
      <AnimatePresence>
        {!started && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center"
          >
            <motion.h1
              animate={{ y:[0,-12,0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text
              bg-gradient-to-r from-pink-400 via-purple-400 to-violet-400 mb-6"
            >
              Memory Challenge 🧠
            </motion.h1>

            <p className="text-white/70 mb-8">
              Watch carefully & repeat the sequence ✨
            </p>

            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                vibrate([80,40,80])
                setStarted(true)
              }}
              className="px-8 py-4 rounded-2xl font-bold text-lg
              bg-gradient-to-r from-pink-500 to-purple-500 text-white
              shadow-[0_0_35px_rgba(236,72,153,0.9)]"
            >
              Let’s Begin 🚀
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🎮 GAME GRID */}
      {started && !showWin && (
        <>
          <motion.div
            animate={error ? { x:[0,-10,10,-10,10,0] } : {}}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-6 gap-3 z-10"
          >
            {letters.map((l, i) => {
              const isActive = active === l
              const isTap = tapFlash === l
              const isWrong = wrongTap === l

              return (
                <motion.button
                  key={i}
                  type="button"
                  onClick={() => tapLetter(l)}
                  animate={{
                    scale: isActive ? 1.35 : isTap ? 1.15 : 1,
                    backgroundColor: isWrong
                      ? "#7f1d1d"
                      : isTap
                      ? "#166534"
                      : "rgba(255,255,255,0.1)",
                    boxShadow: isActive
                      ? "0 0 32px rgba(236,72,153,0.95)"
                      : isTap
                      ? "0 0 22px rgba(34,197,94,0.95)"
                      : "0 0 0 rgba(0,0,0,0)"
                  }}
                  transition={{ duration: 0.22 }}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-xl
                  text-white text-xl font-bold"
                >
                  {l}
                </motion.button>
              )
            })}
          </motion.div>

          {/* 🔴 ERROR FLASH */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.35 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-red-600"
              />
            )}
          </AnimatePresence>

          <div className="absolute top-6 text-white/60 text-sm">
            Round {round}
          </div>
        </>
      )}

      {/* 🏆 WIN SCREEN */}
      <AnimatePresence>
        {showWin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-30 bg-black flex items-center justify-center text-center px-4"
          >
            <motion.div
              initial={{ scale: 0.65, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              <motion.h1
                animate={{ scale:[1,1.06,1] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text
                bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-400 mb-6"
              >
                YOU WON 🎉
              </motion.h1>

              <p className="text-white/70 mb-10">
                Perfect memory. Sequence mastered ✨
              </p>

              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  vibrate([200,100,200])
                  onNext && onNext()
                }}
                className="px-10 py-4 rounded-2xl font-bold text-lg
                bg-gradient-to-r from-pink-500 to-purple-600 text-white
                shadow-[0_0_40px_rgba(236,72,153,0.95)]"
              >
                Unlock Final Gift 🎁
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}