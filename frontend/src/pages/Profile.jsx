import React, { useState, useEffect } from 'react';
import { FaAngleLeft, FaSignOutAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

// Avatar Images
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
import { useNavigate } from 'react-router-dom';
// Avatar Array
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
  const { user, updateUser, loading } = useAuth();
  const navigate = useNavigate();

  // Make sure AuthContext provides setUser
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    contact_no: user?.contact_no || '',
    ctf_id: user?.ctf_id || '',
    avatar: user?.avatar || 0,
  });

  // This will sync profile state when user context changes
useEffect(() => {
  if (user) {
    setProfile({
      name: user.name || '',
      email: user.email || '',
      contact_no: user.contact_no || '',
      ctf_id: user.ctf_id || '',
      avatar: user.avatar || 0,
    });
  }
}, [user]);

  const handleAvatarSelect = (index) => {
    setProfile({ ...profile, avatar: index });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Clear user from localStorage
    navigate('/');
  };

  const handleInputChange = (e) => {
    setProfile({ ...profile, name: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await axios.put(`http://localhost:3000/api/user/update/${profile.ctf_id}`, {
        avatar: profile.avatar,
        name: profile.name,
      });

      const updatedUser = { ...user, name: profile.name, avatar: profile.avatar };
      updateUser(updatedUser); // sync context
      alert("Profile updated successfully!");
      

    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] p-4 sm:p-10 text-[#E0E0E0] relative">

      {/* Back Button */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
        <Link to="/hackwars_dashboard" className="flex items-center gap-2 text-green-400 border border-transparent hover:border-green-500 hover:text-green-300 bg-[#121212] hover:bg-[#1f1f1f] px-3 sm:px-4 py-2 rounded-lg shadow-lg active:scale-95 transition text-sm sm:text-base">
          <FaAngleLeft className="text-lg" />
          <span>Back</span>
        </Link>
      </div>
      {loading && <div className="text-center text-white">Loading...</div>}
      {!loading && !user && <div className="text-center text-white">Unauthorized</div>}
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
            value={profile.name}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-[#121212] text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={profile.email}
            disabled
            className="w-full p-2 rounded bg-[#121212] text-white opacity-60 cursor-not-allowed"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Contact No</label>
          <input
            type="text"
            value={profile.contact_no}
            disabled
            className="w-full p-2 rounded bg-[#121212] text-white opacity-60 cursor-not-allowed"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Choose Avatar</h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
            {avatars.map((avatar, index) => (
              <img
                key={avatar.name}
                src={avatar.image}
                alt={avatar.name}
                className={`rounded-full w-16 h-16 sm:w-20 sm:h-20 cursor-pointer border-4 ${
                  profile.avatar == index ? 'border-[#50FF53]' : 'border-transparent'
                }`}
                onClick={() => {
                  handleAvatarSelect(index);
                }}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-gradient-to-r from-green-400 to-[#50ff53] text-black font-bold py-2 px-4 rounded-xl transition-all duration-100 active:scale-95 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
