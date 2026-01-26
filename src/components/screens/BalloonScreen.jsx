"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BalloonScreen({ onNext }) {
  const [balloons, setBalloons] = useState([
    { id: 1, word: "Happy", popped: false },
    { id: 2, word: "Birthday", popped: false },
    { id: 3, word: "To", popped: false },
    { id: 4, word: "You", popped: false },
  ]);

  const popBalloon = (id) => {
    setBalloons((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, popped: true } : b
      )
    );
  };

  const allPopped = balloons.every((b) => b.popped);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[70vh] text-center">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-xl font-semibold text-white/90"
      >
        Tap on the balloons 🎈
      </motion.h2>

      {/* Balloons */}
      <div className="flex gap-6">
        {balloons.map((b) => (
          <div key={b.id} className="flex flex-col items-center">
            <AnimatePresence>
              {!b.popped && (
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ scale: 0.3, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => popBalloon(b.id)}
                  className="cursor-pointer text-6xl"
                >
                  🎈
                </motion.div>
              )}
            </AnimatePresence>

            {/* Word appears ONLY after pop */}
            {b.popped && (
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mt-3 text-lg font-bold text-pink-400 drop-shadow-lg"
              >
                {b.word}
              </motion.span>
            )}
          </div>
        ))}
      </div>

      {/* Final message + Next */}
      {allPopped && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-10"
        >
          <h3 className="text-3xl font-bold text-pink-400 drop-shadow-lg">
            Happy Birthday priyanshi 🎉
          </h3>

          <button
            onClick={onNext}
            className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-lg active:scale-95 transition"
          >
            Next
          </button>
        </motion.div>
      )}
    </div>
  );
}