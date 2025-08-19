import React from 'react'
import { FaLock, FaExclamationTriangle, FaCalendarTimes, FaUserSecret } from "react-icons/fa";
import MatrixBG from "../components/MatrixBG";

export default function SyForm({type, status }) {
  return (
    <div className='flex justify-center items-center min-h-screen py-10'> 
      {status === "not_started" ? (
        <div className='flex justify-center items-center space-y-5 flex-col text-3xl font-bold text-center text-[#50ff53]'>
            <h2 className=" "> Hold your horses, hackers!   </h2>
            <h2>Registration opens at 7 PM today.</h2>
            <h2>Stay tuned, or risk getting 403 - Forbidden!</h2>
       </div>
      ) : status === "open" ? (
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfVhOkY5lYq-bwk8X7SnrJzF7emW9DgNqGKCDBouUdjILXHBA/viewform?embedded=true" width="640" height="3583" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>  
      ) : (
        <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
          {/* Background Matrix */}
          <div className="absolute inset-0 -z-10 opacity-30">
            <MatrixBG />
          </div>
          
          {/* Main Content Container */}
          <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
            {/* Lock Icon */}
            <div className="mb-8">
              <FaLock className="text-6xl text-[#50ff53] mx-auto animate-pulse" />
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#50ff53]">
              ACCESS
            </h1>
            <h1 className="text-5xl md:text-7xl font-bold mb-8" 
                style={{ WebkitTextStroke: '2px #50ff53', color: 'transparent' }}>
              DENIED
            </h1>

            {/* Simple message */}
            <div className="border border-[#50ff53]/30 rounded-lg p-6 mb-8 bg-black/50">
              <p className="text-xl text-[#50ff53] mb-4">
                Registration window closed
              </p>
              <p className="text-gray-400">
                Workshop capacity reached. Stay tuned for future events.
              </p>
            </div>

            {/* Minimal terminal-style status */}
            <div className="font-mono text-left border border-[#50ff53]/20 rounded p-4 bg-black/70">
              <span className="text-[#50ff53]">root@zeroday:~$ </span>
              <span className="text-gray-300">check_registration_status</span>
              <br />
              <span className="text-[#50ff53]">&gt; </span>
              <span className="text-gray-400">status: closed</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
