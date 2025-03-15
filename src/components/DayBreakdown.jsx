import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import cyberRealm from "../assets/day1.png";
import pingProbePwn from "../assets/day2.png";
import injectInfect from "../assets/day3.png";
import darkInsight from "../assets/day4.png";

gsap.registerPlugin(ScrollTrigger);

const days = [
  {
    title: "Cyber Realm",
    subtitle: "Unmasking the Digital Battlefield",
    img: cyberRealm,
    bullets: [
      "Uncover the importance of cybersecurity through real-world hacking incidents.",
      "Explore the different types of hackers and their motives—white hats, black hats, and everything in between!",
      "Get hands-on with Kali Linux and Virtual Machines to step into the hacker’s shoes.",
      "Master Google Dorking techniques to dig out sensitive information hidden in plain sight!",
    ],
  },
  {
    title: "Ping, Probe & Pwn",
    subtitle: "Cracking the Network Code",
    img: pingProbePwn,
    bullets: [
      "Break down IP & MAC addressing and dive into key networking protocols.",
      "Unravel network security essentials, including encryption and VPNs for secure communication.",
      "Understand the role of ports, services, and powerful tools like Nmap & Netcat.",
      "Live Action: Perform real-world port scanning and reconnaissance with Nmap, ping, and probe!",
    ],
  },
  {
    title: "Inject & Infect",
    subtitle: "Web Exploits in Action",
    img: injectInfect,
    bullets: [
      "Expose hidden vulnerabilities: IDOR, file upload exploits, and business logic flaws!",
      "Crack passwords like a pro using brute force techniques with Hydra.",
      "Manipulate minds: Learn how phishing and social engineering attacks work using PyPhisher.",
      "Hands-on Challenge: Simulate a phishing attack with the Social Engineering Toolkit (SEToolkit).",
    ],
  },
  {
    title: "Dark Insight",
    subtitle: "The Final Showdown",
    img: darkInsight,
    bullets: [
      "Step into the shadows: Explore the Dark Web and understand its real-world impact.",
      "Master ADB connections and uncover Android exploits for penetration testing.",
      "Compete in an adrenaline-pumping Capture The Flag (CTF) challenge!",
      "Rise to the top! Score high on the leaderboard and claim your victory certificates!",
    ],
  },
];




function DayBreakdown() {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".day-section");
      const totalWidth = scrollContainerRef.current.scrollWidth;

      // Smooth horizontal scroll
      gsap.to(scrollContainerRef.current, {
        x: () => `-${totalWidth - window.innerWidth}px`,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=3000px`,
          scrub: 2,
          pinSpacer: false,
          pin: true,
        },
      });

      // Pin each section momentarily
      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: "left center",
          end: "+=100px",
          pinSpacing: false,
          pin: true,

          scrub: 1,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.to(".floating", {
    y: 20,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut",
    duration: 2,
    });
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-black text-white overflow-x-hidden  py-10">
<h2 className="text-3xl md:text-6xl text-center font-extrabold text-[#50ff53] drop-shadow-lg tracking-wide"> Daily Hack Map</h2>


      {/* Horizontal Scroll Container */}
      <div ref={scrollContainerRef} className="flex w-max pb-10">
        {days.map((day, index) => (
          <section
            key={index}
            className="day-section flex-shrink-0 w-screen flex flex-col md:flex-row justify-center px-10"
          >
               <p className="text-transparent hidden md:block text-2xl md:text-8xl font-bold md:flex flex-col items-center " style={{ WebkitTextStroke: '5px #50ff67' }}>
            {`DAY ${index + 1}`.split("").map((char, i) => (
              <span key={i}>{char}</span>
            ))}</p>
               <p className="text-[#50ff53] text-4xl md:text-8xl font-bold flex flex-col items-center " >{`Day ${index+1}`} </p>
           { /* Image on the Top for Mobile, Left for Desktop */}
                  <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
                    <img src={day.img} alt={day.title} className="w-28 h-28 md:w-80 md:h-80 object-contain floating" />
                  </div>

                  {/* Text on the Bottom for Mobile, Right for Desktop */

                  /* Add floating animation */}
            <div className="w-full md:w-1/2 flex flex-col">
              <h3 className="text-2xl md:text-4xl font-bold text-[#00ff41] mb-2 text-center md:text-left">{day.title}</h3>
              <h4 className="text-lg md:text-2xl font-semibold text-gray-400 mb-4 text-center md:text-left">{day.subtitle}</h4>
              <ul className=" text-md md:text-lg text-gray-300 space-y-3">
                {day.bullets.map((point, i) => (
                  <li key={i} className="flex items-start justify-center md:justify-start">
                    <span className="text-[#00ff41] mr-2">🔹</span> {point}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default DayBreakdown;
