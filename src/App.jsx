import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect, lazy  } from "react";
import gsap from "gsap";
import MatrixBG from "./MatrixBG";
import DayBreakdown from "./DayBreakdown";
import WorkshopOverview from "./WorkshopOverview";
import Footer from "./Footer";
import CtfInfo from "./CtfInfo";
import FAQ from "./FAQ";
import Register from "./Register";
import RegistrationForm from "./RegistrationForm";
import logo from "./assets/logo.png";
const CyberSkull = lazy(() => import("./CyberSkull"));
import { Html, useProgress } from "@react-three/drei";


function Loader() {
  const { progress } = useProgress();

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scrolling
    document.body.style.pointerEvents = "none"; // Disable interactions
    document.documentElement.style.overflow = "hidden"; // Hide scrollbar

    return () => {
      document.body.style.overflow = "auto"; // Re-enable scrolling
      document.body.style.pointerEvents = "auto"; // Re-enable interactions
      document.documentElement.style.overflow = "auto"; // Restore scrollbar
    };
  }, []);
  
  return (
    <Html center>
      <div className="flex flex-col justify-center items-center text-white  w-[100vw] h-screen px-4 py-2 rounded-lg">
            <div className="flex items-center my-10">
                <img src={logo} alt="Prarambh Development Cell" className="h-40 rounded-xl" />
              </div>
          <h1 className="text-3xl font-bold z-10 text-[#34c837]">Loading... {Math.floor(progress)}%</h1>
          {/* Progress Bar */}
        <div className="w-3/4 max-w-md h-4 my-10 bg-gray-800 rounded-full overflow-hidden border border-gray-600">
          <div
            className="h-full bg-[#08a400] transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }} // Smooth width update
          />
        </div>
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}>
          <MatrixBG />
        </div>
      </div>
    </Html>
  );
}



function App() {
  return (
    <>
      <div className="relative text-[--color-neon] h-screen w-full flex justify-center items-center ">
        <h1 className="absolute top-[5%] text-[5rem] md:text-[15rem] font-bold tracking-wide text-[#50ff53] opacity-50">
          ZERO DAY
        </h1>
        <Canvas camera={{ position: [0, -80, 200] }} className="w-full h-full bg-transparent">
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[-5, 10, 8]} 
          intensity={8} 
          castShadow 
          color={"#78df7a"}
          shadow-mapSize-width={2048} 
          shadow-mapSize-height={2048} 
          shadow-camera-far={50} 
        />
        <Suspense  fallback={<Loader /> }>
          <CyberSkull />
        </Suspense>
      </Canvas>
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}>
          <MatrixBG />
        </div>
      </div>
      <WorkshopOverview />
      <DayBreakdown />
      <CtfInfo />
      {/* <Loader /> */}
      <Register/>
      {/* <RegistrationForm/> */}
      <FAQ/>
      <Footer />
    </>
  );
}

export default App;