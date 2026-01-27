"use client";

import { motion } from "framer-motion";
import { signatureFont } from "@/app/fonts";
import Particles from "@/components/Particles";
import SectionHeader from "./SectionHeader";
import StatsGrid from "./StatsGrid";
import SkillsList from "./SkillsList";
import ExperienceTimeline from "./ExperienceTimeline";
import { aboutData } from "./aboutData";

/**
 * AboutSection Component
 * ======================
 *
 * Main About section featuring personal introduction, skills, experience, and stats.
 * Design consistent with Hero and Projects sections.
 *
 * STRUCTURE:
 * - Hero-style intro with gradient background
 * - Stats grid
 * - Skills categorized by type
 * - Experience timeline
 * - Smooth scroll animations throughout
 */

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full bg-linear-to-b from-black via-black to-transparent overflow-hidden"
    >
      {/* Particles Background */}
      <div className="absolute inset-0 pointer-events-none z-5 opacity-40">
        <Particles
          className=""
          particleCount={1500}
          particleSpread={40}
          speed={0.03}
          particleColors={["#10B981", "#34D399", "#6EE7B7"]}
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

      {/* Aurora Background Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(52,211,153,0.1),transparent_50%)]" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10">
        {/* Hero Introduction - Compact */}
        <div className="flex items-center justify-center px-6 md:px-10 lg:px-16 py-16 md:py-24">
          <motion.div
            className="max-w-6xl w-full"
            initial={{ opacity: 0, rotateX: 15 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ perspective: "1000px" }}
          >
            {/* Main Headline with split animation */}
            <motion.h1
              className="text-center text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.1] text-white tracking-tight mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <motion.span
                className={`inline-block text-[#C9C5B1] ${signatureFont.className}`}
                initial={{ opacity: 0, x: -50, rotateY: -90 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                {aboutData.headlinePrefix}
              </motion.span>
              {"  "}
              <motion.span
                className="inline-block text-emerald-500"
                initial={{ opacity: 0, x: 50, rotateY: 90 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                {aboutData.headlineCenter}
              </motion.span>{" "}
              <motion.span
                className={`inline-block text-[#C9C5B1] ${signatureFont.className}`}
                initial={{ opacity: 0, x: -50, rotateY: -90 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                {aboutData.headlineHighlight}
              </motion.span>{" "}
            </motion.h1>

            {/* Tagline with typewriter effect */}
            <motion.p
              className="text-center text-lg md:text-xl text-zinc-400 mb-6"
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {aboutData.tagline}
            </motion.p>

            {/* Description with reveal animation */}
            <motion.p
              className="text-center text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-12"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
            >
              {aboutData.description}
            </motion.p>

            {/* Stats Grid */}
            <StatsGrid stats={aboutData.stats} />
          </motion.div>
        </div>

        {/* Skills Section */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-16">
          <SectionHeader
            badge="Technical Expertise"
            title="Skills & Technologies"
            subtitle="A comprehensive toolkit built through years of hands-on experience and continuous learning."
          />
          <SkillsList skills={aboutData.skills} />
        </div>

        {/* Experience Section */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-16">
          <SectionHeader
            badge="Professional Journey"
            title="Work Experience"
            subtitle="Building innovative solutions and leading teams across various industries."
          />
          <ExperienceTimeline experiences={aboutData.experience} />
        </div>

        {/* Bottom Spacing */}
        <div className="h-20" />
      </div>
    </section>
  );
}
