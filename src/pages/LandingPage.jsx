import React from 'react'
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect, lazy  } from "react";
import gsap from "gsap";
import MatrixBG from "../components/MatrixBG";
import DayBreakdown from "../components/DayBreakdown";
import WorkshopOverview from "../components/WorkshopOverview";
import Footer from "../components/Footer";
import CtfInfo from "../components/CtfInfo";
import FAQ from "../components/FAQ";
import Register from "../components/Register";
import RegistrationForm from "./RegistrationForm";
import logo from "../assets/logo.png";
const CyberSkull = lazy(() => import("../components/CyberSkull"));
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
        <div className="flex flex-col justify-center items-center text-white z-20  w-[100vw] h-screen px-4 py-2 rounded-lg">
              <div className="flex items-center my-10">
                  <img src={logo} alt="Prarambh Development Cell" className="h-40 rounded-xl" />
                </div>
            <h1 className="text-3xl font-bold z-10 text-[#34c837]">Loading... {Math.floor(progress)}%</h1>
            {/* Progress Bar */}
          <div className="w-3/4 max-w-md h-4 my-10 bg-gray-800 rounded-full overflow-hidden border border-gray-600">
              {/* Progress Bar with Smooth Gradient */}
            <div
              className="h-full transition-all duration-500 ease-in-out rounded-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #08a400, #34c837, #00ff00)",
              }}
            />
          </div>
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}>
            <MatrixBG />
          </div>
        </div>
      </Html>
    );
  }


export default function LandingPage() {
  const isMobile = window.innerWidth <= 768;

  return (
    <>
      <div className="relative text-[--color-neon] h-screen w-full flex justify-center items-center overflow-x-hidden ">
        <h1 className="absolute top-[5%] hidden md:block md:text-[15rem] font-bold tracking-wider  text-neon  "  >
          <span className='text-transparent ' style={{ WebkitTextStroke: '10px #50ff67' }}>ZERO</span> DAY
        </h1>
        <h1 className="absolute top-[24%] text-[7rem] md:hidden font-bold tracking-widest text-transparent opacity-50" style={{ WebkitTextStroke: '4px #50ff53' }}>
          ZERO
        </h1>
        <h1 className="absolute bottom-[28%] text-[7rem] md:hidden font-bold tracking-widest text-[#50ff53] t opacity-50" style={{ WebkitTextStroke: '6px #50ff53' }}>
          DAY
        </h1>
        <Canvas camera={{ position: isMobile ? [0, -120, 450] : [0, -80, 200] }} className="w-full h-full bg-transparent">
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[-5, 10, 8]} 
          intensity={4} 
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
    </>
  )
}
