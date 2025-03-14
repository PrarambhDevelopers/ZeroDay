import React from "react";

const CtfInfo = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-[#121212] text-white p-10 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-[#50ff53] mb-4">
          HackWars: Prove Your Cyber Prowess!
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Test your skills with real-world hacking challenges based on what you
          learned.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="flex flex-col items-center bg-[#1a1a1a] p-6 rounded-lg shadow-md">
            <span className="text-3xl mb-2">🔎</span>
            <h3 className="text-xl font-semibold text-[#50ff53]">Dorking</h3>
            <p className="text-gray-400">OSINT & Google Hacking</p>
          </div>
          <div className="flex flex-col items-center bg-[#1a1a1a] p-6 rounded-lg shadow-md">
            <span className="text-3xl mb-2">🏴‍☠️</span>
            <h3 className="text-xl font-semibold text-[#50ff53]">IDOR</h3>
            <p className="text-gray-400">Exploit insecure object references</p>
          </div>
          <div className="flex flex-col items-center bg-[#1a1a1a] p-6 rounded-lg shadow-md">
            <span className="text-3xl mb-2">🛡</span>
            <h3 className="text-xl font-semibold text-[#50ff53]">XSS</h3>
            <p className="text-gray-400">Cross-Site Scripting attacks</p>
          </div>
          <div className="flex flex-col items-center bg-[#1a1a1a] p-6 rounded-lg shadow-md">
            <span className="text-3xl mb-2">🔥</span>
            <h3 className="text-xl font-semibold text-[#50ff53]">Nmap</h3>
            <p className="text-gray-400">Network scanning techniques</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtfInfo;
