"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import {
  Github,
  ArrowUpRight,
  Layers,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Project } from "./types";
// @ts-ignore
import Particles from "@/components/Particles";

interface ProjectShowcaseProps {
  projects: Project[];
}

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // State to track if the initial scroll interaction is complete
  const [isLocked, setIsLocked] = useState(true);

  // Manual navigation state
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ~~~ SCROLL LOGIC ~~~
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Monitor scroll progress to trigger unlock
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isLocked && latest > 0.99 && !isMobile) {
      // User has scrolled to the end of the section
      handleUnlock();
    }
  });

  const handleUnlock = () => {
    // 1. Set state to unlocked
    setIsLocked(false);

    // 2. Set the current index to the last project (or separate "See More" slide) to maintain continuity
    setCurrentIndex(projects.length); // Points to the "See More" slide

    // 3. Fix scroll position to prevent jumping
    // The container is shrinking from 400vh to 100vh.
    // We are currently at the bottom of the 400vh.
    // We need to scroll UP by (400vh - 100vh) = 300vh so the user stays at the bottom of the now-100vh container.
    // Getting exact pixel values is safer.
    if (containerRef.current) {
      const currentHeight = containerRef.current.offsetHeight;
      const targetHeight = window.innerHeight; // The new height will be 100vh
      const scrollAdjustment = currentHeight - targetHeight;
      window.scrollBy({ top: -scrollAdjustment, behavior: "instant" });
    }
  };

  // ~~~ TRANSFORM LOGIC ~~~
  // We use functional logic to determine the 'x' value.
  // When locked, it matches scroll. When unlocked, it matches 'currentIndex'.

  // Base percentage calculation for manual slides
  // We used (projects.length * 85)% for the full scroll.
  // Let's approximate the step for each slide.
  const manualXPosition = -(currentIndex * 85);

  const scrollX = useTransform(
    smoothProgress,
    [0, 1],
    ["0%", `-${projects.length * 85}%`],
  );

  const headerOpacity = useTransform(smoothProgress, [0, 0.05], [1, 0]);
  const scrollIndicatorOpacity = useTransform(smoothProgress, [0.9, 1], [0, 1]);

  // If isLocked is false, we ignore scrollX and use the manual calculation
  // However, we can't easily conditionally swap the motion value passed to `style={{ x }}`
  // without causing a render jump if they are different types.
  // Instead, let's control the `animate` prop or simple style based on state.

  // Navigation Handlers
  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, projects.length));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  return isMobile ? (
    <MobileProjectLayout projects={projects} />
  ) : (
    <section
      ref={containerRef}
      className={`relative bg-neutral-950 transition-[height] duration-75 ease-out`}
      style={{ height: isLocked ? "400vh" : "100vh" }}
    >
      <div
        className={`${isLocked ? "sticky top-0" : "relative"} h-screen w-full overflow-hidden flex flex-col justify-center`}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.03),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none mix-blend-overlay" />

        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <Particles
            particleCount={400}
            speed={0.05}
            particleColors={["#10B981", "#34D399", "#ffffff"]}
            particleSpread={10}
            alphaParticles={true}
            className="w-full h-full"
          />
        </div>

        {/* Parallax Background Title */}
        {/* Parallax Background Title */}
        <BackgroundTitle
          isLocked={isLocked}
          progress={smoothProgress}
          currentIndex={currentIndex}
          totalProjects={projects.length}
        />

        {/* Content Container */}
        <div className="relative z-10 w-full px-12 xl:px-24 flex flex-col h-full justify-center">
          {/* Header */}
          <div className="absolute top-12 left-12 xl:left-24 z-20 pointer-events-none">
            <motion.div
              animate={{ opacity: isLocked ? 1 : 1 }} // Always show header now? Or fade out?
              style={{
                opacity: isLocked ? headerOpacity : 0,
              }} // Fade out on scroll, stay hidden manually?
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Layers size={14} />
                </span>
                <h2 className="text-sm font-mono text-emerald-400 tracking-widest uppercase">
                  Featured Projects
                </h2>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Selected Works
              </h3>
            </motion.div>
          </div>

          {/* Horizontal Scroll Track */}
          <div className="w-full pl-[5vw] mt-24">
            <motion.div
              style={{ x: isLocked ? scrollX : `${manualXPosition}%` }}
              animate={!isLocked ? { x: `${manualXPosition}%` } : {}}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex gap-16 md:gap-24 items-center pl-10"
            >
              {projects.map((project, index) => (
                <ParallaxProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}

              {/* "See More" Card - Counts as the last index */}
              <div className="shrink-0 w-[40vw] h-[60vh] flex flex-col justify-center items-center text-center text-white/50 border-l border-white/5 ml-12">
                <p className="text-3xl font-light mb-6">Explore more work</p>
                <a
                  href="https://github.com"
                  target="_blank"
                  className="flex flex-col items-center gap-4 text-emerald-400 hover:text-emerald-300 transition-colors group cursor-pointer"
                >
                  <span className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                    <Github size={32} />
                  </span>
                  <span className="text-xl font-medium tracking-wide flex items-center gap-2">
                    Visit Github Profile
                    <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Controls (Only Visible when Unlocked) */}
          <AnimatePresence>
            {!isLocked && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-12 right-12 flex items-center gap-4 z-30"
              >
                <button
                  onClick={prevSlide}
                  disabled={currentIndex === 0}
                  className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-emerald-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={nextSlide}
                  disabled={currentIndex === projects.length}
                  className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-emerald-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Bar Indicators (Only Visible when Locked) */}
          <motion.div
            animate={{ opacity: isLocked ? 1 : 0 }}
            className="absolute bottom-12 left-12 right-12 flex justify-between items-end pointer-events-none"
          >
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-emerald-500/50">01</span>
              <div className="w-32 h-[1px] bg-white/10 relative overflow-hidden">
                <motion.div
                  style={{ scaleX: smoothProgress }}
                  className="absolute inset-y-0 left-0 bg-emerald-500 origin-left"
                />
              </div>
              <span className="text-xs font-mono text-emerald-500/50">
                0{projects.length}
              </span>
            </div>
            <motion.div
              style={{
                opacity: scrollIndicatorOpacity,
              }}
              className="text-xs font-mono text-white/30 uppercase tracking-widest"
            >
              Scroll Down to Continue
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface BackgroundTitleProps {
  isLocked: boolean;
  progress: MotionValue<number>;
  currentIndex: number;
  totalProjects: number;
}

function BackgroundTitle({
  isLocked,
  progress,
  currentIndex,
  totalProjects,
}: BackgroundTitleProps) {
  const scrollX = useTransform(progress, [0, 1], ["0%", "20%"]);
  // Calculate percentage based on current index vs total slides
  // We use totalProjects (which corresponds to the last "See More" slide index)
  const manualX = `${(currentIndex / totalProjects) * 20}%`;

  return (
    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full select-none pointer-events-none overflow-hidden mix-blend-overlay opacity-[0.03]">
      <motion.div
        style={isLocked ? { x: scrollX } : {}}
        animate={!isLocked ? { x: manualX } : {}}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="whitespace-nowrap"
      >
        <span className="text-[20vw] font-black uppercase text-white leading-none tracking-tighter">
          Excellence &bull; Innovation &bull; Design
        </span>
      </motion.div>
    </div>
  );
}

function ParallaxProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <div className="group relative shrink-0 w-[60vw] max-w-[950px]">
      <div className="flex flex-col gap-6">
        {/* Number & Line */}
        {/* Number & Line */}
        <div className="flex items-center gap-4 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
          <span className="font-mono text-emerald-400 text-2xl font-bold">
            0{index + 1}
          </span>
          <div className="h-[2px] w-16 bg-emerald-500" />
          <span className="font-mono text-emerald-300 text-sm font-bold uppercase tracking-widest">
            {project.category || "Development"}
          </span>
        </div>

        {/* Card Body */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-neutral-900 border border-white/5 shadow-2xl transition-all duration-500 group-hover:shadow-[0_0_50px_-10px_rgba(16,185,129,0.15)] group-hover:border-emerald-500/20">
          {/* Image Container with Zoom effect */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Stronger gradient overlay for text readability */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-neutral-900/40 to-transparent opacity-90" />

            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-14">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              {/* Increased text contrast */}
              <h3 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight drop-shadow-xl">
                {project.title}
              </h3>
              <p className="text-neutral-200 max-w-xl text-sm md:text-lg leading-relaxed line-clamp-3 mb-8 drop-shadow-md">
                {project.description}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex gap-2">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full text-[11px] md:text-xs font-semibold bg-white/10 border border-white/10 text-white backdrop-blur-md shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="w-[1px] h-4 bg-white/30 mx-2 hidden md:block" />

                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
                    >
                      <Github size={20} />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 text-neutral-950 font-bold text-xs uppercase tracking-wide hover:bg-emerald-400 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    >
                      <span>View Project</span>
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileProjectLayout({ projects }: { projects: Project[] }) {
  return (
    <section className="py-24 px-4 bg-neutral-950">
      <div className="max-w-md mx-auto space-y-24">
        {projects.map((project, index) => (
          <div key={project.id} className="group relative">
            {/* Connecting Line */}
            {index !== projects.length - 1 && (
              <div className="absolute left-0 bottom-[-96px] top-[100%] w-[1px] bg-gradient-to-b from-emerald-500/20 to-transparent" />
            )}

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-5xl font-bold text-white/5">
                  0{index + 1}
                </span>
                <h3 className="text-2xl font-bold text-white">
                  {project.title}
                </h3>
              </div>

              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="flex gap-2">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        className="p-3 bg-emerald-500 text-black rounded-full"
                      >
                        <ArrowUpRight size={18} />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        className="p-3 bg-neutral-800 text-white rounded-full"
                      >
                        <Github size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-neutral-400 text-sm leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded bg-white/5 text-neutral-400 border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
