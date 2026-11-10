import React, { useState, useEffect, useRef } from 'react';

export const HomePage: React.FC = () => {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const touchStartY = useRef<number | null>(null);

  // Gentle initial entrance: smooth, luxurious floating speed
  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Natural gesture listener: wheel down or swipe up smoothly reveals the description
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 5) {
        setIsRevealed(true);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY.current !== null) {
        const diff = touchStartY.current - e.touches[0].clientY;
        if (diff > 10) {
          setIsRevealed(true);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const handleReveal = () => {
    setIsRevealed(true);
  };

  return (
    <div className="home-page min-h-[calc(100svh-74px)] sm:min-h-[calc(100svh-80px)] bg-white text-[#1d1d1f] font-sans selection:bg-[#f3eaff] selection:text-[#532b8e] w-full flex flex-col justify-center items-center px-5 sm:px-8 select-none relative overflow-x-hidden">
      <style>{`
        .lilac-apple-gradient {
          background: linear-gradient(90deg, #886eb0 0%, #9a82be 25%, #b098c7 50%, #c5a0c3 75%, #d1adca 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
          letter-spacing: -0.065em;
        }

        @keyframes chevronCascade {
          0%, 100% {
            opacity: 0.2;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(4px);
          }
        }

        .chevron-wave-1 {
          animation: chevronCascade 1.6s ease-in-out infinite;
          animation-delay: 0s;
        }

        .chevron-wave-2 {
          animation: chevronCascade 1.6s ease-in-out infinite;
          animation-delay: 0.22s;
        }

        .chevron-wave-3 {
          animation: chevronCascade 1.6s ease-in-out infinite;
          animation-delay: 0.44s;
        }
      `}</style>

      {/* Main hero container: perfectly centered in viewport with NO artificial extra scroll padding */}
      <div className="relative z-10 w-[min(92%,1140px)] mx-auto flex flex-col items-center justify-center text-center my-auto py-8">
        {/* Unified Logo Block: slow, graceful, floating initial entrance; stays stable without jumping */}
        <div
          className={`flex flex-col items-center justify-center text-center transition-all duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            heroLoaded
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-6 scale-[0.97]'
          }`}
          style={{ transformOrigin: 'center center' }}
        >
          <h1
            id="lab-title"
            className="wordmark text-[clamp(68px,11.8vw,146px)] font-black leading-[1.0] inline-flex items-baseline justify-center select-none m-0 cursor-default"
            aria-label="LILACS Lab"
          >
            <span className="lilac-apple-gradient">LILACS</span>
            <small className="text-[0.28em] font-bold text-[#1d1d1f] ml-2.5 sm:ml-3 tracking-[-0.02em] leading-none uppercase">
              lab
            </small>
          </h1>

          {/* Acronym subtitle */}
          <p className="text-[clamp(19px,2.1vw,26px)] text-[#33313b] font-medium tracking-tight leading-snug text-center mt-2 sm:mt-2.5 m-0">
            <span className="font-bold text-[#886eb0]">LI</span>teracy,{' '}
            <span className="font-bold text-[#9a82be]">LA</span>nguage, and{' '}
            <span className="font-bold text-[#b098c7]">C</span>ontent Learning in Education{' '}
            <span className="font-bold text-[#c5a0c3]">S</span>ciences.
          </p>
        </div>

        {/* Statement Block: Floats in smoothly on scroll or click without bouncing */}
        <div
          className={`w-full max-w-[840px] mx-auto mt-4 sm:mt-5 px-4 flex flex-col items-center justify-center text-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isRevealed
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-5 pointer-events-none'
          }`}
        >
          <p className="text-[16px] sm:text-[18px] lg:text-[19px] font-normal text-[#45424c] leading-[1.55] sm:leading-[1.6] text-center m-0 text-balance">
            At the LILACS lab (Literacy, Language, and Content learning in Education Sciences), directed by Dr. HyeJin Hwang at the University of Minnesota, we are driven to understand the intricate pathways through which young students build comprehension and knowledge. We seek to identify evidence-based strategies that better support student learning across all content areas.
          </p>
        </div>
      </div>

      {/* Downward Cascading Chevrons Prompt */}
      <button
        onClick={handleReveal}
        aria-label="Scroll down to explore"
        className={`absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer text-[#886eb0] transition-all duration-700 ease-out ${
          isRevealed
            ? 'opacity-0 pointer-events-none translate-y-3'
            : heroLoaded
            ? 'opacity-100 translate-y-0 hover:scale-105'
            : 'opacity-0 translate-y-2'
        }`}
      >
        <div className="flex flex-col items-center -space-y-1">
          <svg
            className="w-5 h-3 chevron-wave-1"
            viewBox="0 0 24 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 2L12 10L20 2" />
          </svg>
          <svg
            className="w-5 h-3 chevron-wave-2"
            viewBox="0 0 24 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 2L12 10L20 2" />
          </svg>
          <svg
            className="w-5 h-3 chevron-wave-3"
            viewBox="0 0 24 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 2L12 10L20 2" />
          </svg>
        </div>
      </button>
    </div>
  );
};
