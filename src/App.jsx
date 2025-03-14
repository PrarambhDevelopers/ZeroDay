import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import MatrixBG from "./MatrixBG";
import DayBreakdown from "./DayBreakdown";
import WorkshopOverview from "./WorkshopOverview";
import Footer from "./Footer";
function CyberSkull() {
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



function App() {
  return (
    <>
      <div className="relative text-[--color-neon] h-screen w-full flex justify-center items-center px-10">
        <h1 className="absolute top-[0%] text-[15rem] font-bold tracking-wide text-[#50ff53] opacity-50">
          ZERO DAY
        </h1>
        <Canvas camera={{ position: [0, -80, 200] }} className="w-full h-full bg-transparent">
          <ambientLight intensity={0.4} />
          <directionalLight 
              position={[-5, 10, 8]} 
              intensity={8} 
              castShadow 
              color={"#78df7a"} //1db320
              shadow-mapSize-width={2048} 
              shadow-mapSize-height={2048} 
              shadow-camera-far={50} 
            />

          <Suspense fallback={null}>
            <CyberSkull />
          </Suspense>
          <OrbitControls enableZoom={false} />
        </Canvas>
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}>
          <MatrixBG />
        </div>
      </div>
      <WorkshopOverview />
      <DayBreakdown />
          <Footer />
    </>
  );
}

export default App;