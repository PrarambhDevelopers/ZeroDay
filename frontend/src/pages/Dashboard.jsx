import React, { useEffect, useState } from "react";
import { FaTrophy, FaFlag, FaUserSecret } from "react-icons/fa";
import MatrixBG from "../components/MatrixBG";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"; 
// Sample user object (replace with real data fetching in actual usage)
const user = {
  name: "Harshvardhan Patil",
  ctf_id: "zero_102",
  contact: "7239102356",
  email: "harsh2504patil@gmail.com",
  points: "150",
  submitted_flags: "5",
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const firstName = user.name.split(" ")[0];
  
    const greetings = [
      `Hola, ${firstName}! Ready to hack?`,
      `Hey ${firstName}, warrior of the matrix!`,
      `Yo ${firstName}, welcome back!`,
      `${firstName}, locked & loaded?`,
      `Ahoy, ${firstName} the flag hunter!`,
      `What’s up, ${firstName}? Let's dominate!`,
      `Zero Day vibes, ${firstName}!`,
      `${firstName}, back to crack some flags?`,
      `Another flag? Let’s go, ${firstName}!`,
      `${firstName}, let’s break some code today!`,
      `Stay sharp, ${firstName}! The flags await.`,
    ];
  
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
  
    setGreeting(randomGreeting);
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token or session
    window.location.href = '/';  // Redirect to login page
  };
  

  return (
    <div className="relative flex flex-col items-center justify-center bg-[#121212]/70  text-white p-10 rounded-lg shadow-lg min-h-[100vh] overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <MatrixBG />
      </div>
      <div className="absolute top-6 right-6 z-20">
        <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-400 border border-transparent hover:border-red-500 hover:text-red-300 bg-[#121212] hover:bg-[#1f1f1f] px-4 py-2 rounded-lg shadow-lg active:scale-95 transition"
        >
            <span>Logout</span>
            <FaSignOutAlt className="text-lg" />
        </button>
        </div>
  

      {/* Dynamic Welcome Message */}
      <h2 className="text-2xl md:text-4xl font-bold mb-2 text-center text-[#a5ff95]">
            {greeting.split(user.name.split(" ")[0])[0]}
            <span className="bg-gradient-to-r from-green-400 to-[#50ff53] text-transparent bg-clip-text">
                {user.name.split(" ")[0]}
            </span>
            {greeting.split(user.name.split(" ")[0])[1]}
            </h2>

      <p className="text-sm md:text-lg text-gray-400 text-center mb-2">
        CTF ID: <span className="text-[#50ff53] font-bold">{user.ctf_id}</span>
      </p>
      <p className="text-lg text-gray-300 text-center max-w-3xl mb-8 neon-text">
        Check your stats, submit flags & climb the leaderboard!
      </p>

      {/* Stats Section */}
      <div className="flex flex-wrap justify-center items-centerbg-gradient-to-br from-[#1a1a1a] via-[#0d0d0d] to-[#1a1a1a] backdrop-blur-sm p-2 rounded-xl mb-12 w-auto max-w-4xl shadow-lg hover:scale-105 transition-all duration-300 border border-cyan-500/20">
        <div className="flex flex-col items-center mx-6 my-4">
          <FaTrophy size={30} className="text-[#50ff53] mb-1" />
          <p className="text-gray-400 text-sm">Rank</p>
          <span className="text-2xl font-bold text-[#50ff53]">#12</span>
        </div>
        <div className="h-12 border-l border-gray-600 mx-4 hidden sm:block" />
        <div className="flex flex-col items-center mx-6 my-4">
          <FaFlag size={30} className="text-[#50ff53] mb-1" />
          <p className="text-gray-400 text-sm">Flags Submitted</p>
          <span className="text-2xl font-bold text-[#50ff53]">
            {user.submitted_flags || 0}
          </span>
        </div>
        <div className="h-12 border-l border-gray-600 mx-4 hidden sm:block" />
        <div className="flex flex-col items-center mx-6 my-4">
          <FaUserSecret size={30} className="text-[#50ff53] mb-1" />
          <p className="text-gray-400 text-sm">Points</p>
          <span className="text-2xl font-bold text-[#50ff53]">
            {user.points || 0}
          </span>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Leaderboard */}
        <div className="flex flex-col items-center bg-gradient-to-br from-[#1a1a1a] via-[#0d0d0d] to-[#1a1a1a] p-8 rounded-lg shadow-md hover:scale-105 transition-all duration-300 border border-cyan-500/20">
          <FaTrophy size={50} className="text-[#50ff53] mb-4" />
          <h3 className="text-2xl font-semibold mb-2 text-[#50ff53]">Leaderboard</h3>
          <p className="text-gray-400 text-center mb-4">Track top warriors & stay ahead!</p>
          <button
            onClick={() => navigate("/leaderboard")}
            className="bg-gradient-to-r from-green-400 to-[#50ff53] duration-100  text-black font-bold py-2 px-4 rounded-xl transition-all active:scale-95 hover:shadow-lg"
          >
            View
          </button>
        </div>

        {/* Flag Submission */}
        <div className="flex flex-col items-center bg-gradient-to-br from-[#1a1a1a] via-[#0d0d0d] to-[#1a1a1a] p-8 rounded-lg shadow-md hover:scale-105 transition-all duration-300 border border-cyan-500/20">
          <FaFlag size={50} className="text-[#50ff53] mb-4" />
          <h3 className="text-2xl font-semibold mb-2 text-[#50ff53]">Submit Flag</h3>
          <p className="text-gray-400 text-center mb-4">Got the flag? Submit it & earn points!</p>
          <button
            onClick={() => navigate("/flag-submit")}
            className="bg-gradient-to-r from-green-400 to-[#50ff53] duration-100  text-black font-bold py-2 px-4 rounded-xl transition-all active:scale-95 hover:shadow-lg"
          >
            Submit
          </button>
        </div>

        {/* Profile */}
        <div className="flex flex-col items-center bg-gradient-to-br from-[#1a1a1a] via-[#0d0d0d] to-[#1a1a1a] p-8 rounded-lg shadow-md hover:scale-105 transition-all duration-300 border border-cyan-500/20">
          <FaUserSecret size={50} className="text-[#50ff53] mb-4" />
          <h3 className="text-2xl font-semibold mb-2 text-[#50ff53]">Your Profile</h3>
          <p className="text-gray-400 text-center mb-4">Manage your account & credentials.</p>
          <button
            onClick={() => navigate("/profile")}
            className="bg-gradient-to-r from-green-400 to-[#50ff53] text-black font-bold py-2 px-4 rounded-xl transition-all duration-100 active:scale-95 hover:shadow-lg"
          >
            Manage
          </button>
        </div>
      </div>

      {/* Motivational Quote */}
      <p className="mt-12 text-gray-400 text-center italic">
        "In the world of code, victory belongs to those who debug relentlessly." 💻🔥
      </p>
    </div>
  );
}
