import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LilacFlower } from './LilacLogo';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#f5f5f7] text-[#626269] border-t border-[#ebe9ee] mt-auto">
      {/* Reduced horizontal padding and widened max-w to ensure single-line acronym */}
      <div className="max-w-[1380px] w-full mx-auto px-4 sm:px-5 lg:px-6 py-4 sm:py-4.5">
        <div className="grid grid-cols-1 md:grid-cols-[1.45fr_1.15fr_1fr] gap-5 md:gap-8 lg:gap-10 items-start text-[13px] leading-[1.5]">
          {/* Col 1: Brand & Single-Line Expansion */}
          <div className="space-y-1.5">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-[9px] font-sans font-bold text-[#1d1d1f] tracking-[-0.05em] text-[17px] select-none whitespace-nowrap cursor-pointer transition-opacity hover:opacity-90"
              aria-label="LILACS Lab home"
            >
              <LilacFlower className="w-[30px] h-[30px]" />
              <span>
                <span>LILAC</span>
                <span className="text-[#1d1d1f]">S</span>
                <span className="font-medium tracking-normal text-[#626269] text-[13px] sm:text-[14px]">
                  {' '}LAB
                </span>
              </span>
            </button>

            {/* Guaranteed single line on desktop with md:whitespace-nowrap */}
            <p className="text-[#626269] text-xs sm:text-[13px] leading-relaxed md:whitespace-nowrap">
              <strong className="text-[#7542b3] font-bold">LI</strong>teracy,{' '}
              <strong className="text-[#7542b3] font-bold">LA</strong>nguage, and{' '}
              <strong className="text-[#7542b3] font-bold">C</strong>ontent Learning in Education{' '}
              <strong className="text-[#7542b3] font-bold">S</strong>ciences
            </p>
          </div>

          {/* Col 2: University of Minnesota */}
          <div className="space-y-1 text-xs sm:text-[13px] leading-relaxed">
            <p className="font-semibold text-stone-900">
              University of Minnesota
            </p>
            <p className="text-[#626269]">
              Department of Educational Psychology
              <br />
              250 Education Sciences Building, 56 East River Road, Minneapolis, MN 55455
            </p>
          </div>

          {/* Col 3: Contact information */}
          <div className="space-y-1 text-xs sm:text-[13px] leading-relaxed">
            <p className="font-semibold text-stone-900">
              Contact information
            </p>
            <p className="text-[#626269]">
              Lab director · HyeJin Hwang, Ph.D.
            </p>
            <p className="text-[#626269]">
              <a
                href="mailto:hwang305@umn.edu"
                className="hover:underline font-medium text-[#7542b3]"
              >
                hwang305@umn.edu <span className="text-[10px]" aria-hidden="true">↗</span>
              </a>{' '}
              ·{' '}
              <a
                href="https://edpsych.umn.edu/hyejin-hwang"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-stone-600 hover:text-stone-900"
              >
                University faculty profile <span className="text-[10px]" aria-hidden="true">↗</span>
              </a>
            </p>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-3.5 pt-3 border-t border-[#ebe9ee] text-[11px] sm:text-xs text-[#888490] flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>© 2026 LILACS Lab | Directed by Dr. HyeJin Hwang | All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};
