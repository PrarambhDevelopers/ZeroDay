  import { Canvas, useFrame } from "@react-three/fiber";
  import { OrbitControls, useGLTF } from "@react-three/drei";
  import { Suspense, useRef, useState, useEffect } from "react";
  import gsap from "gsap";
  import MatrixBG from "./MatrixBG";
  function CyberSkull() {
    const { scene } = useGLTF("/models/cyber_skull.glb");
    const modelRef = useRef();

    // State to track mouse position
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    useEffect(() => {
      const handleMouseMove = (event) => {
        const { innerWidth, innerHeight } = window;
        const x = (event.clientX / innerWidth) * 2 - 1; // Normalize to [-1, 1]
        const y = -(event.clientY / innerHeight) * 2 + 1; // Normalize to [-1, 1]

        // Fix: X-axis should move naturally
        gsap.to(rotation, {
          x: -y * 0.5, // Y-axis works fine, keep it the same
          y: x * 0.5, // FIX: X-axis now moves correctly
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

  function App() {
    return (
      <>
        <div className="relative text-[--color-neon] h-screen w-full flex justify-center items-center px-10">
          {/* Glitch Text in Background */}
          <h1 className="absolute top-[0%] text-[15rem] font-bold tracking-wide  text-[#50ff53]  opacity-100">
            ZERO DAY
          </h1>

          {/* Three.js Canvas */}
          <Canvas camera={{ position: [0, -80, 200] }} className="w-full h-full">
            <ambientLight intensity={0.4} />
            <directionalLight position={[-4, 6, 4]} intensity={4} castShadow />
            <Suspense fallback={null}>
              <CyberSkull />
            </Suspense>
            <OrbitControls />
          </Canvas>
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" , zIndex: -1}}>
          <MatrixBG />
        </div>
        </div>
        <div className="h-[100vh] text-white">asdasd</div>
      
      </>
    );
  }

  export default App;
