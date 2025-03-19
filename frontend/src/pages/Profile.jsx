import React, { useState } from 'react';
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
import { FaAngleLeft, FaSignOutAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

const avatars = [
  { name: 'Luffy', image: luffy },
  { name: 'Zoro', image: zoro },
  { name: 'Nami', image: nami },
  { name: 'Usopp', image: usopp },
  { name: 'Sanji', image: sanji },
  { name: 'Chopper', image: chopper },
  { name: 'Robin', image: robin },
  { name: 'Franky', image: franky },
  { name: 'Brook', image: brook },
  { name: 'Jinbe', image: jinbe },
];

export default function Profile() {
  const [profile, setProfile] = useState({
    name: 'Shreesh A Kajave',
    email: 'harsh2504patil@gmail.com',
    contact_no: '7030072080',
    ctf_id: 'Zero_103',
    avatar: '',
    theme: 'hacker',
  });

  const [themes] = useState([
    { name: 'Hacker Green', color: '#50FF53' },
    { name: 'Cyber Blue', color: '#00FFFF' },
    { name: 'Neon Purple', color: '#B10DC9' },
    { name: 'Matrix Rain', color: '#00FF00' },
    { name: 'Dark Mode Default', color: '#B0B0B0' },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleAvatarSelect = (avatarName) => {
    setProfile({ ...profile, avatar: avatarName });
  };

  const handleThemeSelect = (themeName) => {
    setProfile({ ...profile, theme: themeName });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] p-4 sm:p-10 text-[#E0E0E0] relative">

      {/* Back Button */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
        <Link to="/hackwars_dashboard" className="flex items-center gap-2 text-green-400 border border-transparent  hover:border-green-500 hover:text-green-300 bg-[#121212] hover:bg-[#1f1f1f] px-3 sm:px-4 py-2 rounded-lg shadow-lg active:scale-95 transition text-sm sm:text-base">
          <FaAngleLeft className="text-lg" />
          <span>Back</span>
        </Link>
      </div>

      {/* Logout Button */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
        <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 border border-transparent hover:border-red-500 hover:text-red-300 bg-[#121212] hover:bg-[#1f1f1f] px-3 sm:px-4 py-2 rounded-lg shadow-lg active:scale-95 transition text-sm sm:text-base">
          <span>Logout</span>
          <FaSignOutAlt className="text-lg" />
        </button>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#50FF53]">Edit Profile</h2>

      <div className="bg-[#1E1E1E] p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-3xl">
        <div className="mb-4">
          <label className="block text-sm mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-[#121212] text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-[#121212] text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Contact No</label>
          <input
            type="text"
            name="contact_no"
            value={profile.contact_no}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-[#121212] text-white"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Choose Avatar</h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
            {avatars.map((avatar) => (
              <img
                key={avatar.name}
                src={avatar.image}
                alt={avatar.name}
                className={`rounded-full w-16 h-16 sm:w-20 sm:h-20 cursor-pointer border-4 ${
                  profile.avatar === avatar.name ? 'border-[#50FF53]' : 'border-transparent'
                }`}
                onClick={() => handleAvatarSelect(avatar.name)}
              />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Choose Theme</h3>
          <div className="flex flex-wrap gap-4">
            {themes.map((theme) => (
              <div
                key={theme.name}
                className={`flex items-center justify-center p-2 sm:p-4 rounded-lg cursor-pointer text-center text-xs sm:text-base ${
                  profile.theme === theme.name ? 'ring-2 ring-[#50FF53]' : 'border border-[#B0B0B0]'
                }`}
                style={{ backgroundColor: '#1E1E1E', color: theme.color, minWidth: '100px' }}
                onClick={() => handleThemeSelect(theme.name)}
              >
                {theme.name}
              </div>
            ))}
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-green-400 to-[#50ff53] text-black font-bold py-2 px-4 rounded-xl transition-all duration-100 active:scale-95 hover:shadow-lg">Save Changes</button>
      </div>
    </div>
  );
}
