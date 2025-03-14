import React from 'react';
import { FaUserSecret } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { RiSearchEyeFill } from "react-icons/ri";
import { GiCrosshair } from "react-icons/gi";

export default function WorkshopOverview() {
    return (
        <div className="flex flex-col justify-center items-center h-[100vh] bg-gradient-to-b from-black to-[#0a0a0a] text-white py-20 px-10 text-center">
            <h2 className="text-5xl font-extrabold text-[#50ff53] tracking-wide drop-shadow-lg">
                The Gateway to Ethical Hacking & Cybersecurity
            </h2>
            <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Step into the world of cybersecurity with <span className="text-[#50ff53] font-bold">ZERO DAY</span> – an immersive workshop designed to unveil the secrets of ethical hacking. 
                From uncovering vulnerabilities to mastering exploit techniques, get hands-on experience in the cyber realm. Are you ready to think like a hacker?
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
                {/** Card 1 */}
                <div className="relative p-8 bg-[#121212]/40 backdrop-blur-md rounded-xl border border-transparent shadow-lg 
                        transition-all duration-500 group hover:scale-110 hover:border-[#50ff53]/80  
                        before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#50ff53]/20 before:to-transparent before:rounded-xl 
                        before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100">
                    <MdSecurity className="text-6xl text-[#50ff53] drop-shadow-lg transition-transform duration-500 group-hover:rotate-6 mx-auto" />
                    <h3 className="text-xl font-semibold mt-4 text-gray-200">Learn Ethical Hacking Basics</h3>
                </div>

                {/** Card 2 */}
                <div className="relative p-8 bg-[#121212]/40 backdrop-blur-md rounded-xl border border-transparent shadow-lg 
                        transition-all duration-500 group hover:scale-110 hover:border-[#50ff53]/80  
                        before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#50ff53]/20 before:to-transparent before:rounded-xl 
                        before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100">
                    <RiSearchEyeFill className="text-6xl text-[#50ff53] drop-shadow-lg transition-transform duration-500 group-hover:rotate-6 mx-auto" />
                    <h3 className="text-xl font-semibold mt-4 text-gray-200">Hands-on Cybersecurity Challenges</h3>
                </div>

                {/** Card 3 */}
                <div className="relative p-8 bg-[#121212]/40 backdrop-blur-md rounded-xl border border-transparent shadow-lg 
                        transition-all duration-500 group hover:scale-110 hover:border-[#50ff53]/80  
                        before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#50ff53]/20 before:to-transparent before:rounded-xl 
                        before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100">
                    <FaUserSecret className="text-6xl text-[#50ff53] drop-shadow-lg transition-transform duration-500 group-hover:rotate-6 mx-auto" />
                    <h3 className="text-xl font-semibold mt-4 text-gray-200">Explore the Dark Web & Exploits</h3>
                </div>

                {/** Card 4 */}
                <div className="relative p-8 bg-[#121212]/40 backdrop-blur-md rounded-xl border border-transparent shadow-lg 
                        transition-all duration-500 group hover:scale-110 hover:border-[#50ff53]/80  
                        before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#50ff53]/20 before:to-transparent before:rounded-xl 
                        before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100">
                    <GiCrosshair className="text-6xl text-[#50ff53] drop-shadow-lg transition-transform duration-500 group-hover:rotate-6 mx-auto" />
                    <h3 className="text-xl font-semibold mt-4 text-gray-200">Participate in Capture The Flag (CTF)</h3>
                </div>
            </div>
        </div>
    );
}
