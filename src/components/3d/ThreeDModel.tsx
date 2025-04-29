
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, PresentationControls, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  path: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

function Model({ path, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }: ModelProps) {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.005;
    }
  });

  const { scene } = useGLTF(path);

  return (
    <mesh ref={mesh} position={position} rotation={rotation} scale={[scale, scale, scale]}>
      <primitive object={scene} />
    </mesh>
  );
}

interface BuildingProps {
  position?: [number, number, number];
  color?: string;
  height?: number;
}

function Building({ position = [0, 0, 0], color = '#C84B31', height = 1 }: BuildingProps) {
  const mesh = useRef<THREE.Mesh>(null);
  
  return (
    <mesh position={position}>
      <boxGeometry args={[0.5, height, 0.5]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function CityScene() {
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
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
    </>
  );
}

interface ThreeDModelProps {
  type?: 'city' | 'globe';
  className?: string;
}

export function ThreeDModel({ type = 'city', className = '' }: ThreeDModelProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 5, 10], fov: 35 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        
        <PresentationControls
          global
          zoom={0.8}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <Float rotationIntensity={0.5} speed={2}>
            {type === 'city' ? (
              <CityScene />
            ) : (
              <mesh>
                <sphereGeometry args={[2, 32, 32]} />
                <meshStandardMaterial color="#FFBD59" metalness={0.5} roughness={0.2} />
              </mesh>
            )}
          </Float>
        </PresentationControls>
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

export default ThreeDModel;
