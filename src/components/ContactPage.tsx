import React from 'react';
import { Link } from 'react-router-dom';
import { LAB_INFO } from '../data/labData';

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100svh-80px)] bg-white text-[#1d1d1f] flex flex-col justify-center items-center py-12 sm:py-16 px-8 sm:px-14 md:px-20 lg:px-28 xl:px-36">
      {/* Centered container with spacious left/right margins */}
      <main className="w-full max-w-[820px] mx-auto flex flex-col justify-center space-y-8 sm:space-y-10">
        {/* Section Intro */}
        <div className="space-y-4">
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-[#7542b3] uppercase">
            Contact information
          </p>

          <h1 className="text-[clamp(34px,3.6vw,48px)] font-bold text-[#1d1d1f] tracking-tight leading-[1.08] m-0">
            Contact
          </h1>
          <p className="text-[17px] sm:text-[18px] text-[#45414b] leading-[1.6] m-0">
            Have questions about our research or interested in collaboration or joining us?
            <br />
            We would love to hear from you.
          </p>

          {/* Contact Facts: dl grid with Email & Location */}
          <div className="bg-[#faf9fc] rounded-2xl p-6 sm:p-7 border border-stone-200/80 mt-4">
            <dl className="grid grid-cols-[80px_minmax(0,1fr)] sm:grid-cols-[100px_minmax(0,1fr)] gap-x-4 gap-y-3 m-0">
              <dt className="text-[16px] text-[#76737c] font-medium leading-[1.4]">
                Email
              </dt>
              <dd className="m-0 text-[16px] leading-[1.4]">
                <a
                  href={`mailto:${LAB_INFO.email}`}
                  className="text-[#7542b3] font-semibold hover:underline"
                >
                  {LAB_INFO.email}
                </a>
              </dd>

              <dt className="text-[16px] text-[#76737c] font-medium leading-[1.4]">
                Location
              </dt>
              <dd className="m-0 text-[16px] text-[#1d1d1f] leading-[1.4]">
                250 Education Sciences Building
                <br />
                56 East River Road
                <br />
                Minneapolis, MN 55455
              </dd>
            </dl>
          </div>
        </div>

        {/* Prospective graduate students section */}
        <section className="pt-2 border-t border-stone-200/80 space-y-3">
          <h2 className="text-[clamp(22px,2vw,28px)] font-bold text-[#1d1d1f] tracking-tight m-0">
            Prospective graduate students
          </h2>

          <div className="space-y-3 text-[15px] sm:text-[16px] lg:text-[16.5px] text-[#45414b] leading-[1.5]">
            <p className="m-0 xl:whitespace-nowrap">
              More information on the graduate program in the Department of Educational Psychology can be found on the{' '}
              <span className="inline-block whitespace-nowrap">
                <a
                  href="https://edpsych.umn.edu/academics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7542b3] font-medium hover:underline inline-flex items-center gap-1"
                >
                  <span>department website</span>
                  <span className="text-xs font-semibold" aria-hidden="true">↗</span>
                </a>
                .
              </span>
            </p>

            <p className="m-0 text-[#45414b]">
              Dr. Hwang is affiliated with the Psychological Foundations of Education/Learning Technology (primary program) and Special Education (secondary program).
            </p>

            <p className="m-0 pt-1">
              <Link
                to="/team/hyejin-hwang#advising"
                className="text-[#7542b3] font-semibold hover:underline inline-flex items-center gap-1"
              >
                <span>See Dr. Hwang’s statements about advising and mentoring</span>
                <span className="text-sm" aria-hidden="true">↗</span>
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};
