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
        className=""
        particleCount={20000}
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
      {children}
    </div>
  );
}
