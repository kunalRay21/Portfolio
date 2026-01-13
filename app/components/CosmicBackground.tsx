"use client";

import { Canvas } from "@react-three/fiber";
import CosmicDust from "./Hero/CosmicDust";

function ScatteredLights() {
  return (
    <>
      {/* Stronger point lights */}
      <pointLight
        position={[3, 2, 2]}
        intensity={2}
        color="#2dcc71"
        distance={20}
      />
      <pointLight
        position={[-3, -2, 1]}
        intensity={1.5}
        color="#27ae60"
        distance={18}
      />
      <pointLight
        position={[2, -3, 1.5]}
        intensity={1.8}
        color="#16a085"
        distance={19}
      />
      <pointLight
        position={[-2, 3, 1]}
        intensity={1.2}
        color="#1abc9c"
        distance={17}
      />
      <pointLight
        position={[1, 1, 2]}
        intensity={1.6}
        color="#2ecc71"
        distance={18}
      />

      {/* Ambient light to illuminate the particles better */}
      <ambientLight intensity={0.5} color="#1abc9c" />
    </>
  );
}

export default function CosmicBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Background Cosmic Dust Layer - Full Screen */}
      <div className="absolute inset-0 opacity-40">
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 1] }}
        >
          <ScatteredLights />
          <CosmicDust />
        </Canvas>
      </div>

      {/* Left Side Cosmic Dust */}
      <div className="absolute inset-0 left-0 w-1/2 opacity-30">
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 1] }}
        >
          <ScatteredLights />
          <CosmicDust />
        </Canvas>
      </div>

      {/* Right Side Cosmic Dust with Offset */}
      <div className="absolute inset-0 right-0 w-1/2 opacity-25">
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 1.5] }}
        >
          <ScatteredLights />
          <CosmicDust />
        </Canvas>
      </div>

      {/* Top Corner Dust Accent */}
      <div className="absolute top-0 right-0 md:w-96 md:h-96 w-48 h-48 opacity-20">
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 1] }}
        >
          <ScatteredLights />
          <CosmicDust />
        </Canvas>
      </div>

      {/* Bottom Left Dust Accent */}
      <div className="absolute bottom-0 left-0 md:w-80 md:h-80 w-40 h-40 opacity-15">
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 1] }}
        >
          <ScatteredLights />
          <CosmicDust />
        </Canvas>
      </div>
    </div>
  );
}
