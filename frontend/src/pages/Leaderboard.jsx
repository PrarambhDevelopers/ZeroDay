    import React, { useState, useEffect,useCallback  } from 'react';
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
    import { useAuth } from '../context/AuthContext';
    import axios from 'axios';
    const avatarImages = [luffy, zoro, nami, usopp, sanji, chopper, robin, franky, brook, jinbe];
    export default function Leaderboard() {
        const [leaderboardVisible, setLeaderboardVisible] = useState(true);
        const { token, user } = useAuth();
        const [warlocks, setWarlocks] = useState([]);
        const [prevRanks, setPrevRanks] = useState({});
    
        const formatTime = (time) => {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            return `${minutes}m ${seconds}s`;
        };

        const fetchVisibility = useCallback(async () => {
            try {
                const res = await axios.get('https://zeroday-7sa4.onrender.com/api/stage/');
                setLeaderboardVisible(res.data.leaderboard_visible);
                console.log('Leaderboard Visible:', res.data.leaderboard_visible);
            } catch (err) {
                console.error('Error fetching visibility:', err);
            }
        }, []);


    
    // Reusable leaderboard fetching
    const fetchLeaderboard = useCallback(async () => {
        try {
            // First check visibility
            await fetchVisibility();

            // If visible, fetch leaderboard
            if (leaderboardVisible) {
                const res = await axios.get('https://zeroday-7sa4.onrender.com/api/stage/leaderboard/overall', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const leaderboardData = res.data.map((player, index) => ({
                    id: player._id,
                    ctf_id: player.ctf_id,
                    name: player.name,
                    score: player.points,
                    time: player.time_duration,
                    avatar: player.avatar,
                }));

                setWarlocks(leaderboardData);

                const ranks = Object.fromEntries(leaderboardData.map((w, i) => [w.id, i]));
                setPrevRanks(ranks);
            }
        } catch (err) {
            console.error('Error fetching leaderboard:', err);
        }
    }, [token, leaderboardVisible, fetchVisibility]);
    
        const sortedWarlocks = [...warlocks].sort((a, b) => {
            if (b.score === a.score) return a.time - b.time;
            return b.score - a.score;
        });
    
        useEffect(() => {
            const ranks = Object.fromEntries(sortedWarlocks.map((w, i) => [w.id, i]));
            setPrevRanks(ranks);
        }, [warlocks]);
    

        const transitions = useTransition(sortedWarlocks, {
            keys: (warlock) => warlock.id,
            from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
            enter: { opacity: 1, transform: 'translate3d(0,0,0)' },
            update: (warlock) => {
                const prevRank = prevRanks[warlock.id] ?? 0;
                const newRank = sortedWarlocks.findIndex((w) => w.id === warlock.id);
                return { transform: `translate3d(0, ${(newRank - prevRank) * 80}px, 0)`, opacity: 1 };
            },
            leave: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
            config: { tension: 300, friction: 25 },
        });

        // const randomizeScores = () => {
        //     setWarlocks((prev) =>
        //         prev.map((warlock) => ({
        //             ...warlock,
        //             score: Math.floor(Math.random() * 5000),
        //             time: Math.floor(Math.random() * 2000),
        //         }))
        //     );
        // };

           // Manual Refresh Button Handler
    const refreshLeaderboard = () => {
        fetchLeaderboard();
    };

         // Initial fetch + auto interval
    useEffect(() => {
        fetchLeaderboard(); // Initial fetch

        const intervalId = setInterval(() => {
            fetchLeaderboard();
        }, 15000); // 15 seconds refresh

        return () => clearInterval(intervalId); // Cleanup
    }, [fetchLeaderboard]);

        const currentPlayer = { ctf_id: user?.ctf_id};

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
                {leaderboardVisible && (
                    <h1 className="text-4xl font-bold text-green-400 mb-6 drop-shadow-[0_0_10px_green]">Leaderboard</h1>
                )}
                {leaderboardVisible && (
                    <button
                        onClick={refreshLeaderboard}
                        className="mb-6 px-6 py-3 bg-gradient-to-r from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] text-green-300 border border-green-500/30 hover:bg-[#0d0d0d] rounded-lg shadow-md hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                        Refresh
                    </button>
                )}

                    <div className={` w-xl px-4 my-5 flex items-center justify-between py-2 gap-5 md:gap-8 rounded-lg transition-all duration-500
                            bg-gradient-to-br from-[#1a1a1a] via-[#0d0d0d] to-[#1a1a1a] border border-green-500/20 shadow-md hover:scale-[1.02] `}>
                                <div className="text-xl  w-[150px] font-semibold text-green-400 flex justify-start  items-center">
                                Rank
                            
                                {/* {console.log(warlock.avatar)} */}
                            </div>
                            <div className='w-[70%] flex flex-col items-start justify-start'>
                                <div className="text-lg font-semibold text-green-400 ">Hacker</div>
                                {/* <div className="text-sm font-semibold text-white"></div> */}
                            </div>
                            <div className="text-xl  w-[30%] font-semibold text-green-400">Points</div>
                            <div className="text-xl  font-semibold text-green-400">Time Taken</div>
                            </div>
                        

                {leaderboardVisible ? (
                    <div className="w-[600px] max-w-5xl flex justify-center items-center relative text-xs md:text-2xl" style={{ minHeight: `${sortedWarlocks.length * 120}px` }}>
                    
                        {transitions((style, warlock, t, index) => (
                            <animated.div
                                key={warlock.id}
                                style={{
                                    ...style,
                                    position: 'absolute',
                                    top: `${index * 120}px`,
                                    width: '90%', // Set the width to 90% for all cards
                                    maxWidth: '800px', // Set a max width for all cards
                                }}
                                className={`flex items-center justify-between p-5 gap-5 md:gap-8 rounded-lg transition-all duration-500
                                bg-gradient-to-br from-[#1a1a1a] via-[#0d0d0d] to-[#1a1a1a] border border-green-500/20 shadow-md hover:scale-[1.02] ${warlock.ctf_id === currentPlayer.ctf_id
                                        ? 'bg-gradient-to-br from-green-700/60 via-[#1a1a1a] to-green-800 border border-green-500/50 shadow-[0_0_20px_green]'
                                        : 'bg-gradient-to-br from-[#1a1a1a] via-[#0d0d0d] to-[#1a1a1a] border border-green-500/20 shadow-md hover:scale-[1.02]'
                                    }`}
                            >
                                <div className="text-xl gap-3 w-[150px] font-bold text-green-400 flex justify-center items-center">
                                    #{index }
                                    {/* {console.log(warlock.avatar)} */}
                                    <img src={avatarImages[warlock.avatar]} className="w-16 h-16 rounded-full border-2 border-green-500" alt="avatar" />
                                </div>
                                <div className='w-[70%] flex flex-col items-start justify-center'>
                                    <div className="text-lg font-semibold text-green-400">{warlock.name}</div>
                                    <div className="text-sm font-semibold text-white">{warlock.ctf_id}</div>
                                </div>
                                <div className="text-xl font-semibold text-green-400">{warlock.score}</div>
                                {/* {console.log(warlock.time)} */}
                                <div className="text-xl w-[35%] flex justify-end font-semibold text-green-400">{formatTime(warlock.time)}</div>
                            </animated.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-4xl font-bold text-green-400 mb-6 drop-shadow-[0_0_10px_green]">Leaderboard Hidden. Final Results Coming Soon... ⚔️</div>
                )}
            </div>
        );
    }
