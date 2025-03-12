
import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const IcosahedronMesh = ({ color, wireframe }: { color: string, wireframe: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 0]} />
      <meshStandardMaterial color={color} wireframe={wireframe} />
    </mesh>
  );
};

const IcosahedronScene = () => {
  return (
    <Canvas className="w-full h-full">
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <OrbitControls enableZoom={true} enablePan={true} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <IcosahedronMesh color="#044bab" wireframe={true} />
    </Canvas>
  );
};

const Icosahedron = () => {
  const [rotationSpeed, setRotationSpeed] = useState(1);
  
  return (
    <main className="flex-grow container mx-auto px-4 py-8 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-[#ea384c] dark:text-red-400 font-['Verdana'] text-center">
        Icosahedron Explorer
      </h1>
      
      <div className="mb-8 text-center font-['Verdana'] text-black dark:text-white">
        <p className="mb-4">An icosahedron is a regular polyhedron with 20 triangular faces, 30 edges, and 12 vertices.</p>
        <p>Drag to rotate. Scroll to zoom in and out.</p>
      </div>
      
      <div className="w-full h-[500px] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-black dark:border-gray-700">
        <IcosahedronScene />
      </div>
      
      <div className="mt-8 text-center">
        <div className="inline-flex items-center p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-black dark:border-gray-700">
          <label htmlFor="rotation-speed" className="mr-4 font-['Verdana'] text-black dark:text-white">
            Rotation Speed:
          </label>
          <input
            id="rotation-speed"
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={rotationSpeed}
            onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
            className="w-40"
          />
        </div>
      </div>
    </main>
  );
};

export default Icosahedron;
