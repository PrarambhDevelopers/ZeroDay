import React from "react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import SYButton from "./SYButton";
import TYButton from "./TYButton";

const Register = () => {
  gsap.registerPlugin(ScrollTrigger);

 useEffect(() => {
    gsap.set(".marquee h1:nth-child(2)", { x: "-3000px" });
    gsap.set(".marquee h1:nth-child(3)", { x: "-1100px" });

    gsap.to(".marquee h1:nth-child(1)", {
      xPercent: -100,
      ease: "none",
      scrollTrigger: {
        trigger: ".marquee-container",
        start: "top top",
        end: "bottom top",
        scrub: 2, // Reduced speed
      },
    });

    gsap.to(".marquee h1:nth-child(2)", {
      xPercent: 100,
      ease: "none",
      scrollTrigger: {
        trigger: ".marquee-container",
        start: "top top",
        end: "bottom top",
        scrub: 2, // Reduced speed
      },
    });

    gsap.to(".marquee h1:nth-child(3)", {
      xPercent: 100,
      ease: "none",
      scrollTrigger: {
        trigger: ".marquee-container",
        start: "top top",
        end: "bottom top",
        scrub: 2, // Reduced speed
      },
    });
    gsap.to(".marquee h1:nth-child(4)", {
      xPercent: -100,
      ease: "none",
      scrollTrigger: {
        trigger: ".marquee-container",
        start: "top top",
        end: "bottom top",
        scrub: 2, // Reduced speed
      },
    });
  }, []);
  const navigate = useNavigate();
  //TY
//https://docs.google.com/forms/d/e/1FAIpQLSdTiZCA4jIS1uEMRi4BKfjS8Kc0KAx5jUkPv1QNM6CRc-MFCA/viewform?usp=sharing 

//SY
// https://docs.google.com/forms/d/e/1FAIpQLSfVhOkY5lYq-bwk8X7SnrJzF7emW9DgNqGKCDBouUdjILXHBA/viewform?usp=sharing
  return (
    <div className=" flex flex-col items-center justify-center bg-[#121212] text-white py-0 md:py-20 rounded-lg shadow-lg overflow-x-hidden">
      <div className="marquee-container w-full overflow-hidden mb-10 md:mb-24">
        <div className="marquee w-[500vw]">
          <h1 className="text-4xl md:text-9xl w-full uppercase my-5 py-10 font-bold border-b-2 border-t-2">Register Register Register Register Register  Register Register Register  Register Register</h1>
          <h1 className="text-4xl md:text-9xl w-full uppercase my-5 py-10 font-bold border-b-2 border-t-2 text-transparent hidden md:block "  style={{ WebkitTextStroke: '6px #50ff53' }}>Now Now Now Now Now Now Now Now Now Now Now Now Now Now Now</h1>
          <h1 className="text-4xl md:text-9xl w-full uppercase my-5 py-10 font-bold border-b-2 border-t-2 text-[#50ff53] block md:hidden " >Now Now Now Now Now Now Now Now Now Now Now Now Now Now Now</h1>
          <h1 className="text-4xl md:text-9xl w-full uppercase my-5 py-10 font-bold border-b-2 border-t-2">Limited Seats Limited Seats Limited Seats Limited Seats Limited Seats  Limited Seats Limited Seats Limited Seats  </h1>
        </div>
      </div>


    <div className="w-full space-y-6 p-10">
        <h2 className="text-5xl font-bold text-center text-[#50ff53]">
            Register Now & Secure Your Spot!
        </h2>
        
    <p className="text-3xl mb-6 font-semibold text-gray-300 text-center">
        Entry Fee: <span className="text-[#50ff53] font-bold">₹ 100</span>
    </p>
        <p className="text-lg text-gray-300 text-center leading-relaxed">
            Join <span className="font-semibold text-[#50ff53]">ZERO DAY</span>, the ultimate cybersecurity workshop!  
            Select your year and register to dive into ethical hacking.
        </p>
    <div className="flex flex-col md:flex-row justify-center items-center w-full gap-5">
          <SYButton />
          <TYButton />
    </div>

        {/* SY Registration Button */}
        {/* <button
            className="w-full bg-green-500 text-black font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-400 transition-transform transform hover:scale-105 neon-glow"
            onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfVhOkY5lYq-bwk8X7SnrJzF7emW9DgNqGKCDBouUdjILXHBA/viewform?usp=sharing', '_blank')}
        >
            SY Register
        </button> */}

  
        {/* TY Registration Button */}
        {/* <button
            className="w-full bg-green-500 text-black font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-400 transition-transform transform hover:scale-105 neon-glow"
            onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSdTiZCA4jIS1uEMRi4BKfjS8Kc0KAx5jUkPv1QNM6CRc-MFCA/viewform?usp=sharing', '_blank')}
        >
            TY Register
        </button> */}
    </div>
</div>
  );
};



export default Register;



