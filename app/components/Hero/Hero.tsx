"use client";

import { motion, easeOut } from "framer-motion";
import { signatureFont } from "@/app/fonts";
import CanvasBackgroundOverlay from "./CanvasBackgroundOverlay";
import Particles from "@/components/Particles";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut },
    },
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-transparent to-black">
      <CanvasBackgroundOverlay
        imageSrc="/BackgroundOverlay.png"
        opacity={0.6}
      />

      {/* Particles Background */}
      <div className="absolute inset-0 pointer-events-none z-[5]">
        <Particles
          className=""
          particleCount={10000}
          particleSpread={40}
          speed={0.03}
          particleColors={["#ffffff", "#f0f0f0", "#ffffff"]}
          alphaParticles={true}
          particleBaseSize={100}
          sizeRandomness={1}
          cameraDistance={10}
          pixelRatio={
            typeof window !== "undefined"
              ? Math.min(window.devicePixelRatio, 2)
              : 1
          }
        />
      </div>

      <motion.div
        className="relative z-10 flex min-h-screen items-center justify-center px-6 md:px-10 lg:px-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: easeOut }}
      >
        <motion.h1
          className="max-w-4xl text-center text-[clamp(3.5rem,8vw,6.5rem)] font-bold leading-[1.1] text-white tracking-tight"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={wordVariants}
            className={`inline-block text-[#C9C5B1] ${signatureFont.className}`}
            style={{ fontSize: "1.15em" }}
          >
            Designing
          </motion.span>{" "}
          <motion.span
            variants={wordVariants}
            className="hero-gradient-text ml-2 inline-block text-white "
            style={{ fontSize: "1.15em" }}
          >
            clarity
          </motion.span>{" "}
          <motion.span
            variants={wordVariants}
            className="inline-block"
            style={{ fontSize: "1.15em" }}
          >
            from
          </motion.span>{" "}
          <motion.span
            variants={wordVariants}
            className={`inline-block text-[#C9C5B1] ${signatureFont.className}`}
            style={{ fontSize: "1.15em" }}
          >
            complexity.
          </motion.span>
        </motion.h1>
      </motion.div>
    </section>
  );
}
