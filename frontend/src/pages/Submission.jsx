import React, { useState, useEffect, useRef, useContext } from 'react';
import { FaLock, FaCheckCircle, FaFlag } from "react-icons/fa";
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import MatrixBG from "../components/MatrixBG";
import { FaAngleLeft, FaTrophy } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Import your context (adjust path)
import luffy from '../assets/luffy.jpg';
import zoro from '../assets/zoro.jpg';
import nami from '../assets/nami.jpg';
import usopp from '../assets/usopp.jpg';
import sanji from '../assets/sanji.jpg';
import chopper from '../assets/chopper.jpg';
import robin from '../assets/robin.jpg';
import franky from '../assets/franky.jpg';
import brook from '../assets/brook.jpg';
import jinbe from '../assets/jinbe.jpg';

 const avatarImages = [luffy, zoro, nami, usopp, sanji, chopper, robin, franky, brook, jinbe];
export default function Submission() {
  const [flagInput, setFlagInput] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null); // null | 'correct' | 'invalid' | 'duplicate'
  const levelRefs = useRef([]);
  const confettiTriggered = useRef(false);
  const TOTAL_LEVELS = 9;
  // CONTEXT
  const { user, updateUser } = useAuth();

  const unlockedLevels = user?.submitted_flags?.length || 0;

  useEffect(() => {
    gsap.from(levelRefs.current, {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1,
      ease: "power4.out",
      onComplete: () => {
        gsap.to(levelRefs.current, { opacity: 1 });
      }
      
    });
  }, []);

  useEffect(()=>{
    localStorage.setItem('finalFlag', 'ZERO{544be1cb45863c401641db916c3348ed}');
  },[])
 

  useEffect(() => {
    if (unlockedLevels === TOTAL_LEVELS && !confettiTriggered.current) {
      confettiTriggered.current = true;
      const script = document.createElement('script');
      script.src = "https://run.confettipage.com/here.js";
      script.setAttribute("data-confetticode", "U2FsdGVkX198A7sIAaf5yDrIHJ5fp8zZFcZfHSqkxtbLwPsFFdWkv67DczQz16RzGxx+sDqViVqNFbKDvGHU3C0W3xYqsjj1xr/pLwPoudoSQIFcT2IYwL21RhwBVqxQSGL+vfDjesqRzXNhu7nXlXyRZik+TJbHusmz4HmQAEFlzqj5h5L9W3Yt16aFLNpJhylOZ4HUF3hRRklU4BouTMM7nOsm9sbuJZFpqH1ZUlafpY7eWa6EfgysUo+xPdB2QnQxQ+10tCc5xeRAh+H0gElhfs/xzw6IJoCNDDEVVE1uavCRRsAyHfwWw0CHVsHAvZFLuDmetRJU6b29aSJw/2ntkZ9Jwjaym6E5LEU60e97Dspr6ekuaRF3FKTiFXT0qhPSoUHEx8PT2wlSWpRrvdhzCLe3e4TrLlGvnIq9ialMqv9CRwQdPn4xcGh4k21BGgyesP4k849xd4fulsQrNLwhR0xQOnW6/6o9bq1FlkBxRbdelAE4Ytlodor8fGPZgs7+LGICY+cuPbs5l7bfucxSEsOYydIfR2RZmV0zesrEd6POcczOUQMlBoOFdaMHNzQ6YOkk0m+qxQeLtIcCqUPmnmB3F/eVbVzsAS/jE3jUpE1BBD0sDj/LRTBeAr9unG5e4LyMnTwKdmtF4zhF1ObFBQ8aZitTI2dD5qsgqvucy3mvezZVOdQmRXUAzlxJGVuy9TWZHEM16NUPgHnO3ScUXwDnHAakr5QxBQXGwVZJO/PK5MiWUZZct/rQyNCnsUC4mBdJUr7QxIDgtQx8nw==");
      script.async = true;
      document.body.appendChild(script);
    }
  }, [unlockedLevels]);



  useEffect(() => {
    if (unlockedLevels === TOTAL_LEVELS) {
      const interval = setInterval(() => {
        const popup = document.querySelector('.cp-dwp--popup');
        if (popup) {
          popup.style.display = 'none';
          clearInterval(interval);
        }
      }, 500);
      setTimeout(() => clearInterval(interval), 10000);
    }
  }, [unlockedLevels]);

  // === SUBMIT HANDLER ===
  const handleSubmit = async (e) => {
    e.preventDefault();

    if ((user?.submitted_flags?.length || 0) + 1 > TOTAL_LEVELS) {
      setSubmissionStatus("invalid");
      return;
    }

    try {
      const response = await axios.post('https://zeroday-7sa4.onrender.com/api/stage/submit-flag', {
        ctf_id: user.ctf_id,
        level: `level${(user?.submitted_flags?.length) + 1 || 0}`,
        submittedFlag: flagInput
      });

      const resData = response.data;

      if (resData.status === "correct") {
        setSubmissionStatus("correct");

        // Update user context to reflect new flag submission
        const updatedUser = {
          ...user,
          submitted_flags: [...user.submitted_flags, flagInput],
          points: (user.points || 0) + resData.points
        };
        updateUser(updatedUser);

      } else if (resData.status === "duplicate") {
        setSubmissionStatus("duplicate");
      } else if (resData.status === "invalid") {
        setSubmissionStatus("invalid");
      }else if (resData.status === "not_started") {
        setSubmissionStatus("not_started");
      }

    } catch (error) {
      console.error('Error submitting flag:', error);
      setSubmissionStatus("error"); // fallback in case API fails
    }

    setFlagInput('');
  };

  const renderStatusMessage = () => {
    if (!submissionStatus) return null;

    setTimeout(() => {
      setSubmissionStatus(null);
    }, 5000);

    switch (submissionStatus) {
      case "correct":
        return (
          <motion.div
            className="text-green-400 font-bold text-xl mt-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            Flag is Correct! Level Unlocked!
          </motion.div>
        );
      case "invalid":
        return (
          <motion.div
            className="text-red-400 font-bold text-xl mt-4"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            Invalid Flag! Try Harder 
          </motion.div>
        );
      case "duplicate":
        return (
          <motion.div
            className="text-yellow-400 font-bold text-xl mt-4"
            initial={{ rotate: -10, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
          >
            Already Submitted This Flag!
          </motion.div>
        );
      case "error":
        return (
          <motion.div
            className="text-red-400 font-bold text-xl mt-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            Error Submitting Flag! Try Again
          </motion.div>
        );
      case "not_started":
        return (
          <motion.div
            className="text-red-400 font-bold text-xl mt-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            Flag Submission has not started yet
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center bg-[#0a0a0a]/70 text-white p-10 rounded-lg shadow-2xl min-h-[100vh] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-70">
        <MatrixBG />
      </div>

      <div className="absolute top-6 left-6 z-20">
        <Link to="/hackwars_dashboard" className="flex items-center gap-2 text-green-400 border border-transparent  hover:border-green-500 hover:text-green-300 bg-[#121212] hover:bg-[#1f1f1f] px-4 py-2 rounded-lg shadow-lg active:scale-95 transition">
          <FaAngleLeft className="text-lg" />
          <span>Back</span>
        </Link>
      </div>
      <div className="absolute top-6 z-20 flex items-center gap-2 border border-transparent  hover:border-green-500 hover:text-green-300 bg-[#121212] hover:bg-[#1f1f1f] px-4 py-2 rounded-lg shadow-lg">
      <img
        src={avatarImages[user?.avatar]}
        alt="User Avatar"
        className="w-8 h-8 rounded-full border-2 border-[#50ff53]"
      />
      <div>
        <p className="text-sm font-bold text-[#50ff53]">{user?.name}</p>
        {/* <p className="text-sm text-gray-400">{user?.email}</p> */}
      </div>
    </div>
      <div className="absolute top-6 right-6 z-20">
        <Link 
          to="/leaderboard"
          className="flex items-center gap-2 bg-[#121212] hover:bg-[#1f1f1f] text-cyan-400 border border-transparent  hover:border-cyan-500 px-4 py-2 rounded-lg shadow-md hover:shadow-cyan-glow transition-all"
        >
          <FaTrophy />
          <span>Leaderboard</span>
        </Link>
      </div>

      <h1 className="text-4xl font-extrabold mt-12 mb-8 z-10 neon-text text-[#a5ff95]">Drop Your Flag Below, Hacker!</h1>

      {unlockedLevels < TOTAL_LEVELS && (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 z-10">
          <input
            type="text"
            placeholder="Got the flag? Drop it here.."
            value={flagInput}
            onChange={(e) => setFlagInput(e.target.value)}
            className="w-80 p-4 rounded-lg bg-[#121212] text-green-400 font-mono placeholder-green-500 
                        shadow-inner shadow-green-900 border border-green-500 focus:outline-none focus:ring-2
                        focus:ring-green-400 focus:border-green-500 transition duration-300 ease-in-out"
          />

          <button type="submit" className=" buttonpro flex items-center transition-transform hover:scale-105 shadow-lg">
            <span>Submit Flag</span>
          </button>
        </form>
      )}


      {renderStatusMessage()}
      <div className="mt-12 w-full max-w-2xl grid grid-cols-1 gap-4 z-10">

        {/* Completed Badge at Top */}
        {unlockedLevels === TOTAL_LEVELS && (
          <motion.div
            className="p-6 bg-gradient-to-r from-yellow-500 to-yellow-300 text-black rounded-lg text-center font-bold text-xl shadow-lg animate-pulse mb-4"
            initial={{ y: -100, scale: 0 }}
            animate={{ y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            🎉 All Levels Completed! Lets see wheter you are HackWars Champion 🏆
          </motion.div>
        )}

        {[...Array(TOTAL_LEVELS)].map((_, idx) => {
          const isUnlocked = idx < unlockedLevels;
          const isCurrentUnlock = idx === unlockedLevels - 1;

          return (
            <AnimatePresence key={idx}>
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: isCurrentUnlock ? 1.05 : 1,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  type: isCurrentUnlock ? "spring" : "tween",
                  stiffness: 300,
                  damping: 20,
                  duration: isCurrentUnlock ? 0.8 : 0.4,
                }}
                className={`flex justify-between items-center p-4 rounded-lg border  transition-all duration-300 ${
                  isUnlocked
                    ? 'bg-green-700 border-green-400 shadow-green-glow hover:shadow-lg hover:scale-105'
                    : 'bg-gradient-to-br from-[#1a1a1a] via-[#0d0d0d] to-[#1a1a1a] rounded-lg shadow-md '
                }`}
              >
                <span className="text-lg text-[#50ff53]">Level {idx + 1}</span>
                {isUnlocked ? (
                  <FaCheckCircle className="text-green-400 text-xl" />
                ) : (
                  <FaLock className="text-gray-400 text-xl" />
                )}
              </motion.div>
            </AnimatePresence>
          );
        })}

      </div>
    </div>
  );
}
