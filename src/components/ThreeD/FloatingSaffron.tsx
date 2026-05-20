import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingSaffronProps {
  count?: number;
}

export const FloatingSaffron: React.FC<FloatingSaffronProps> = ({ count = 65 }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Generate initial random data for particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 20, // X span
        y: Math.random() * 15 - 5,     // Y span
        z: (Math.random() - 0.5) * 10 - 2, // Z depth
        speedY: 0.015 + Math.random() * 0.02,
        speedX: (Math.random() - 0.5) * 0.01,
        rotSpeedX: Math.random() * 0.02,
        rotSpeedY: Math.random() * 0.02,
        rotSpeedZ: Math.random() * 0.02,
        scale: 0.05 + Math.random() * 0.08,
        swayAmplitude: 0.1 + Math.random() * 0.3,
        swaySpeed: 0.5 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    particles.forEach((p, i) => {
      // Drift downwards
      p.y -= p.speedY;
      
      // Sway left and right using sine wave
      const currentX = p.x + Math.sin(time * p.swaySpeed + p.phase) * p.swayAmplitude;
      
      // If a particle falls off screen, reset to top
      if (p.y < -8) {
        p.y = 8;
        p.x = (Math.random() - 0.5) * 20;
      }

      // Position, Rotation, Scale
      dummy.position.set(currentX, p.y, p.z);
      
      // Rotate slowly over time
      dummy.rotation.set(
        time * p.rotSpeedX + p.phase,
        time * p.rotSpeedY,
        time * p.rotSpeedZ + p.phase
      );
      
      dummy.scale.set(p.scale, p.scale * 4, p.scale); // Make them look like long thin saffron threads
      dummy.updateMatrix();
      
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {/* Saffron thread geometry (a tiny cylinder) */}
      <cylinderGeometry args={[0.1, 0.06, 1, 6]} />
      {/* Organic dark red/saffron color */}
      <meshStandardMaterial 
        color="#8B1500" 
        emissive="#C8860A"
        emissiveIntensity={0.2}
        roughness={0.7} 
        metalness={0.1}
      />
    </instancedMesh>
  );
};
