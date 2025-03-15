import React from "react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

const Register = () => {
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.set(".marquee h1:nth-child(2)", { x: "-3000px" });

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

  return (
    <div className=" flex flex-col items-center justify-center bg-[#121212] text-white py-10 rounded-lg shadow-lg overflow-x-hidden">
      <div className="marquee-container w-full overflow-hidden mb-24">
        <div className="marquee w-[500vw]">
          <h1 className="text-9xl w-full uppercase my-5 py-10 font-bold border-b-2 border-t-2">Register Register Register Register Register  Register Register Register  Register Register</h1>
          <h1 className="text-9xl w-full uppercase my-5 py-10 font-bold border-b-2 border-t-2 text-transparent "  style={{ WebkitTextStroke: '6px #50ff53' }}>Now Now Now Now Now Now Now Now Now Now Now Now Now Now Now</h1>
          <h1 className="text-9xl w-full uppercase my-5 py-10 font-bold border-b-2 border-t-2">Limited Seats Limited Seats Limited Seats Limited Seats Limited Seats  Limited Seats Limited Seats Limited Seats  </h1>
        </div>
      </div>
      <div className="py-30">    
        <h1 className="text-2xl font-bold mb-2 text-green-400 ">Geeks Register Fast</h1>
        <p className="text-lg mb-4 font-semibold text-gray-300">
          Entry Fee: <span className="text-green-400">₹ 100</span>
        </p>

        <div className="space-y-4">
          <button
            className="w-full bg-green-500 text-black font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-400 transition-transform transform hover:scale-105 neon-glow"
            onClick={() => navigate('/syregister')}
          >
            SY Register
          </button>

          <button
            className="w-full bg-green-500 text-black font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-400 transition-transform transform hover:scale-105 neon-glow"
            onClick={() => navigate('/tyregister')}
          >
            TY Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
