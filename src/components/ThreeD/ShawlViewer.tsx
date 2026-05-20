import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface ShawlMeshProps {
  color: string;
}

const ShawlMesh: React.FC<ShawlMeshProps> = ({ color }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const geomRef = useRef<THREE.BufferGeometry>(null);

  // Programmatically deform the plane geometry to create wool folds
  useEffect(() => {
    if (!geomRef.current) return;
    
    const geom = geomRef.current;
    const position = geom.attributes.position;
    
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      
      // Compute fabric wave offsets (folded draping folds)
      const zOffset = 
        Math.sin(y * 1.5) * 0.45 + 
        Math.cos(x * 2.2) * 0.2 + 
        Math.sin(x * y * 0.8) * 0.15;
        
      position.setZ(i, zOffset);
    }
    
    geom.computeVertexNormals();
    position.needsUpdate = true;
  }, []);

  // Animate the shawl with a floating rotation
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * 0.25;
    meshRef.current.position.y = Math.sin(time * 0.6) * 0.1;
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow rotation={[-0.1, 0, 0]}>
      {/* 40x40 grid plane */}
      <planeGeometry ref={geomRef} args={[3.2, 4.5, 40, 40]} />
      {/* Premium fabric material (high roughness, low metalness to represent wool) */}
      <meshStandardMaterial
        color={color}
        roughness={0.92}
        metalness={0.05}
        side={THREE.DoubleSide}
        bumpScale={0.02}
        shadowSide={THREE.DoubleSide}
      />
    </mesh>
  );
};

interface ShawlViewerProps {
  activeColor: string;
}

export const ShawlViewer: React.FC<ShawlViewerProps> = ({ activeColor }) => {
  return (
    <div className="w-full h-[400px] lg:h-[550px] relative bg-gradient-to-b from-kashmir-night/0 via-saffron-gold/5 to-kashmir-night/0 rounded overflow-hidden border border-saffron-gold/10">
      {/* Drag instructions */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 font-mono text-[9px] tracking-widest text-saffron-gold/60 uppercase pointer-events-none">
        Drag to rotate • Scroll to zoom
      </div>

      <Canvas
        shadows
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        {/* Soft studio lights to accentuate fabric shadows */}
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-5, 5, -5]} intensity={0.4} />
        <pointLight position={[0, -2, 3]} intensity={0.5} color="#C8860A" />

        <React.Suspense fallback={null}>
          <ShawlMesh color={activeColor} />
        </React.Suspense>

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
          minDistance={3.5}
          maxDistance={8}
        />
      </Canvas>
    </div>
  );
};
