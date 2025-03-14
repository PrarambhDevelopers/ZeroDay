import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import cyberRealm from "./assets/day1.png";
import pingProbePwn from "./assets/day2.png";
import injectInfect from "./assets/day3.png";
import darkInsight from "./assets/day4.png";

gsap.registerPlugin(ScrollTrigger);

const days = [
  {
    title: "Cyber Realm",
    img: cyberRealm,
    bullets: [
      "Introduction to cybersecurity fundamentals.",
      "Understanding hacking mindset and ethics.",
      "Exploring common cyber threats.",
      "Overview of real-world hacking incidents.",
    ],
  },
  {
    title: "Ping, Probe & Pwn",
    img: pingProbePwn,
    bullets: [
      "Basics of network security & vulnerabilities.",
      "Performing reconnaissance and footprinting.",
      "Understanding network exploitation techniques.",
      "Identifying common misconfigurations and weaknesses.",
    ],
  },
  {
    title: "Inject & Infect",
    img: injectInfect,
    bullets: [
      "Deep dive into web security fundamentals.",
      "Understanding SQL injection attacks.",
      "How malware spreads & evasion techniques.",
      "Web security best practices.",
    ],
  },
  {
    title: "Dark Insight",
    img: darkInsight,
    bullets: [
      "Exploring the Dark Web and its implications.",
      "Understanding anonymity and privacy techniques.",
      "Introduction to ADB (Android Debug Bridge).",
      "Real-world case studies on cyber anonymity.",
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
          end: () => `+=2500px`,
          pin: true,
          scrub: 1,
        },
      });

      // Pin each section momentarily
      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: "left center",
          end: "+=80px", // Adjust to control how long it stays pinned
          pin: true,
          pinSpacing: false,
          scrub: 1,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black text-white overflow-hidden">
      <h2 className="absolute top-10 left-10 text-3xl font-bold text-[#00ff41]">Day-wise Breakdown</h2>

      {/* Horizontal Scroll Container */}
      <div ref={scrollContainerRef} className="flex w-max ">
        {days.map((day, index) => (
          <section
            key={index}
            className="day-section flex-shrink-0 w-screen h-[80vh] flex items-center p-10"
          >
            {/* Image on the Left */}
            <div className="w-1/2 flex justify-center">
              <img src={day.img} alt={day.title} className="w-80 h-80 object-contain" />
            </div>

            {/* Text on the Right */}
            <div className="w-1/2">
              <h3 className="text-4xl font-bold text-[#00ff41] mb-4">{day.title}</h3>
              <ul className="text-lg text-gray-300 space-y-3">
                {day.bullets.map((point, i) => (
                  <li key={i}>🔹 {point}</li>
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
