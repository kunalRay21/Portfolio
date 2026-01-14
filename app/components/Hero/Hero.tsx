"use client";

import CosmicBackground from "../CosmicBackground";
import Sidebar from "./Sidebar";
export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <CosmicBackground />

      {/* Text Plane */}
      <div className="relative z-10 flex min-h-screen items-center pl-[8vw]">
        <div className="max-w-xl space-y-6">
          <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-semibold tracking-[0.2em] text-white">
            FRONTEND SYSTEMS
          </h1>

          <p className="text-sm tracking-[0.3em] text-white/60">
            BUILT WITH INTENT
          </p>

          <span className="block pt-4 text-lg text-white/70">— Kunal</span>
        </div>
      </div>

    </section>
  );
}
