import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const FloatingTorus = ({ position, scale }: { position: [number, number, number]; scale: number }) => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.15;
    ref.current.rotation.y += delta * 0.1;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        <meshBasicMaterial color="#ffffff" wireframe opacity={0.08} transparent />
      </mesh>
    </Float>
  );
};

const FloatingIcosahedron = ({ position, scale }: { position: [number, number, number]; scale: number }) => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    ref.current.rotation.x -= delta * 0.1;
    ref.current.rotation.z += delta * 0.12;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#ffffff" wireframe opacity={0.06} transparent />
      </mesh>
    </Float>
  );
};

const FloatingOctahedron = ({ position, scale }: { position: [number, number, number]; scale: number }) => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.18;
    ref.current.rotation.z -= delta * 0.08;
  });
  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.6}>
      <mesh ref={ref} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#ffffff" wireframe opacity={0.07} transparent />
      </mesh>
    </Float>
  );
};

const ParticleField = () => {
  const count = 120;
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.02;
    ref.current.rotation.x += delta * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.03} transparent opacity={0.3} sizeAttenuation />
    </points>
  );
};

const Scene = () => (
  <>
    <FloatingTorus position={[-4, 2, -3]} scale={0.8} />
    <FloatingTorus position={[5, -1.5, -4]} scale={0.5} />
    <FloatingIcosahedron position={[3.5, 2.5, -2]} scale={0.7} />
    <FloatingIcosahedron position={[-3, -2, -5]} scale={0.6} />
    <FloatingOctahedron position={[-1.5, -2.5, -3]} scale={0.55} />
    <FloatingOctahedron position={[4.5, 0.5, -6]} scale={0.45} />
    <ParticleField />
  </>
);

const ThreeHeroBackground = () => (
  <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      style={{ background: "transparent" }}
    >
      <Scene />
    </Canvas>
  </div>
);

export default ThreeHeroBackground;
