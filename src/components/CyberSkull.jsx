import React from 'react'

import gsap from "gsap";
import { useFrame } from "@react-three/fiber";
import {  useGLTF } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect, lazy  } from "react";

export default  function CyberSkull() {
    const { scene } = useGLTF("/models/cyber_skull.glb");
    const modelRef = useRef();
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
  
    useEffect(() => {
      const handleMouseMove = (event) => {
        const { innerWidth, innerHeight } = window;
        const x = (event.clientX / innerWidth) * 2 - 1;
        const y = -(event.clientY / innerHeight) * 2 + 1;
  
        gsap.to(rotation, {
          x: -y * 0.5,
          y: x * 0.5,
          duration: 0.5,
          ease: "power2.out",
          onUpdate: () => setRotation({ ...rotation }),
        });
      };
  
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [rotation]);
  
    useFrame(() => {
      if (modelRef.current) {
        modelRef.current.rotation.x = rotation.x;
        modelRef.current.rotation.y = rotation.y;
      }
    });
  
    return <primitive ref={modelRef} object={scene} scale={1} />;
  }
  

