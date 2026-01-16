"use client";

import Particles from "../../components/Particles";

interface BackgroundProps {
  children?: React.ReactNode;
  variant?: "default" | "dark" | "light";
}

export default function Background({
  children,
  variant = "default",
}: BackgroundProps) {
  const bgColors = {
    default: "bg-[#376153]",
    dark: "bg-[#1a1a1a]",
    light: "bg-[#2a4a3a]",
  };

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 w-screen h-screen ${bgColors[variant]}`}
    >
      <Particles
        particleCount={2000}
        particleSpread={22}
        speed={0.04}
        particleColors={["#ffffff"]}
        moveParticlesOnHover={false}
        particleHoverFactor={1}
        alphaParticles={true}
        particleBaseSize={100}
        sizeRandomness={5}
        cameraDistance={100}
        disableRotation={false}
        className=""
      />
      {children}
    </div>
  );
}
