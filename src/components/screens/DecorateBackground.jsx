"use client";
import { motion } from "framer-motion";

export function DecorateScreen({ onNext, setDecorated }) {
  return (
    <div className="relative flex items-center justify-center min-h-[70vh] text-center">
      {/* Decoration Elements (hidden until tap) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 pointer-events-none"
      >
        <span className="absolute top-10 left-10 text-3xl">🎉</span>
        <span className="absolute top-20 right-14 text-3xl">✨</span>
        <span className="absolute bottom-20 left-16 text-3xl">💖</span>
        <span className="absolute bottom-10 right-10 text-3xl">❤️</span>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 w-[90%] max-w-md p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20"
      >
        <h2 className="text-2xl font-bold text-pink-400">
          Let’s Decorate 🎉
        </h2>

        <p className="mt-2 text-white/80">
          Tap to decorate the background
        </p>

        <button
          onClick={() => {
            setDecorated(true);     // background stays decorated
            setTimeout(onNext, 600);
          }}
          className="mt-8 w-full py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-lg"
        >
          Decorate ✨
        </button>
      </motion.div>
    </div>
  );
}