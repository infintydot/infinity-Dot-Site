"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { useMemo, useRef } from "react";


class LemniscateCurve extends THREE.Curve<THREE.Vector3> {
  constructor() {
    super();
  }

  override getPoint(t: number, optionalTarget = new THREE.Vector3()) {
    const scale = 3;
    const t2 = t * 2 * Math.PI;
    const denominator = 1 + Math.sin(t2) ** 2;

    const x = (scale * Math.cos(t2)) / denominator;
    const y = (scale * Math.sin(t2) * Math.cos(t2)) / denominator;
    const z = Math.sin(t2 * 2) * 0.5;

    return optionalTarget.set(x, y, z);
  }
}

function InfinityMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => new LemniscateCurve(), []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <tubeGeometry args={[curve, 128, 0.15, 16, true]} />
        <meshPhysicalMaterial
          color="#0047FF"
          emissive="#7B00FF"
          emissiveIntensity={2}
          roughness={0.1}
          metalness={0.9}
          transmission={0.9}
          thickness={0.5}
          wireframe={true}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={["#050816"]} />
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        {/* GPU Particles / Stars */}
        <Stars radius={10} depth={50} count={3000} factor={4} saturation={1} fade speed={1} />
        
        <InfinityMesh />

        <EffectComposer enableNormalPass={false}>
            <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
            </EffectComposer>
      </Canvas>
    </div>
  );
}