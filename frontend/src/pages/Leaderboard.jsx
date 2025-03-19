    import React, { useState, useEffect } from 'react';
    import { useTransition, animated } from '@react-spring/web';
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
    import MatrixBG from "../components/MatrixBG";
    import { Link } from 'react-router-dom';
    import { FaAngleLeft } from "react-icons/fa";

    export default function Leaderboard() {
        const [warlocks, setWarlocks] = useState([
            { name: 'Warlock1', score: 2200, time: 1620, icon: luffy },
            { name: 'Warlock2', score: 2000, time: 1500, icon: zoro },
            { name: 'Warlock3', score: 300, time: 1800, icon: nami },
            { name: 'Warlock4', score: 4222, time: 1400, icon: usopp },
            { name: 'Warlock5', score: 500, time: 1700, icon: sanji },
            { name: 'Warlock6', score: 600, time: 1600, icon: chopper },
            { name: 'Warlock7', score: 700, time: 1550, icon: robin },
            { name: 'Warlock8', score: 800, time: 1650, icon: franky },
            { name: 'Warlock9', score: 900, time: 1750, icon: brook },
            { name: 'Warlock10', score: 10000, time: 1450, icon: jinbe },
            { name: 'Warlock14', score: 4222, time: 1300, icon: luffy },
            { name: 'Warlock15', score: 500, time: 1250, icon: zoro },
            { name: 'Warlock16', score: 600, time: 1350, icon: nami },
            { name: 'Warlock17', score: 700, time: 1200, icon: usopp },
            { name: 'Warlock18', score: 800, time: 1150, icon: sanji },
            { name: 'Warlock19', score: 900, time: 1100, icon: chopper },
        ]);

        const formatTime = (time) => {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            return `${minutes}m ${seconds}s`;
        };

        const sortedWarlocks = [...warlocks].sort((a, b) => {
            if (b.score === a.score) {
                return a.time - b.time;
            }
            return b.score - a.score;
        });

        const [prevRanks, setPrevRanks] = useState(
            Object.fromEntries(sortedWarlocks.map((w, i) => [w.name, i]))
        );

        useEffect(() => {
            setPrevRanks(
                Object.fromEntries(sortedWarlocks.map((w, i) => [w.name, i]))
            );
        }, [warlocks]);

        const transitions = useTransition(sortedWarlocks, {
            keys: (warlock) => warlock.name,
            from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
            enter: { opacity: 1, transform: 'translate3d(0,0,0)' },
            update: (warlock) => {
                const prevRank = prevRanks[warlock.name] ?? 0;
                const newRank = sortedWarlocks.findIndex((w) => w.name === warlock.name);
                return { transform: `translate3d(0, ${(newRank - prevRank) * 80}px, 0)`, opacity: 1 };
            },
            leave: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
            config: { tension: 300, friction: 25 },
        });

        const randomizeScores = () => {
            setWarlocks((prev) =>
                prev.map((warlock) => ({
                    ...warlock,
                    score: Math.floor(Math.random() * 5000),
                    time: Math.floor(Math.random() * 2000),
                }))
            );
        };

        const currentPlayer = { name: 'Warlock10' };

        return (
            <div className="pt-20 pb-10 min-h-screen flex flex-col items-center bg-[#121212]/80 relative">
                <div className="fixed top-0 left-0 w-full h-full -z-10">
                    <MatrixBG />
                </div>

                {/* Back Button */}
                <div className="absolute top-6 left-6 z-20">
                    <Link to="/hackwars_dashboard" className="flex items-center gap-2 text-green-400 border border-transparent hover:border-green-500 hover:text-green-300 bg-[#121212] hover:bg-[#1f1f1f] px-4 py-2 rounded-lg shadow-lg active:scale-95 transition">
                        <FaAngleLeft className="text-lg" />
                        <span>Back</span>
                    </Link>
                </div>

                <h1 className="text-4xl font-bold text-green-400 mb-6 drop-shadow-[0_0_10px_green]">Leaderboard</h1>

                <button
                    onClick={randomizeScores}
                    className="mb-6 px-6 py-3 bg-gradient-to-r from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] text-green-300 border border-green-500/30 hover:bg-[#0d0d0d] rounded-lg shadow-md hover:scale-105 transition-all duration-300"
                >
                    Randomize Scores
                </button>

                <div className="w-xl max-w-5xl flex justify-center items-center relative text-xs md:text-2xl" style={{ minHeight: `${sortedWarlocks.length * 120}px` }}>
                    {transitions((style, warlock, t, index) => (
                        <animated.div
                            key={warlock.name}
                            style={{
                                ...style,
                                position: 'absolute',
                                
                                top: `${index * 120}px`,
                            }}
                            className={`flex items-center justify-between p-5 w-[90vw] md:w-auto gap-5 md:gap-20  rounded-lg transition-all duration-500
                            ${warlock.name === currentPlayer.name
                                    ? 'bg-gradient-to-br from-green-700/60 via-[#1a1a1a] to-green-800 border border-green-500/50 shadow-[0_0_20px_green]'
                                    : 'bg-gradient-to-br from-[#1a1a1a] via-[#0d0d0d] to-[#1a1a1a] border border-green-500/20 shadow-md hover:scale-[1.02]'
                                }`}
                        >
                            <div className="text-xl gap-3 font-bold text-green-400 flex items-center">
                                {index + 1}
                                <img src={warlock.icon} className="w-16 h-16 rounded-full border-2 border-green-500" />
                            </div>

                            <div className="text-xl font-semibold text-white">{warlock.name}</div>
                            <div className="text-xl font-semibold text-green-400">{warlock.score}</div>
                            <div className="text-xl font-semibold text-green-400">{formatTime(warlock.time)}</div>
                        </animated.div>
                    ))}
                </div>
            </div>
        );
    }
