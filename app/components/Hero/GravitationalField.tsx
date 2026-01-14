"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;

  void main() {
    vec2 uv = vUv - 0.5;

    float angle = uTime * 0.03;
    mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    uv = rot * uv;

    float dist = length(uv);

    float core = smoothstep(0.18, 0.0, dist);
    float ring = smoothstep(0.55, 0.25, dist);
    float voidFall = smoothstep(0.85, 0.55, dist);

    vec3 whiteCore = vec3(1.0);
    vec3 greenEnergy = vec3(1.0);
    vec3 voidColor = vec3(0.02, 0.03, 0.03);

    vec3 color = mix(voidColor, greenEnergy, ring);
    color = mix(color, whiteCore, core);
    color = mix(color, voidColor, voidFall);

    float alpha = smoothstep(0.95, 0.2, dist);

    gl_FragColor = vec4(color, alpha);
  }
`;

export default function GravitationalField() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useFrame((_, delta) => {
    if (!materialRef.current || reduceMotion) return;
    materialRef.current.uniforms.uTime.value += delta;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        uniforms={{
          uTime: { value: 0 },
        }}
      />
    </mesh>
  );
}
