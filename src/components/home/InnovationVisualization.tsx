import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const InnovationVisualization = () => {
  const mountRef = useRef(null);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 500 / 500, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(500, 500);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Interactive Orbiting Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Create interconnected geometric shapes representing digital innovation
    const group = new THREE.Group();
    
    // Core Sphere
    const coreGeometry = new THREE.SphereGeometry(2, 32, 32);
    const coreMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x3b82f6, 
      metalness: 0.7, 
      roughness: 0.3 
    });
    const coreSphere = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(coreSphere);

    // Orbiting Cubes representing different tech domains
    const domains = [
      { color: 0x10b981, size: 0.7, distance: 3.5, speed: 0.01 },
      { color: 0xf43f5e, size: 0.6, distance: 4, speed: -0.015 },
      { color: 0x6366f1, size: 0.8, distance: 3.8, speed: 0.02 },
      { color: 0x8b5cf6, size: 0.5, distance: 4.2, speed: -0.025 }
    ];

    const orbits = domains.map(domain => {
      const geometry = new THREE.BoxGeometry(domain.size, domain.size, domain.size);
      const material = new THREE.MeshStandardMaterial({ 
        color: domain.color, 
        metalness: 0.6, 
        roughness: 0.4 
      });
      const cube = new THREE.Mesh(geometry, material);
      group.add(cube);
      return { cube, ...domain };
    });

    scene.add(group);

    // Position camera
    camera.position.z = 10;

    // Animation loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Rotate core
      coreSphere.rotation.x += 0.005;
      coreSphere.rotation.y += 0.005;

      // Orbital motion for cubes
      orbits.forEach((orbit, index) => {
        const time = Date.now() * 0.0005 * (index % 2 === 0 ? 1 : -1);
        orbit.cube.position.x = Math.cos(time + index) * orbit.distance;
        orbit.cube.position.y = Math.sin(time + index) * orbit.distance;
        orbit.cube.rotation.x += orbit.speed;
        orbit.cube.rotation.y += orbit.speed;
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div 
      className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden lg:block w-[500px] h-[500px] opacity-70 hover:opacity-100 transition-opacity duration-300"
      onMouseEnter={() => setIsInteractive(true)}
      onMouseLeave={() => setIsInteractive(false)}
    >
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-move"
        title="Interactive 3D Digital Innovation Visualization"
      />
      {isInteractive && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400">
          Drag to explore the digital ecosystem
        </div>
      )}
    </div>
  );
};

export default InnovationVisualization;