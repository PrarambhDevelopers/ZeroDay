import React from "react";

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-[#121212] text-white p-10 rounded-lg shadow-lg">
      <button className=" bg-[#50ff53] text-black font-bold py-2 px-4 rounded-lg shadow-md hover:bg-[#3ecf41] transition-transform transform hover:scale-105 neon-glow">
        🚀 Secure Your Spot – Limited Seats!
      </button>
      {/* Call to Action */}
      <button className="bg-[#50ff53] my-10 text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#3ac842] transition-transform transform hover:scale-105">
        Register Now
      </button>

      <h1 className="text-9xl uppercase my-5 font-bold">Register Register Register Register</h1>
      <h1 className="text-9xl uppercase my-5 font-bold">Now Now Now Now Now Now Now Now</h1>
      <h1 className="text-9xl uppercase my-5 font-bold">Limited Seats</h1>
    </div>
  );
};

export default Register;
