"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import Particles from "@/components/Particles";
import SectionHeader from "./SectionHeader";
import SkillsList from "./SkillsList";
import ExperienceTimeline from "./ExperienceTimeline";
import StatsGrid from "./StatsGrid";
import { aboutData } from "./aboutData";
import { useResumeModal } from "@/app/contexts/ResumeModalContext";
import { techIconMap } from "./techIcons";

/**
 * AboutSection Component
 * ======================
 *
 * Main About section featuring personal introduction, skills, experience, and stats.
 * Design consistent with Hero and Projects sections (Titanium & Asphalt theme).
 */

export default function AboutSection() {
  const { openResume } = useResumeModal();
  const [particleCount, setParticleCount] = useState(1500);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setParticleCount(300);
      } else {
        setParticleCount(1500);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Parallax Logic
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const titleX = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0],
  );

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full bg-neutral-950 overflow-hidden py-24 md:py-32"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.05),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none mix-blend-overlay" />

      {/* Background Title - Parallax feel */}
      <div className="absolute top-[10%] left-0 w-full select-none pointer-events-none overflow-hidden mix-blend-overlay opacity-[0.04] z-0">
        <motion.div
          style={{ x: titleX, opacity: titleOpacity }}
          className="whitespace-nowrap"
        >
          <span className="text-[20vw] font-black uppercase text-white leading-none tracking-tighter">
            About Me &bull; Profile
          </span>
        </motion.div>
      </div>

      {/* Particles Background */}
      <div className="absolute inset-0 pointer-events-none z-5 opacity-40">
        <Particles
          className="w-full h-full"
          particleCount={particleCount}
          particleSpread={10}
          speed={0.05}
          particleColors={["#10B981", "#34D399", "#ffffff"]}
          alphaParticles={true}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full px-6 md:px-10 lg:px-16">
        {/* HERO HEADER */}
        <div className="flex items-center justify-center py-12 md:py-20">
          <motion.div
            className="max-w-6xl w-full text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 className="text-[clamp(2.5rem,5vw,5rem)] font-bold leading-tight text-white tracking-tight mb-8">
              <span className="text-neutral-500">
                {aboutData.headlinePrefix}{" "}
              </span>
              <span className="inline-block text-emerald-400 font-mono bg-emerald-500/10 px-4 rounded-xl border border-emerald-500/20">
                {"<"}
                {aboutData.headlineCenter}
                {" />"}
              </span>
              <br className="xl:hidden" />
              <span className="text-white"> {aboutData.headlineHighlight}</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-emerald-500/60 font-mono tracking-wide"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              // {aboutData.tagline}
            </motion.p>
          </motion.div>
        </div>

        {/* STATS STRIP */}
        <div className="max-w-7xl mx-auto mb-16 md:mb-24">
          <StatsGrid stats={aboutData.stats} />
        </div>

        {/* MAIN GRID */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
          {/* Left Side - Description (Code Editor Style) - Spans 7 cols */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative group h-full">
              {/* Glow behind editor */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Editor Window */}
              <div className="relative rounded-xl bg-[#09090b] border border-white/5 shadow-2xl overflow-hidden ring-1 ring-white/5 h-full flex flex-col">
                {/* Editor Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <span className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    about_me.tsx
                  </div>
                </div>

                {/* Editor Content */}
                <div className="p-6 md:p-8 font-mono text-sm md:text-base leading-relaxed text-neutral-300 flex-1 overflow-visible">
                  <div className="flex gap-4 h-full">
                    {/* Line Numbers */}
                    <div className="flex flex-col text-neutral-800 select-none text-right min-w-[2rem] pt-[2px] border-r border-white/5 pr-4">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <span key={i} className="leading-relaxed">
                          {i + 1}
                        </span>
                      ))}
                    </div>

                    {/* Code Content */}
                    <div className="flex-1 space-y-2">
                      <p>
                        <span className="text-pink-500">const</span>{" "}
                        <span className="text-blue-400">Ray</span>{" "}
                        <span className="text-neutral-400">=</span>{" "}
                        <span className="text-yellow-300">{"{"}</span>
                      </p>
                      <div className="pl-6 space-y-4">
                        <div className="space-y-1">
                          <p className="text-neutral-500">// My Mission</p>
                          <p className="text-emerald-300/90">
                            "{aboutData.headlinePrefix}{" "}
                            {aboutData.headlineCenter}"
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-neutral-500">// Bio</p>
                          <p className="text-neutral-300 whitespace-pre-wrap">
                            {aboutData.description}
                          </p>
                        </div>
                      </div>
                      <p className="text-yellow-300">{"};"}</p>
                      <p className="text-neutral-600 animate-pulse">_</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Technologies (5 cols) */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-8 shadow-2xl h-full flex flex-col backdrop-blur-md relative overflow-hidden">
              {/* Tech Background Effect */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

              <h3 className="text-sm font-mono text-emerald-400 tracking-widest uppercase mb-8 flex items-center gap-3 relative z-10">
                <span className="w-8 h-[1px] bg-emerald-500"></span>
                Tech Stack
              </h3>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 relative z-10">
                {aboutData.skills.map((skill, index) => {
                  const techConfig = techIconMap[skill.id];
                  if (!techConfig) return null;
                  const Icon = techConfig.icon;

                  return (
                    <motion.a
                      key={skill.id}
                      href={techConfig.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group cursor-pointer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <div className="aspect-square w-full rounded-xl bg-neutral-950/80 border border-white/10 flex flex-col items-center justify-center gap-2 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-all duration-300 shadow-lg relative overflow-hidden">
                        <Icon className="w-6 h-6 text-neutral-400 group-hover:text-emerald-400 transition-colors duration-300" />
                        <span className="text-[9px] font-mono uppercase text-neutral-600 group-hover:text-emerald-300 transition-colors text-center w-full truncate px-1">
                          {skill.name}
                        </span>
                        {/* Corner accents */}
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-transparent group-hover:border-emerald-500/50 rounded-tr-sm transition-colors duration-300" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-transparent group-hover:border-emerald-500/50 rounded-bl-sm transition-colors duration-300" />
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* EXPERIENCE & CTA */}
        <div className="max-w-4xl mx-auto space-y-24">
          {/* Experience Section */}
          <div>
            <SectionHeader
              badge="Career Path"
              title="Professional Experience"
              subtitle="A timeline of my professional journey and contributions."
            />
            <div className="mt-12">
              <ExperienceTimeline experiences={aboutData.experience} />
            </div>
          </div>

          {/* Download Resume CTA */}
          <div className="flex justify-center pb-12">
            <motion.button
              onClick={openResume}
              className="group relative px-10 py-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-sm tracking-widest uppercase overflow-hidden cursor-pointer hover:bg-emerald-500 hover:text-neutral-950 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2 font-bold">
                View Resume.pdf
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </motion.svg>
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
