import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="bg-[#0f0f0f] text-gray-300 py-5 px-2 text-center border-t border-[# 00ff41]">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-6xl mx-auto">
        {/* Logo & Name  #50ff53*/}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Prarambh Development Cell" className="h-10 rounded-xl" />
            <div>
              <h2 className="text-lg font-semibold text-[#00ff41]">Prarambh Development Cell</h2>
              <p className="text-sm text-gray-400">Department of CSE</p>
            </div>
          </div>
        </div>

        {/* Copyright & Quote */}
        <div className="text-xs text-gray-400 text-center">
          <p>© 2025 Prarambh Development Cell – "Where Skills Meet Experience"</p>
          <p className="font-mono text-gray-500 mt-1">
            <span className="text-[#00ff41]">&gt;_</span> "Hack the system, before the system hacks you."
          </p>
        </div>

        {/* Social Media Links */}
        <div className="flex gap-4">
          <a href="#" className="hover:text-[#00ff41] transition-transform transform hover:scale-110">
            <FaFacebookF className="text-lg" />
          </a>
          <a href="#" className="hover:text-[#00ff41] transition-transform transform hover:scale-110">
            <FaTwitter className="text-lg" />
          </a>
          <a href="#" className="hover:text-[#00ff41] transition-transform transform hover:scale-110">
            <FaInstagram className="text-lg" />
          </a>
          <a href="#" className="hover:text-[#00ff41] transition-transform transform hover:scale-110">
            <FaLinkedinIn className="text-lg" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
