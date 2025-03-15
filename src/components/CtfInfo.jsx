import React from "react";
import { FaUserSecret, FaBug, FaLock, FaKey, FaTrophy, FaUsers, FaClock } from "react-icons/fa";

const CtfInfo = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-[#121212] text-white p-10 rounded-lg shadow-lg min-h-[100vh]">
      <h2 className="text-4xl font-bold text-[#50ff53] mb-6 text-center">
        HackWars: Prove Your Cyber Prowess!
      </h2>
      <p className="text-lg text-gray-300 text-center max-w-4xl mb-10">
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
            className="flex flex-col items-center bg-[#1a1a1a] p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            <div className="text-[#50ff53] mb-3">{challenge.icon}</div>
            <h3 className="text-xl font-semibold text-[#50ff53]">{challenge.title}</h3>
            <p className="text-gray-400 text-center">{challenge.desc}</p>
          </div>
        ))}
      </div>

      {/* Key Details */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center text-gray-300 mb-12">
      
          <div className="flex flex-col items-center bg-[#1a1a1a] p-8 rounded-lg shadow-md">
            <div className="text-[#50ff53] mb-4"><FaTrophy size={50} /></div>
            <p className="text-xl font-semibold">Win Exciting Prizes!</p>
          </div>
        
      </div>
    </div>
  );
};

export default CtfInfo;
