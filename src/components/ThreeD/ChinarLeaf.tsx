import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const ChinarLeaf: React.FC = () => {
  const leafRef = useRef<THREE.Mesh>(null);

  // Define the multi-lobed shape of a Kashmiri Chinar leaf
  const leafShape = useMemo(() => {
    const shape = new THREE.Shape();
    
    // Start at stem base
    shape.moveTo(0, -1.5);
    
    // Stem width
    shape.lineTo(0.05, -1.5);
    shape.lineTo(0.05, -0.5);
    
    // Right side lobes
    shape.lineTo(0.6, -0.6);
    shape.lineTo(0.5, -0.1);
    shape.lineTo(1.2, -0.3); // Lower right lobe
    shape.lineTo(0.8, 0.3);
    shape.lineTo(1.7, 0.5); // Middle right lobe
    shape.lineTo(1.0, 1.0);
    shape.lineTo(1.4, 1.7); // Upper right lobe
    shape.lineTo(0.6, 1.5);
    
    // Top central lobe
    shape.lineTo(0, 2.5);   // Central peak
    
    // Left side lobes (mirrored)
    shape.lineTo(-0.6, 1.5);
    shape.lineTo(-1.4, 1.7); // Upper left lobe
    shape.lineTo(-1.0, 1.0);
    shape.lineTo(-1.7, 0.5); // Middle left lobe
    shape.lineTo(-0.8, 0.3);
    shape.lineTo(-1.2, -0.3); // Lower left lobe
    shape.lineTo(-0.5, -0.1);
    shape.lineTo(-0.6, -0.6);
    
    // Stem left side
    shape.lineTo(-0.05, -0.5);
    shape.lineTo(-0.05, -1.5);
    shape.closePath();
    
    return shape;
  }, []);

  const extrudeSettings = useMemo(() => ({
    steps: 1,
    depth: 0.08,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.03,
    bevelOffset: 0,
    bevelSegments: 4
  }), []);

  // Capture mouse coordinates for parallax attraction
  const mouse = useRef({ x: 0, y: 0 });
  
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) - 0.5;
      mouse.current.y = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!leafRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Gentle floating translation (bobbing)
    const targetY = Math.sin(time * 0.8) * 0.4;
    const targetX = Math.cos(time * 0.5) * 0.3;
    
    // Add mouse parallax influence
    const parallaxX = mouse.current.x * 1.5;
    const parallaxY = -mouse.current.y * 1.5;

    // Smooth interpolation towards targets
    leafRef.current.position.y = THREE.MathUtils.lerp(leafRef.current.position.y, targetY + parallaxY, 0.05);
    leafRef.current.position.x = THREE.MathUtils.lerp(leafRef.current.position.x, targetX + parallaxX, 0.05);
    
    // Continuous majestic floating rotations
    leafRef.current.rotation.y = time * 0.3 + Math.sin(time * 0.5) * 0.2;
    leafRef.current.rotation.x = Math.sin(time * 0.4) * 0.25;
    leafRef.current.rotation.z = Math.cos(time * 0.6) * 0.15;
  });

  return (
    <mesh ref={leafRef} castShadow receiveShadow scale={1.2}>
      <extrudeGeometry args={[leafShape, extrudeSettings]} />
      {/* Luxury gold satin material properties */}
      <meshStandardMaterial
        color="#C8860A"
        roughness={0.15}
        metalness={0.95}
        envMapIntensity={1.5}
        bumpScale={0.05}
      />
    </mesh>
  );
};
