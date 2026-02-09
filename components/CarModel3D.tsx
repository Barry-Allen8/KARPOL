import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

const Car: React.FC<{ mouseX: number; mouseY: number }> = ({ mouseX, mouseY }) => {
  const meshRef = useRef<THREE.Group>(null);

  // Create a stylized car using basic geometries
  const carGeometry = useMemo(() => {
    const group = new THREE.Group();

    // Car body (main)
    const bodyGeometry = new THREE.BoxGeometry(4, 1.2, 2);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.9,
      roughness: 0.1,
      envMapIntensity: 1.5,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.6;
    group.add(body);

    // Car top (cabin)
    const cabinGeometry = new THREE.BoxGeometry(2.5, 1, 1.8);
    const cabinMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      metalness: 0.95,
      roughness: 0.05,
      envMapIntensity: 2,
    });
    const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
    cabin.position.set(-0.2, 1.5, 0);
    group.add(cabin);

    // Windows (blue tinted glass)
    const windowMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x3b82f6,
      metalness: 0.1,
      roughness: 0,
      transparent: true,
      opacity: 0.4,
      envMapIntensity: 3,
    });

    const windowFront = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 0.8), windowMaterial);
    windowFront.position.set(0.5, 1.5, 0.91);
    group.add(windowFront);

    const windowBack = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 0.8), windowMaterial);
    windowBack.position.set(0.5, 1.5, -0.91);
    windowBack.rotation.y = Math.PI;
    group.add(windowBack);

    // Wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 32);
    const wheelMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.8,
      roughness: 0.2,
    });

    const rimMaterial = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      metalness: 1,
      roughness: 0.1,
      emissive: 0x1e40af,
      emissiveIntensity: 0.3,
    });

    const positions = [
      [1.3, 0, 1.1],
      [1.3, 0, -1.1],
      [-1.3, 0, 1.1],
      [-1.3, 0, -1.1],
    ];

    positions.forEach(([x, y, z]) => {
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(x, y, z);
      group.add(wheel);

      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.32, 32), rimMaterial);
      rim.rotation.z = Math.PI / 2;
      rim.position.set(x, y, z);
      group.add(rim);
    });

    // Headlights (blue glow)
    const headlightGeometry = new THREE.BoxGeometry(0.3, 0.2, 0.1);
    const headlightMaterial = new THREE.MeshStandardMaterial({
      color: 0x60a5fa,
      emissive: 0x3b82f6,
      emissiveIntensity: 2,
      metalness: 0.5,
      roughness: 0.1,
    });

    const headlightLeft = new THREE.Mesh(headlightGeometry, headlightMaterial);
    headlightLeft.position.set(2.05, 0.6, 0.6);
    group.add(headlightLeft);

    const headlightRight = new THREE.Mesh(headlightGeometry, headlightMaterial);
    headlightRight.position.set(2.05, 0.6, -0.6);
    group.add(headlightRight);

    // Accent line (blue stripe)
    const stripeGeometry = new THREE.BoxGeometry(3.8, 0.05, 0.1);
    const stripeMaterial = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      emissive: 0x2563eb,
      emissiveIntensity: 0.5,
      metalness: 1,
      roughness: 0,
    });
    const stripe = new THREE.Mesh(stripeGeometry, stripeMaterial);
    stripe.position.set(0, 0.8, 1.01);
    group.add(stripe);

    return group;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Mouse parallax effect
      const targetRotationY = mouseX * 0.3;
      const targetRotationX = -mouseY * 0.15;

      meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.05;
      meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.05;

      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      <primitive object={carGeometry} />
    </group>
  );
};

const CarModel3D: React.FC = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 opacity-40 pointer-events-none" aria-hidden="true">
      <Canvas>
        <PerspectiveCamera makeDefault position={[8, 2, 8]} fov={50} />
        
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />
        <spotLight position={[-10, -10, -10]} angle={0.3} penumbra={1} intensity={0.4} color="#3b82f6" />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#60a5fa" />
        
        {/* Environment for reflections */}
        <Environment preset="city" />
        
        {/* Car component */}
        <Car mouseX={mousePosition.x} mouseY={mousePosition.y} />
      </Canvas>
    </div>
  );
};

export default CarModel3D;
