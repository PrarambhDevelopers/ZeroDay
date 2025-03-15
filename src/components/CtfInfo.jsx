import React from "react";
import { FaUserSecret, FaBug, FaLock, FaKey, FaTrophy, FaUsers, FaClock } from "react-icons/fa";
import darkInsight from "../assets/day4.png";
import trophy from "../assets/trophy.png";
const CtfInfo = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-[#121212] text-white p-10 rounded-lg shadow-lg min-h-[100vh]">
      <h2 className="text-4xl font-bold text-[#50ff53] mb-6 text-center neon-text">
        HackWars: Prove Your Cyber Prowess!
      </h2>
      <p className="text-lg text-gray-300 text-center max-w-4xl mb-10 neon-text">
        Get ready for the ultimate Capture The Flag (CTF) competition! Solve cybersecurity challenges, 
        uncover vulnerabilities, and prove your hacking skills. Compete, capture flags, and win exciting prizes! 🏆
      </p>

      {/* Challenge Categories */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {[
          { icon: <FaUserSecret size={40} />, title: "OSINT", desc: "Gather intelligence & uncover hidden data" },
          { icon: <FaBug size={40} />, title: "Web Exploitation", desc: "Find and exploit web vulnerabilities" },
          { icon: <FaLock size={40} />, title: "Network Security", desc: "Analyze traffic & detect threats" },
        ].map((challenge, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-[#1a1a1a]  p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
          <div className="text-[#50ff53] mb-3">{challenge.icon}</div>
            <h3 className="text-xl font-semibold text-[#50ff53]">{challenge.title}</h3>
            <p className="text-gray-400 text-center">{challenge.desc}</p>
          </div>
        ))}
      </div>
      {/* Key Details */}
      <div className="flex flex-col relative md:flex-row items-center justify-center gap-6 w-full h-[500px] overflow-hidden text-center text-gray-300 mb-12">
   
      <p className="text-transparent hidden md:block text-[2rem] md:text-[8rem] absolute top-[-10px] md:top-[-50px] font-bold neon-text" style={{ WebkitTextStroke: '5px #50ff67', lineHeight: '1.2' }}>Win Exciting Prizes!</p>
      <p className="text-[#50ff53] text-[3rem] md:text-[8rem] absolute top-[-10px] md:top-[-40px] md:left-[135px] font-bold neon-text" style={{ lineHeight: '1.2' }}>Win Exciting Prizes!!</p>
    
            <div className="flex flex-col items-center p-2 md:p-8 rounded-lg shadow-md">
              <img src={trophy} alt={trophy} className="w-[300px] h-[300px] md:w-[700px] md:h-[700px] z-1 object-contain floating" />
            </div>
      </div>  
     
    </div>
  );
};

export default CtfInfo;
