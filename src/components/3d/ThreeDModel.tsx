
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

// Simplified model component with basic geometry
function Model({ scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const mesh = useRef();
  
  return (
    <mesh 
      ref={mesh} 
      position={position as [number, number, number]} 
      rotation={rotation as [number, number, number]} 
      scale={[scale, scale, scale]}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#FFBD59" metalness={0.5} roughness={0.2} />
    </mesh>
  );
}

// Simplified building component
function Building({ position = [0, 0, 0], color = '#C84B31', height = 1 }) {
  return (
    <mesh position={position as [number, number, number]}>
      <boxGeometry args={[0.5, height, 0.5]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

// Simplified city scene
function CityScene() {
  // Generate 20 buildings with random positions and heights
  const buildings = Array.from({ length: 20 }, (_, i) => ({
    position: [
      Math.random() * 10 - 5,
      Math.random() * 0.5,
      Math.random() * 10 - 5,
    ] as [number, number, number],
    height: Math.random() * 2 + 0.5,
    color: i % 3 === 0 ? '#C84B31' : i % 3 === 1 ? '#1A1F2C' : '#FFBD59',
  }));

  return (
    <>
      {buildings.map((building, index) => (
        <Building key={index} {...building} />
      ))}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0] as [number, number, number]}>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
    </>
  );
}

// Main 3D model component with TypeScript props
interface ThreeDModelProps {
  type?: 'city' | 'globe';
  className?: string;
}

export function ThreeDModel({ type = 'city', className = '' }: ThreeDModelProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 5, 10], fov: 35 }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        
        {/* Scene content */}
        {type === 'city' ? (
          <CityScene />
        ) : (
          <Model scale={2} />
        )}
        
        {/* Simple placeholder for controls */}
        <SimpleControls />
      </Canvas>
    </div>
  );
}

// Simple placeholder for controls instead of OrbitControls
function SimpleControls() {
  // Just a placeholder, doesn't do anything but doesn't cause errors
  return null;
}

export default ThreeDModel;
