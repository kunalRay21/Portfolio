// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Hero from "./components/Hero/Hero";
import ProjectsSection from "./components/ProjectsSection";
import ScrollIndicator from "./components/ScrollIndicator";
import Loader from "./components/Loader";
import ClipTransition from "./components/Transitions/ClipTransition";

export default function Home() {
  const [showHero, setShowHero] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    // Render Hero (but invisible) when ClipTransition starts
    const start = setTimeout(() => {
      setShowHero(true);
    }, 1500);

    // Make Hero visible when curtain animation completes
    const reveal = setTimeout(() => {
      setHeroVisible(true);
    }, 1500);

    return () => {
      clearTimeout(start);
      clearTimeout(reveal);
    };
  }, []);

  return (
    <main>
      <Loader />
      <ClipTransition />
      <ScrollIndicator isVisible={heroVisible} />
      {showHero && (
        <div
          style={{
            opacity: heroVisible ? 1 : 0,
            transition: "opacity 0.3s ease-out",
          }}
        >
          <Hero />
          <ProjectsSection />
        </div>
      )}
    </main>
  );
}
