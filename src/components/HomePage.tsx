import React, { useState, useEffect } from 'react';

const SCROLL_THRESHOLD = 140; // Single scroll stroke distance

export const HomePage: React.FC = () => {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasRevealed, setHasRevealed] = useState(false);

  // Trigger Apple-style floating typography entrance immediately on mount (matching research projects page)
  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroLoaded(true);
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          if (currentY > 20) {
            setHasRevealed(true);
          }
          const progress = Math.min(1, Math.max(0, currentY / SCROLL_THRESHOLD));
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Snappy single wheel listener: assists initial single scroll down to reveal state
  useEffect(() => {
    let isWheeling = false;

    const handleWheel = (e: WheelEvent) => {
      if (isWheeling || hasRevealed) return;

      const currentY = window.scrollY;
      // When at top and wheeling down once, snap smoothly to reveal state with footer
      if (currentY < SCROLL_THRESHOLD && e.deltaY > 10) {
        isWheeling = true;
        setHasRevealed(true);
        window.scrollTo({ top: SCROLL_THRESHOLD, behavior: 'smooth' });
        setTimeout(() => {
          isWheeling = false;
        }, 400);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [hasRevealed]);

  // Once revealed, keep description permanently visible even if user scrolls back up
  const descOpacity = hasRevealed ? 1 : scrollProgress;
  const logoTranslateY = hasRevealed ? -18 : (1 - scrollProgress) * 36 - scrollProgress * 18;
  const logoScale = hasRevealed ? 0.90 : 1 - scrollProgress * 0.10;
  const descTranslateY = hasRevealed ? 0 : (1 - scrollProgress) * 12;

  return (
    <div className="home-page min-h-[calc(100svh+140px)] bg-white text-[#1d1d1f] font-sans selection:bg-[#f3eaff] selection:text-[#532b8e] w-full flex flex-col justify-start items-center px-5 sm:px-8 select-none">
      <style>{`
        .lilac-apple-gradient {
          background: linear-gradient(90deg, #886eb0 0%, #9a82be 25%, #b098c7 50%, #c5a0c3 75%, #d1adca 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
          letter-spacing: -0.065em;
        }
      `}</style>

      {/* Main hero viewport container */}
      <div className="sticky top-0 w-full min-h-[calc(100svh-74px)] sm:min-h-[calc(100svh-80px)] flex flex-col items-center justify-center text-center">
        <div className="relative z-10 w-full max-w-[1060px] mx-auto flex flex-col items-center justify-center text-center my-auto">
          {/* Unified Logo Block: floats up smoothly on initial load (matching research projects transition) */}
          <div
            className={`flex flex-col items-center justify-center text-center transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              heroLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transform: heroLoaded
                ? `translate3d(0, ${logoTranslateY}px, 0) scale(${logoScale})`
                : 'translate3d(0, 32px, 0) scale(0.96)',
              transformOrigin: 'center center',
            }}
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

          {/* Statement Block: Reveals smoothly on scroll and remains permanently once revealed */}
          <div
            className="w-full max-w-[840px] mx-auto mt-2.5 sm:mt-3.5 px-4 flex flex-col items-center justify-center text-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: descOpacity,
              transform: `translate3d(0, ${descTranslateY}px, 0)`,
              pointerEvents: hasRevealed || scrollProgress > 0.4 ? 'auto' : 'none',
            }}
          >
            <p className="text-[16px] sm:text-[18px] lg:text-[19px] font-normal text-[#45424c] leading-[1.55] sm:leading-[1.6] text-center m-0 text-balance">
              At the LILACS lab (Literacy, Language, and Content learning in Education Sciences), directed by Dr. HyeJin Hwang at the University of Minnesota, we are driven to understand the intricate pathways through which young students build comprehension and knowledge. We seek to identify evidence-based strategies that better support student learning across all content areas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
