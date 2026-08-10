import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function HeartMesh() {
  const ref = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.35);
    shape.bezierCurveTo(0, 0.55, -0.2, 0.75, -0.45, 0.75);
    shape.bezierCurveTo(-0.85, 0.75, -0.85, 0.25, -0.85, 0.25);
    shape.bezierCurveTo(-0.85, -0.1, -0.5, -0.5, 0, -0.85);
    shape.bezierCurveTo(0.5, -0.5, 0.85, -0.1, 0.85, 0.25);
    shape.bezierCurveTo(0.85, 0.25, 0.85, 0.75, 0.45, 0.75);
    shape.bezierCurveTo(0.2, 0.75, 0, 0.55, 0, 0.35);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.35,
      bevelEnabled: true,
      bevelSize: 0.08,
      bevelThickness: 0.08,
      bevelSegments: 8,
      curveSegments: 32,
    });
    geo.center();
    return geo;
  }, []);

  useFrame((state, delta) => {
    const m = ref.current;
    if (!m) return;
    m.rotation.y += delta * 0.6;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.6) * 0.06;
    m.scale.setScalar(pulse);
    m.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.08;
  });

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshStandardMaterial color="#E3B778" metalness={0.9} roughness={0.22} emissive="#6b4b16" emissiveIntensity={0.25} />
    </mesh>
  );
}

export function GoldHeart({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className={className} />;

  return (
    <div className={className} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 3.4], fov: 45 }} dpr={[1, 1.75]} gl={{ alpha: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={2.2} color="#fff3d6" />
        <directionalLight position={[-4, -2, 3]} intensity={1.2} color="#E3B778" />
        <pointLight position={[0, 0, 4]} intensity={6} color="#ffe9bf" />
        <HeartMesh />
      </Canvas>
    </div>
  );
}
