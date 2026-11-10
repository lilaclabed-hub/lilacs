import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const [showScrollCue, setShowScrollCue] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide scroll cue when user scrolls down
      if (window.scrollY > 100) {
        setShowScrollCue(false);
      } else {
        setShowScrollCue(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPrinciples = () => {
    const el = document.getElementById('guiding-principles');
    if (el) {
      const topOffset = 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <style>{`
        /* EXACT REFERENCE STYLES FROM https://lilac-lab.fancy-luck-4584.chatgpt.site/about/ */
        .ref-about-main {
          width: min(1280px, calc(100% - 96px));
          margin-inline: auto;
          box-sizing: border-box;
        }
        @media (max-width: 1100px) {
          .ref-about-main {
            width: calc(100% - 64px);
          }
        }
        @media (max-width: 760px) {
          .ref-about-main {
            width: calc(100% - 40px);
          }
        }

        .ref-about-main .about-document {
          max-width: 1200px;
          margin: 0 auto;
        }

        .ref-about-main .about-intro {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.22fr);
          gap: 14px clamp(22px, 3vw, 46px);
          min-height: calc(100svh - 76px - 38px);
          box-sizing: border-box;
          padding-block: clamp(12px, 3vh, 30px);
          padding-bottom: 48px;
          align-content: center;
        }

        .ref-about-main .about-intro > .eyebrow,
        .ref-about-main .about-intro > h1,
        .ref-about-main .about-document > section {
          grid-column: 1 / -1;
          margin-block: 0;
        }

        .ref-about-main .about-intro > .eyebrow {
          font-size: 14.5px;
          color: #8e75ad;
          margin: 0 0 6px;
          font-weight: 400;
          letter-spacing: 0.01em;
          text-transform: none;
        }

        .ref-about-main .about-intro > h1 {
          font-size: clamp(34px, 3.6vw, 48px);
          margin: 0 0 8px;
          line-height: 1.08;
          font-weight: 700;
          letter-spacing: -0.04em;
          color: #1d1d1f;
        }

        .ref-about-main .about-intro > .pdf-list {
          font-size: clamp(17.3px, 1.4vw, 19.5px);
          line-height: 1.52;
          margin: 0;
          padding-left: 23px;
          list-style: disc outside;
        }

        .ref-about-main .about-intro > .pdf-list li {
          padding-left: 3px;
          margin: 18px 0;
          color: #2b2b30;
        }

        .ref-about-main .about-intro > .pdf-list li:first-child {
          margin-top: 0;
        }

        .ref-about-main .about-intro > .pdf-list li:last-child {
          margin-bottom: 0;
        }

        .ref-about-main .about-intro > .pdf-list li::marker {
          color: #a6a6ad;
        }

        .ref-about-main .about-intro > .pdf-list strong {
          font-weight: 700;
          color: #1d1d1f;
        }

        .ref-about-main .about-intro .pdf-group-photo {
          margin: 0;
        }

        .ref-about-main .about-intro .pdf-group-photo img {
          display: block;
          width: 100%;
          height: auto;
          max-height: 56svh;
          object-fit: contain;
          border-radius: 14px;
        }

        .ref-about-main .about-intro .pdf-group-photo figcaption {
          font-size: 14px;
          color: #686870;
          margin-top: 6px;
        }

        /* Guiding Principles */
        .ref-about-main .principles {
          box-sizing: border-box;
          scroll-margin-top: 100px;
          padding: clamp(32px, 6vh, 64px) 0 96px;
          margin-inline: auto !important;
          max-width: 1140px;
          width: min(92%, 1140px);
        }


        @media (max-width: 650px) {
          .ref-about-main .about-intro {
            grid-template-columns: minmax(0, 1fr);
            gap: 6px;
            padding-block: 8px;
          }
          .ref-about-main .about-intro .pdf-group-photo img {
            max-height: 24svh;
          }
        }
      `}</style>

      <main id="main" className="ref-about-main">
        <div className="pdf-document about-document">
          {/* Section 1: About Intro (What We Do) */}
          <div className="about-intro">
            <p className="eyebrow text-[14px] sm:text-[15px] font-normal text-[#8e75ad] tracking-normal mb-1.5">
              Learn more about the lab
            </p>
            <h1>What We Do:</h1>

            <ul className="pdf-list">
              <li>
                The Literacy, Language, and Content Learning in Education Sciences
                (LILACS) Lab investigates{' '}
                <strong>
                  how K–12 students learn through engagement with various types of
                  texts
                </strong>
                —across genres and modalities—and leverages these research
                findings to{' '}
                <strong>
                  design and evaluate effective instructional strategies and
                  educational technologies.
                </strong>
              </li>
              <li>
                Our current research particularly focuses on multilingual elementary
                students’ language and reading comprehension as well as their
                science and social studies knowledge development.
              </li>
              <li>
                We collaborate closely with teachers and students in schools and are
                dedicated to bridging the gap between research and educational
                practice and policy.
              </li>
            </ul>

            <figure className="pdf-group-photo">
              <img
                src="./assets/aistudio/lab-group.webp"
                alt="LILACS Lab team, fall 2026"
                loading="lazy"
                decoding="async"
              />
              <figcaption>2026 Fall</figcaption>
            </figure>
          </div>

          {/* Section 2: Guiding Principles for Our Work */}
          <section id="guiding-principles" className="principles w-[min(92%,1140px)] mx-auto min-h-[calc(100svh-120px)] flex flex-col justify-center">
            <div className="border-b border-stone-200 pb-3 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                Guiding Principles for Our Work:
              </h2>
            </div>

            <div className="space-y-6 sm:space-y-8 w-full">
              {/* Item 01 */}
              <div className="border-b border-stone-200/70 pb-6 sm:pb-7 flex flex-col sm:flex-row sm:items-baseline gap-2.5 sm:gap-6">
                <span className="font-mono text-sm sm:text-base font-bold text-[#9174bc] shrink-0">
                  01
                </span>
                <div className="space-y-1.5 flex-1">
                  <h3 className="text-lg sm:text-[19px] font-bold text-stone-900 leading-snug">
                    We view reading comprehension as both processes and products.
                  </h3>
                  <p className="text-base sm:text-[17px] text-stone-700 leading-relaxed font-normal">
                    We investigate not only the final outcome of what students comprehend, but also the active, cognitive strategies they employ while engaging with various texts.
                  </p>
                </div>
              </div>

              {/* Item 02 */}
              <div className="border-b border-stone-200/70 pb-6 sm:pb-7 flex flex-col sm:flex-row sm:items-baseline gap-2.5 sm:gap-6">
                <span className="font-mono text-sm sm:text-base font-bold text-[#9174bc] shrink-0">
                  02
                </span>
                <div className="space-y-1.5 flex-1">
                  <h3 className="text-lg sm:text-[19px] font-bold text-stone-900 leading-snug">
                    We believe reading is a fundamental vehicle for learning and growth.
                  </h3>
                  <p className="text-base sm:text-[17px] text-stone-700 leading-relaxed font-normal">
                    For example, by interacting with text, students can learn about the natural and social worlds and build epistemological virtues (e.g., intellectual humility).
                  </p>
                </div>
              </div>

              {/* Item 03 */}
              <div className="border-b border-stone-200/70 pb-6 sm:pb-7 flex flex-col sm:flex-row sm:items-baseline gap-2.5 sm:gap-6">
                <span className="font-mono text-sm sm:text-base font-bold text-[#9174bc] shrink-0">
                  03
                </span>
                <div className="space-y-1.5 flex-1">
                  <h3 className="text-lg sm:text-[19px] font-bold text-stone-900 leading-snug">
                    We hold an asset-oriented view of multilingualism.
                  </h3>
                  <p className="text-base sm:text-[17px] text-stone-700 leading-relaxed font-normal">
                    We view students’ home languages and cultural backgrounds as powerful resources that enhance learning.
                  </p>
                </div>
              </div>

              {/* Item 04 */}
              <div className="pb-6 sm:pb-7 flex flex-col sm:flex-row sm:items-baseline gap-2.5 sm:gap-6">
                <span className="font-mono text-sm sm:text-base font-bold text-[#9174bc] shrink-0">
                  04
                </span>
                <div className="space-y-1.5 flex-1">
                  <h3 className="text-lg sm:text-[19px] font-bold text-stone-900 leading-snug">
                    We are committed to interdisciplinary research.
                  </h3>
                  <p className="text-base sm:text-[17px] text-stone-700 leading-relaxed font-normal">
                    Housed in educational psychology and special education, we actively bridge insights from various disciplines such as cognitive psychology and learning sciences.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Floating scroll cue chevron matching Explore research projects page */}
        <div
          className={`fixed bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-30 transition-all duration-300 ease-out ${
            showScrollCue
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 pointer-events-none translate-y-2'
          }`}
        >
          <button
            type="button"
            onClick={scrollToPrinciples}
            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-stone-200/90 bg-white hover:border-[#7542b3]/40 hover:bg-[#f1e7fa]/40 text-[#736e79] hover:text-[#7542b3] transition-all cursor-pointer select-none group shadow-2xs"
            aria-label="Scroll down to Guiding Principles"
            title="Guiding Principles"
          >
            <ChevronDown className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      </main>
    </>
  );
};
