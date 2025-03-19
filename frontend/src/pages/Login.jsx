import React from "react";

export default function Login() {

    const handleSubmit = (event) => {
        event.preventDefault();
        // Logic to handle login can be added here
        window.location.href = "/hackwars_dashboard";
    };
  return (
    <div className="flex flex-col items-center justify-center bg-[#121212] text-white p-10 rounded-lg shadow-lg min-h-[87vh] overflow-hidden">
      <h2 className="text-4xl font-bold text-[#50ff53] mb-6 text-center neon-text">
        Welcome Back, Cyber Warrior!
      </h2>
      <p className="text-lg text-gray-300 text-center max-w-xl mb-10 neon-text">
        Ready to hack your way in? Enter your credentials to continue your
        mission.
      </p>

      <form className="flex flex-col gap-6 bg-[#1a1a1a] p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-[#50ff53] mb-2 font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="zeroday@gmail.com"
            required
            className="px-4 py-3 rounded-lg bg-[#2c2c2c] text-white focus:outline-none focus:ring-2 focus:ring-[#50ff53]"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-[#50ff53] mb-2 font-semibold"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="* * * * * * * *"
            required
            className="px-4 py-3 rounded-lg bg-[#2c2c2c] text-white focus:outline-none focus:ring-2 focus:ring-[#50ff53]"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-gradient-to-r from-green-400 to-[#50ff53] text-black font-bold py-3 rounded-xl transition-all active:scale-95 hover:shadow-lg"
        >
          Enter Arena →
        </button>
      </form>

      <p className="mt-6 text-gray-400 text-center text-sm">
         Forgot your password? Reset mission credentials.
      </p>
    </div>
  );
}
