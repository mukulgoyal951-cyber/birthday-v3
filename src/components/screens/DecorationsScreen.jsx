"use client"

import { motion } from "framer-motion"

export default function DecorationsScreen({ onNext }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-[#120018] to-black flex items-center justify-center">

      {/* 🌌 SUBTLE GRID */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#ffffff08_1px,transparent_0)] bg-[size:40px_40px] opacity-40" />

      {/* 🎀 TOP FLAGS */}
      <motion.img
        src="/decorations/image01.svg"
        alt="flags"
        className="absolute top-4 left-1/2 -translate-x-1/2 w-[120%] max-w-none z-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: [0, -6, 0], opacity: 1 }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 🎈 LEFT BALLOONS */}
      <motion.img
        src="/decorations/image02.gif"
        alt="left balloons"
        className="absolute left-0 bottom-0 w-28 md:w-36 z-10"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: [0, -20, 0], opacity: 1 }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 🎈 RIGHT BALLOONS */}
      <motion.img
        src="/decorations/image03.gif"
        alt="right balloons"
        className="absolute right-0 bottom-0 w-28 md:w-36 z-10"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: [0, -20, 0], opacity: 1 }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ✨ FLOATING SPARKLES */}
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-white/30 text-xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✨
        </motion.span>
      ))}

      {/* 🎉 CENTER TEXT */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-20 text-center px-6"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-400 drop-shadow-lg">
          Let’s Decorate 🎉
        </h1>

        <button
          onClick={onNext}
          className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-lg active:scale-95 transition"
        >
          Next →
        </button>
      </motion.div>
    </div>
  )
}