import React from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

interface CarpetMeshProps {
  progress: number; // 0 (fully rolled) to 1 (fully unrolled)
}

const CarpetMesh: React.FC<CarpetMeshProps> = ({ progress }) => {
  const carpetLength = 5;
  const carpetWidth = 2.5;
  
  // Safe default loading state or fallback color
  // We can load a beautiful high-res Kashmiri rug pattern
  const textureUrl = 'https://images.unsplash.com/photo-1576016770956-debb63d90029?q=80&w=600';
  const texture = useLoader(THREE.TextureLoader, textureUrl);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  // Calculate parameters based on progress
  const unrolledLength = progress * carpetLength;
  const rollRadius = 0.3 * Math.sqrt(1 - progress) + 0.04; // shrinks as it unrolls
  const rollPositionZ = -carpetLength / 2 + unrolledLength; // rolls along Z axis

  return (
    <group rotation={[0.2, -0.4, 0]}>
      {/* 1. Unrolled Flat Plane */}
      {progress > 0 && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -carpetLength / 2 + unrolledLength / 2]} receiveShadow>
          <planeGeometry args={[carpetWidth, unrolledLength]} />
          <meshStandardMaterial 
            map={texture} 
            roughness={0.9} 
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* 2. Rolled Up Cylinder */}
      {progress < 0.98 && (
        <mesh position={[0, rollRadius, rollPositionZ]} rotation={[0, 0, Math.PI / 2]} castShadow>
          {/* Cylinder args: radiusTop, radiusBottom, height, radialSegments */}
          <cylinderGeometry args={[rollRadius, rollRadius, carpetWidth, 32]} />
          {/* We spin the cylinder as it rolls. To rotate along its own axis (which is now Y after cylinder geometry creation): */}
          <meshStandardMaterial 
            map={texture} 
            roughness={0.9}
          />
        </mesh>
      )}

      {/* Shadow Floor Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.3} />
      </mesh>
    </group>
  );
};

interface CarpetUnrollerProps {
  scrollProgress: number; // 0 to 1 from ScrollTrigger
}

export const CarpetUnroller: React.FC<CarpetUnrollerProps> = ({ scrollProgress }) => {
  return (
    <div className="w-full h-[400px] md:h-[500px] relative rounded overflow-hidden bg-gradient-to-b from-kashmir-night/0 via-saffron-gold/5 to-kashmir-night/0 border border-saffron-gold/10">
      <Canvas
        shadows
        camera={{ position: [0, 2.5, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight 
          position={[3, 5, 2]} 
          intensity={1.2} 
          castShadow 
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[-3, 3, -2]} intensity={0.3} />

        <React.Suspense fallback={
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#C8860A" wireframe />
          </mesh>
        }>
          <CarpetMesh progress={scrollProgress} />
        </React.Suspense>
      </Canvas>
    </div>
  );
};
