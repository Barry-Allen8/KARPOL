import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeDHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const getSize = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      return { width, height };
    };

    const { width, height } = getSize();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(9, 2.4, 180, 24);
    const material = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      metalness: 0.95,
      roughness: 0.15,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    const knot = new THREE.Mesh(geometry, material);
    scene.add(knot);

    const ambientLight = new THREE.AmbientLight(0x3b82f6, 0.4);
    const keyLight = new THREE.PointLight(0x60a5fa, 1.2);
    keyLight.position.set(25, 20, 30);

    const fillLight = new THREE.PointLight(0xffffff, 0.3);
    fillLight.position.set(-25, -15, 20);

    scene.add(ambientLight, keyLight, fillLight);
    camera.position.z = 27;

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      knot.rotation.x += 0.0012;
      knot.rotation.y += 0.0018;
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      const size = getSize();
      camera.aspect = size.width / size.height;
      camera.updateProjectionMatrix();
      renderer.setSize(size.width, size.height);
    };

    animate();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true" />;
};

export default ThreeDHero;
