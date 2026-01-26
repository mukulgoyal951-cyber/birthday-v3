"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function FinalGiftScreen({ onReplay }) {
  const [opened, setOpened] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // 🎉 Confetti on open
  useEffect(() => {
    if (opened) {
      confetti({
        particleCount: 180,
        spread: 90,
        origin: { y: 0.6 },
      });
    }
  }, [opened]);

  const handleReplay = () => {
    setFadeOut(true);
    setTimeout(() => {
      setFadeOut(false);
      setOpened(false);
      onReplay();
    }, 800);
  };

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative flex flex-col items-center justify-center min-h-[70vh] text-center px-4"
        >
          {/* 🎁 Gift */}
          {!opened && (
            <>
              <motion.div
                animate={{ y: [0, -14, 0], scale: [1, 1.08, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.4,
                  ease: "easeInOut",
                }}
                onClick={() => setOpened(true)}
                className="cursor-pointer text-7xl select-none"
              >
                🎁
              </motion.div>

              <p className="mt-4 text-white/80">Tap the gift 🎁</p>
            </>
          )}

          {/* 🎉 Final Message */}
          {opened && (
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              className="mt-6 max-w-xl relative"
            >
              {/* ✨ Glow */}
              <div className="absolute -inset-4 rounded-3xl bg-pink-500/20 blur-2xl" />

              <div className="relative">
                <h2 className="text-3xl font-bold text-pink-400 drop-shadow-lg mb-4">
                  Surprise 🎉
                </h2>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-white text-lg leading-relaxed"
                >
                  <p><strong>Final Birthday Wish 🎂✨</strong></p>
                  <br />
                  <p>
                    Wishing you a very happy birthday. Stay happy, stay calm and
                    follow your passion. May you get all the happiness and
                    success.
                  </p>
                  <br />
                  <p>Happy Birthday — Mahakal bless you 🌸</p>
                </motion.div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={handleReplay}
                  className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-lg"
                >
                  Replay 🔁
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}