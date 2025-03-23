import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect, lazy } from "react";
import { FaRocket, FaSkullCrossbones, FaGamepad, FaLock, FaPlay, FaFlag, FaTerminal, FaBug, FaKey, FaUserSecret, FaNetworkWired, FaPowerOff, FaLaptopCode, FaCog, FaCrosshairs, FaFire, FaFolderOpen, FaSearch, FaShieldAlt, 
  FaGlobe 
} from "react-icons/fa";

import gsap from "gsap";
import MatrixBG from "../components/MatrixBG";
import DayBreakdown from "../components/DayBreakdown";
import WorkshopOverview from "../components/WorkshopOverview";
import Footer from "../components/Footer";
import CtfInfo from "../components/CtfInfo";
import FAQ from "../components/FAQ";
import Register from "../components/Register";
import RegistrationForm from "./SyForm";
import logo from "../assets/logo.png";
const CyberSkull = lazy(() => import("../components/CyberSkull"));
import { Html, useProgress } from "@react-three/drei";
import "../components/glitechedButton.css";
import { useNavigate } from "react-router-dom";
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
      <div className="flex flex-col justify-center items-center text-white z-20 w-screen h-screen px-4 py-2 rounded-lg relative">
        {/* Logo */}
        <div className="flex items-center my-6">
          <img
            src={logo}
            alt="Prarambh Development Cell"
            className="h-32 md:h-40 rounded-xl shadow-lg"
          />
        </div>

        {/* Loading Message */}
        <h1 className="text-2xl md:text-3xl font-bold z-10 text-[#34c837] text-center">
          Loading... {Math.floor(progress)}%
        </h1>

        {/* Sarcastic Message */}
        <p className="text-md md:text-xl text-gray-400 mt-5 text-center  max-w-[80%]">
          Our website is so{" "}
          <span className="text-[#34c837] font-bold">insanely heavy</span> that
          even NASA's servers would sweat.
        </p>
        <p className="text-md md:text-xl text-gray-400 mt-2 text-center max-w-[80%]">
          Sit back, relax, and let your device{" "}
          <span className="text-[#34c837] font-bold">suffer</span> while it
          renders.
        </p>

        {/* Background Animation */}
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <MatrixBG />
        </div>
      </div>
    </Html>
  );
}

const buttonTexts = [
  { text: "Launch HackWars", icon: <FaRocket className="text-[#50ff53]" /> },
  { text: "Enter The Arena", icon: <FaSkullCrossbones className="text-[#50ff53]" /> },
  { text: "Start HackWars Battle", icon: <FaGamepad className="text-[#50ff53]" /> },
  { text: "Begin Your Quest", icon: <FaLock className="text-[#50ff53]" /> },
  { text: "Capture The Flag", icon: <FaFlag className="text-[#50ff53]" /> },
  
  // NEW ADDITIONS
  { text: "Initiate Cyber Clash", icon: <FaTerminal className="text-[#50ff53]" /> },
  { text: "Trigger The Hack", icon: <FaBug className="text-[#50ff53]" /> },
  { text: "Enter Hacker Mode", icon: <FaUserSecret className="text-[#50ff53]" /> },
  { text: " Power Up HackWars", icon: <FaPowerOff className="text-[#50ff53]" /> },
  { text: "Boot Up The Challenge", icon: <FaLaptopCode className="text-[#50ff53]" /> },
  { text: "Initiate Protocol Zero", icon: <FaCog className="text-[#50ff53]" /> },
  { text: "Target: Flag Locked", icon: <FaCrosshairs className="text-[#50ff53]" /> },
  { text: "HackWars: Enter Battlefield", icon: <FaFire className="text-[#50ff53]" /> },
  { text: "Crack The Cipher", icon: <FaSearch className="text-[#50ff53]" /> },
  { text: "Hack The Network", icon: <FaGlobe className="text-[#50ff53]" /> },
];


export default function LandingPage() {
  const isMobile = window.innerWidth <= 768;
  const navigate = useNavigate();


  const [btnContent, setBtnContent] = useState(buttonTexts[0]);

  useEffect(() => {
    const random = Math.floor(Math.random() * buttonTexts.length);
    setBtnContent(buttonTexts[random]);
  }, []);

  return (
    <>
      <div className="relative text-[--color-neon] h-screen w-full flex justify-center items-center overflow-x-hidden ">
        <h1 className="absolute top-[5%] hidden md:block md:text-[15rem] font-bold tracking-wider  text-neon  ">
          <span
            className="text-transparent "
            style={{ WebkitTextStroke: "10px #50ff67" }}
          >
            ZERO
          </span>{" "}
          DAY
        </h1>
        <h1
          className="absolute top-[24%] text-[7rem] md:hidden font-bold tracking-widest text-transparent opacity-50"
          style={{ WebkitTextStroke: "4px #50ff53" }}
        >
          ZERO
        </h1>
        <h1
          className="absolute bottom-[28%] text-[7rem] md:hidden font-bold tracking-widest text-[#50ff53]  opacity-50"
          style={{ WebkitTextStroke: "6px #50ff53" }}
        >
          DAY
        </h1>
        <Canvas
          camera={{ position: isMobile ? [0, -120, 450] : [0, -80, 200] }}
          className="w-full h-full bg-transparent"
        >
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
          <Suspense fallback={<Loader />}>
            <CyberSkull />
          </Suspense>
        </Canvas>
        <button
          className="buttonpro absolute bottom-[8%] flex items-center gap-2"
          onClick={() => navigate("/hackwars_login")}
        >
          {btnContent.icon}
          <span>{btnContent.text}</span>
        </button>

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
          }}
        >
          <MatrixBG />
        </div>
      </div>
      {/* <WorkshopOverview /> */}
      {/* <DayBreakdown /> */}
      {/* <CtfInfo /> */}
      {/* <Loader /> */}
      {/* <Register/> */}
      {/* <RegistrationForm/> */}
      {/* <FAQ /> */}
    </>
  );
}
