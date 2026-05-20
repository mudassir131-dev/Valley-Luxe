import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FloatingSaffron } from './FloatingSaffron';
import { ChinarLeaf } from './ChinarLeaf';

// Background Mountains Component with mouse parallax support
interface MountainLayerProps {
  color: string;
  zPos: number;
  parallaxFactor: number;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  peaks: { x: number; y: number }[];
}

const MountainLayer: React.FC<MountainLayerProps> = ({ color, zPos, parallaxFactor, mouse, peaks }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const mountainShape = React.useMemo(() => {
    const shape = new THREE.Shape();
    const width = 30;
    
    // Bottom left corner
    shape.moveTo(-width / 2, -10);
    shape.lineTo(-width / 2, peaks[0].y);
    
    // Draw peaks
    peaks.forEach((p) => {
      shape.lineTo(p.x, p.y);
    });
    
    // Bottom right corner
    shape.lineTo(width / 2, peaks[peaks.length - 1].y);
    shape.lineTo(width / 2, -10);
    shape.closePath();
    
    return shape;
  }, [peaks]);

  useFrame(() => {
    if (!meshRef.current) return;
    // Shift horizontally and vertically based on mouse coordinates & layer depth (parallax)
    const targetX = mouse.current.x * parallaxFactor * 2;
    const targetY = -mouse.current.y * parallaxFactor * 1;
    
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
  });

  return (
    <mesh ref={meshRef} position={[0, -2, zPos]}>
      <shapeGeometry args={[mountainShape]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.9} 
        metalness={0.1}
      />
    </mesh>
  );
};

// Scene camera controller to rotate/pan camera subtly based on mouse
const SceneController: React.FC<{ mouse: React.MutableRefObject<{ x: number; y: number }> }> = ({ mouse }) => {
  useFrame((state) => {
    const { camera } = state;
    // Calculate target lookAt position
    const targetX = mouse.current.x * 0.8;
    const targetY = -mouse.current.y * 0.5 + 0.5;
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY + 1.2, 0.05);
    camera.lookAt(0, 0.2, 0);
  });

  return null;
};

export const ValleyHeroScene: React.FC = () => {
  const mouse = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) - 0.5;
      mouse.current.y = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Peak structures for our mountain layers
  const farPeaks = [
    { x: -15, y: 2.5 }, { x: -10, y: 4.5 }, { x: -6, y: 3.0 },
    { x: -2, y: 5.2 }, { x: 3, y: 3.5 }, { x: 8, y: 4.8 }, { x: 15, y: 2.2 }
  ];

  const midPeaks = [
    { x: -15, y: 1.0 }, { x: -9, y: 2.8 }, { x: -4, y: 1.8 },
    { x: 1, y: 3.2 }, { x: 6, y: 1.5 }, { x: 11, y: 2.4 }, { x: 15, y: 0.8 }
  ];

  const nearPeaks = [
    { x: -15, y: -0.5 }, { x: -8, y: 1.2 }, { x: -3, y: 0.2 },
    { x: 2, y: 1.5 }, { x: 7, y: 0.1 }, { x: 12, y: 0.8 }, { x: 15, y: -0.3 }
  ];

  return (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#0D0500] via-[#1A0A00] to-[#0D0500] z-0 overflow-hidden">
      
      {/* Sun glow aura in the center background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-to-tr from-saffron-gold/10 via-deep-gold/5 to-transparent rounded-full blur-[80px] pointer-events-none" />

      <Canvas
        camera={{ position: [0, 1.2, 5.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Fog to blend the mountains together in luxury haze */}
        <fog attach="fog" args={["#0D0500", 3, 11]} />

        {/* Ambient lighting */}
        <ambientLight intensity={0.5} />
        
        {/* Soft golden spotlight */}
        <spotLight 
          position={[0, 8, 4]} 
          angle={0.4} 
          penumbra={1} 
          intensity={1.8} 
          color="#FDFAF4" 
        />
        
        {/* Saffron gold point light */}
        <pointLight position={[0, -1, 2]} intensity={1.5} color="#C8860A" />

        {/* 1. Background Mountain Layers */}
        <MountainLayer 
          color="#3A1C0E" // Far Layer - Warm Silhouette
          zPos={-7} 
          parallaxFactor={0.15} 
          mouse={mouse} 
          peaks={farPeaks} 
        />
        <MountainLayer 
          color="#1E281F" // Mid Layer - Forest Green Silhouette
          zPos={-4.5} 
          parallaxFactor={0.3} 
          mouse={mouse} 
          peaks={midPeaks} 
        />
        <MountainLayer 
          color="#130800" // Close Layer - Dark Earth Silhouette
          zPos={-2} 
          parallaxFactor={0.5} 
          mouse={mouse} 
          peaks={nearPeaks} 
        />

        {/* 2. Floating Saffron Particles */}
        <FloatingSaffron count={70} />

        {/* 3. Focal Central 3D Leaf */}
        <group position={[0, 0.4, 1.5]}>
          <ChinarLeaf />
        </group>

        {/* Camera visual adjustment based on mouse coordinates */}
        <SceneController mouse={mouse} />
      </Canvas>
    </div>
  );
};
