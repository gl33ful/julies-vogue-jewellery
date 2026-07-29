import { useEffect, useState } from "react";

export function Preloader() {
  const [animate, setAnimate] = useState(false);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const enter = setTimeout(() => setAnimate(true), 200);
    const leave = setTimeout(() => setExit(true), 1800);

    return () => {
      clearTimeout(enter);
      clearTimeout(leave);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#090909] flex items-center justify-center transition-all duration-700 ${
        exit ? "opacity-0 scale-110 pointer-events-none" : "opacity-100"
      }`}
    >
      <div
        className={`text-center transition-all duration-1000 ${
          animate
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <div className="text-champagne-400 text-xl mb-6 animate-pulse">
          ✦
        </div>

        <h1 className="font-serif text-5xl md:text-7xl tracking-[0.35em] text-champagne-400 shimmer">
          JULIES VOGUE
        </h1>

        <p className="mt-5 uppercase tracking-[0.4em] text-xs text-white/70">
          Fine Jewelry
        </p>

        <div className="mt-10 w-60 h-[2px] bg-white/10 mx-auto overflow-hidden rounded-full">
          <div className="loader-line h-full"></div>
        </div>

        <p className="mt-8 italic text-white/45 tracking-wide">
          Elegance Worn. Confidence Felt.
        </p>
      </div>
    </div>
  );
}