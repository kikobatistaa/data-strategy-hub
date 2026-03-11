import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Mesh, Points, BufferGeometry, LineSegments as ThreeLineSegments, Vector2 } from "three";

// ─── Mouse tracker (writes to a shared ref, no re-renders) ───
const mouseRef = { current: new Vector2(0, 0) };

const MouseTracker = () => {
  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    canvas.addEventListener("pointermove", onMove, { passive: true });
    return () => canvas.removeEventListener("pointermove", onMove);
  }, [gl]);

  return null;
};

// ─── Floating Shape (sine-wave float + mouse parallax in useFrame) ───
interface ShapeProps {
  position: [number, number, number];
  scale: number;
  color: string;
  geometry: "torus" | "icosahedron" | "octahedron" | "torusKnot" | "dodecahedron";
  rotSpeed?: [number, number];
  floatSpeed?: number;
  floatAmp?: number;
}

const FloatingShape = ({
  position,
  scale,
  color,
  geometry,
  rotSpeed = [0.12, 0.08],
  floatSpeed = 1,
  floatAmp = 0.4,
}: ShapeProps) => {
  const ref = useRef<Mesh>(null!);
  const baseY = position[1];
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state, delta) => {
    const mesh = ref.current;
    // Rotation
    mesh.rotation.x += delta * rotSpeed[0];
    mesh.rotation.y += delta * rotSpeed[1];
    // Sine-wave floating
    mesh.position.y = baseY + Math.sin(state.clock.elapsedTime * floatSpeed + phase) * floatAmp;
    // Mouse parallax (subtle)
    mesh.position.x += (position[0] + mouseRef.current.x * 0.5 - mesh.position.x) * 0.02;
  });

  const geo = useMemo(() => {
    switch (geometry) {
      case "torus": return <torusGeometry args={[1, 0.3, 16, 32]} />;
      case "icosahedron": return <icosahedronGeometry args={[1, 1]} />;
      case "octahedron": return <octahedronGeometry args={[1, 0]} />;
      case "torusKnot": return <torusKnotGeometry args={[0.8, 0.25, 64, 16]} />;
      case "dodecahedron": return <dodecahedronGeometry args={[1, 0]} />;
    }
  }, [geometry]);

  return (
    <mesh ref={ref} position={position} scale={scale}>
      {geo}
      <meshBasicMaterial color={color} wireframe transparent opacity={0.12} />
    </mesh>
  );
};

// ─── Particle Field with size variation ───
const ParticleField = ({ count }: { count: number }) => {
  const ref = useRef<Points>(null!);

  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      sz[i] = 0.02 + Math.random() * 0.04;
    }
    return { positions: pos, sizes: sz };
  }, [count]);

  useFrame((state, delta) => {
    const pts = ref.current;
    pts.rotation.y += delta * 0.015;
    pts.rotation.x += delta * 0.008;
    // Mouse parallax
    pts.position.x += (mouseRef.current.x * 0.3 - pts.position.x) * 0.01;
    pts.position.y += (mouseRef.current.y * 0.3 - pts.position.y) * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#a5b4fc" size={0.035} transparent opacity={0.4} sizeAttenuation />
    </points>
  );
};

// ─── Constellation Lines (connecting nearby particles) ───
const ConstellationLines = ({ positions, count, threshold }: { positions: Float32Array; count: number; threshold: number }) => {
  const ref = useRef<ThreeLineSegments>(null!);

  const linePositions = useMemo(() => {
    const lines: number[] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < threshold) {
          lines.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }
    return new Float32Array(lines);
  }, [positions, count, threshold]);

  useFrame((state, delta) => {
    const ls = ref.current;
    ls.rotation.y += delta * 0.015;
    ls.rotation.x += delta * 0.008;
    ls.position.x += (mouseRef.current.x * 0.3 - ls.position.x) * 0.01;
    ls.position.y += (mouseRef.current.y * 0.3 - ls.position.y) * 0.01;
  });

  if (linePositions.length === 0) return null;

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={linePositions.length / 3}
          array={linePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#6366f1" transparent opacity={0.06} />
    </lineSegments>
  );
};

// ─── Scene ───
const Scene = ({ isMobile }: { isMobile: boolean }) => {
  const particleCount = isMobile ? 100 : 200;

  const particlePositions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, [particleCount]);

  return (
    <>
      <fog attach="fog" args={["#0a0a0a", 6, 20]} />
      <MouseTracker />

      {/* Shapes with color accents */}
      <FloatingShape position={[-4, 2, -3]} scale={0.8} color="#6366f1" geometry="torus" rotSpeed={[0.15, 0.1]} floatSpeed={1.2} />
      <FloatingShape position={[5, -1.5, -4]} scale={0.5} color="#8b5cf6" geometry="torusKnot" rotSpeed={[0.1, 0.14]} floatSpeed={0.9} />
      <FloatingShape position={[3.5, 2.5, -2]} scale={0.7} color="#06b6d4" geometry="icosahedron" rotSpeed={[-0.1, 0.12]} floatSpeed={1.1} />
      <FloatingShape position={[-3, -2, -5]} scale={0.6} color="#8b5cf6" geometry="dodecahedron" rotSpeed={[0.08, -0.1]} floatSpeed={0.8} />
      <FloatingShape position={[-1.5, -2.5, -3]} scale={0.55} color="#06b6d4" geometry="octahedron" rotSpeed={[0.18, -0.08]} floatSpeed={1.3} />
      <FloatingShape position={[4.5, 0.5, -6]} scale={0.45} color="#6366f1" geometry="icosahedron" rotSpeed={[-0.12, 0.15]} floatSpeed={1} />

      {/* Particles + Constellation lines */}
      <ParticleField count={particleCount} />
      <ConstellationLines positions={particlePositions} count={particleCount} threshold={3} />
    </>
  );
};

// ─── Main Component ───
const ThreeHeroBackground = ({ isVisible = true }: { isVisible?: boolean }) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className="absolute inset-0" style={{ zIndex: 1, pointerEvents: "auto" }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ alpha: true, antialias: !isMobile, powerPreference: "high-performance" }}
        dpr={isMobile ? 1 : [1, 1.5]}
        frameloop={isVisible ? "always" : "never"}
        style={{ background: "transparent" }}
      >
        <Scene isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default ThreeHeroBackground;
