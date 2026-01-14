"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function CosmicDust() {
  const pointsRef = useRef<THREE.Points>(null);

  const count = 600;

  // Initial particle positions
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const r = Math.random() * 2.5 + 0.5; // radius
      const theta = Math.random() * Math.PI * 2;

      arr[i * 3] = Math.cos(theta) * r;
      arr[i * 3 + 1] = Math.sin(theta) * r;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 1.8; // depth
    }

    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const pos = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < count; i++) {
      const x = pos[i * 3];
      const y = pos[i * 3 + 1];

      const angle = Math.atan2(y, x);
      const radius = Math.sqrt(x * x + y * y);

      const speed = 0.02 / (radius + 0.4); // farther = slower
      const newAngle = angle + speed * delta;

      pos[i * 3] = Math.cos(newAngle) * radius;
      pos[i * 3 + 1] = Math.sin(newAngle) * radius;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>

      <pointsMaterial
        size={0.015}
        color="#ffffff"
        transparent
        opacity={0.18}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
