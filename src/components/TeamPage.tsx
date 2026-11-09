import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import {
  TEAM_MEMBERS,
  COLLABORATING_LABS,
  ALUMNI_MEMBERS,
  COLLABORATORS,
} from '../data/labData';

export const TeamPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);

  const director = TEAM_MEMBERS.find((m) => m.category === 'pi')!;
  const coordinator = TEAM_MEMBERS.find((m) => m.category === 'coordinator')!;
  const phdStudents = TEAM_MEMBERS.filter((m) => m.category === 'phd');
  const masterStudents = TEAM_MEMBERS.filter((m) => m.category === 'master');

  const jianjian = masterStudents.find((m) => m.id === 'jianjian-wu') || masterStudents[0];
  const kiera = masterStudents.find((m) => m.id === 'kiera-rosenberg') || masterStudents[1];

  const navItems = [
    { label: 'HyeJin', id: 'sec-director' },
    { label: 'YooJeong', id: 'sec-coordinator' },
    ...phdStudents.map((m) => ({ label: m.name.split(' ')[0], id: `sec-${m.id}` })),
    { label: 'Jianjian', id: 'sec-jianjian' },
    { label: 'Kiera', id: 'sec-kiera' },
    { label: 'Collaborators', id: 'sec-collaborators' },
  ];

  const manualLockRef = useRef<number | null>(null);
  const manualTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const jianjianIdx = navItems.findIndex((n) => n.id === 'sec-jianjian');
  const kieraIdx = navItems.findIndex((n) => n.id === 'sec-kiera');

  // Accurate Scroll Spy matching visible section
  useEffect(() => {
    const handleScroll = () => {
      if (manualLockRef.current !== null) return;

      const targetPoint = window.innerHeight * 0.4;
      let matchedIdx = 0;

      for (let i = 0; i < navItems.length; i++) {
        const el = document.getElementById(navItems[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= targetPoint && rect.bottom >= targetPoint) {
            // Keep Kiera selected if user previously navigated/switched to Kiera within masters row
            if (i === jianjianIdx && activeSection === kieraIdx) {
              matchedIdx = kieraIdx;
            } else {
              matchedIdx = i;
            }
            break;
          }
        }
      }
      setActiveSection(matchedIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, jianjianIdx, kieraIdx]);

  const scrollToSection = (id: string, targetIdx?: number) => {
    if (typeof targetIdx === 'number') {
      setActiveSection(targetIdx);
      manualLockRef.current = targetIdx;
      if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
      manualTimeoutRef.current = setTimeout(() => {
        manualLockRef.current = null;
      }, 1400);
    }

    // Scroll to the masters section container when clicking Jianjian (or Kiera on desktop)
    // so the Master’s Students section header and top of the cards are never cut off
    let targetId = id;
    if (id === 'sec-jianjian') {
      targetId = 'sec-masters';
    } else if (id === 'sec-kiera' && typeof window !== 'undefined' && window.innerWidth >= 768) {
      targetId = 'sec-masters';
    }

    const element = document.getElementById(targetId);
    if (element) {
      // Offset for sticky navigation bar (approx 80px)
      const navOffset = 80;
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, elementTop - navOffset),
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative bg-[#faf9fc] text-stone-900 pb-16 lg:pb-6">
      {/* Desktop Floating Member Nav matching reference site (isolated in right 16vw gutter) */}
      <nav
        aria-label="Team members"
        className="fixed right-2 sm:right-3 xl:right-6 2xl:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-1 bg-white/95 backdrop-blur-md p-2 rounded-2xl border border-[#e8e4ec] shadow-[0_5px_18px_rgba(48,33,60,0.06)] w-[140px] xl:w-[152px]"
      >
        {navItems.map((item, idx) => {
          const isActive = activeSection === idx;
          return (
            <button
              key={idx}
              onClick={() => scrollToSection(item.id, idx)}
              aria-current={isActive}
              className={`flex items-center gap-2 text-xs transition-all cursor-pointer text-left px-2.5 py-1.5 rounded-xl ${
                isActive
                  ? 'bg-[#f1e7fa] text-[#7542b3] font-semibold'
                  : 'text-[#736e79] hover:text-stone-900 hover:bg-stone-50 font-normal'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full transition-all shrink-0 ${
                  isActive ? 'bg-[#7542b3] scale-110' : 'bg-[#d6d2d8]'
                }`}
              />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Mobile/Tablet Floating Member Nav matching reference site (@media(max-width:1099px)) */}
      <nav
        aria-label="Team members"
        className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 flex lg:hidden items-center gap-1 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-[#e8e4ec] shadow-[0_4px_20px_rgba(48,33,60,0.1)] max-w-[calc(100%-24px)] overflow-x-auto"
      >
        {navItems.map((item, idx) => {
          const isActive = activeSection === idx;
          return (
            <button
              key={idx}
              onClick={() => scrollToSection(item.id, idx)}
              aria-current={isActive}
              className={`px-2.5 py-1 text-xs whitespace-nowrap rounded-full transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#f1e7fa] text-[#7542b3] font-semibold'
                  : 'text-[#736e79] hover:text-stone-900 font-normal'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="space-y-0">
        {/* 1. Lab Director matching Reference Site */}
        <section
          id="sec-director"
          className="min-h-[calc(100vh-80px)] scroll-mt-20 flex flex-col justify-center py-5 sm:py-6 lg:py-8 px-4 sm:px-6 relative border-b border-stone-200/60"
        >
          <div className="w-[92%] lg:w-[74vw] xl:w-[68vw] max-w-[1140px] mx-auto space-y-3 sm:space-y-4">
            <div className="border-b border-stone-200 pb-2.5">
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                Lab Director
              </h2>
            </div>

            {/* Director Card with photo in original photo proportions on left */}
            <div className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-[clamp(270px,28vw,350px)_1fr] items-stretch">
              {/* Photo on left side: uncropped original with full natural margins in exact 413:531 proportion */}
              <div className="overflow-hidden flex items-center justify-center bg-[#b8adaa]/30">
                <img
                  src="./assets/aistudio/Hwang_headshot2_cb5308ac.jpg"
                  alt={director.name}
                  className="w-full h-full object-contain aspect-[413/531] max-h-[520px]"
                />
              </div>

              {/* Info on right side */}
              <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div>
                    <span className="text-xs sm:text-sm text-[#7542b3] font-semibold block mb-1">
                      Lab director · Assistant Professor
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-stone-900 tracking-tight leading-tight">
                      HyeJin Hwang, Ph.D.
                    </h3>
                    <p className="text-sm sm:text-base text-stone-600 mt-1 font-normal">
                      Department of Educational Psychology · University of Minnesota
                    </p>
                  </div>

                  <blockquote className="italic text-base sm:text-lg lg:text-xl text-stone-800 leading-relaxed pt-2 font-normal">
                    “{director.oneSentence}”
                  </blockquote>
                </div>

                {/* Footer links */}
                <div className="pt-4 border-t border-stone-200/80 flex items-center gap-6 text-sm sm:text-base">
                  <button
                    onClick={() => navigate(`/team/${director.id}`)}
                    className="inline-flex items-center gap-1.5 font-semibold text-[#7542b3] hover:underline cursor-pointer"
                  >
                    <span>Meet HyeJin</span>
                    <span className="text-sm" aria-hidden="true">↗</span>
                  </button>

                  <a
                    href="https://cehd.umn.edu/people/hwang305"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-900 font-normal hover:underline"
                  >
                    <span>Faculty profile</span>
                    <span className="text-sm" aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Next Member Arrow matching reference site */}
            <div className="flex justify-center pt-2">
              <button
                onClick={() => scrollToSection('sec-coordinator')}
                className="flex items-center justify-center min-h-[32px] text-[28px] leading-none text-[#9b96a1] hover:text-[#7542b3] transition-colors cursor-pointer select-none"
                aria-label="Next: YooJeong"
              >
                <span aria-hidden="true">⌄</span>
              </button>
            </div>
          </div>
        </section>

        {/* 2. Lab Coordinator (YooJeong Son) */}
        <section
          id="sec-coordinator"
          className="min-h-[calc(100vh-80px)] scroll-mt-20 flex flex-col justify-center py-5 sm:py-6 lg:py-8 px-4 sm:px-6 relative border-b border-stone-200/60"
        >
          <div className="w-[92%] lg:w-[74vw] xl:w-[68vw] max-w-[1140px] mx-auto space-y-3 sm:space-y-4">
            <div className="border-b border-stone-200 pb-2.5">
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                Lab Coordinator
              </h2>
            </div>

            <div className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-[41.7%_1fr]">
              <div className="bg-stone-50 overflow-hidden flex items-center justify-center">
                <img
                  src="./assets/aistudio/yoojeong-son.webp"
                  alt={coordinator.name}
                  className="w-full h-full object-cover object-[35%_35%] min-h-[280px] lg:h-[48svh] lg:max-h-[500px]"
                />
              </div>

              <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div>
                    <span className="text-xs sm:text-sm text-[#7542b3] font-semibold block mb-1">
                      Lab coordinator · Ph.D. student
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-stone-900 tracking-tight leading-tight">
                      {coordinator.name}
                    </h3>
                    <p className="text-sm sm:text-base text-stone-600 mt-1 font-normal">
                      Department of Educational Psychology · University of Minnesota
                    </p>
                  </div>

                  <blockquote className="italic text-base sm:text-lg lg:text-xl text-stone-800 leading-relaxed pt-2 font-normal">
                    “{coordinator.oneSentence}”
                  </blockquote>
                </div>

                <div className="pt-4 border-t border-stone-200/80 flex items-center gap-6 text-sm sm:text-base">
                  <button
                    onClick={() => navigate(`/team/${coordinator.id}`)}
                    className="inline-flex items-center gap-1.5 font-semibold text-[#7542b3] hover:underline cursor-pointer"
                  >
                    <span>Meet YooJeong</span>
                    <span className="text-sm" aria-hidden="true">↗</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Next Member Arrow */}
            <div className="flex justify-center pt-2">
              <button
                onClick={() => scrollToSection('sec-yulu-sun')}
                className="flex items-center justify-center min-h-[32px] text-[28px] leading-none text-[#9b96a1] hover:text-[#7542b3] transition-colors cursor-pointer select-none"
                aria-label="Next: Yulu"
              >
                <span aria-hidden="true">⌄</span>
              </button>
            </div>
          </div>
        </section>

        {/* 3. Ph.D. student (Yulu Sun) */}
        {phdStudents.map((member) => (
          <section
            key={member.id}
            id={`sec-${member.id}`}
            className="min-h-[calc(100vh-80px)] scroll-mt-20 flex flex-col justify-center py-5 sm:py-6 lg:py-8 px-4 sm:px-6 relative border-b border-stone-200/60"
          >
            <div className="w-[92%] lg:w-[74vw] xl:w-[68vw] max-w-[1140px] mx-auto space-y-3 sm:space-y-4">
              <div className="border-b border-stone-200 pb-2.5">
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                  Ph.D. Student
                </h2>
              </div>

              <div className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-[41.7%_1fr]">
                <div className="bg-stone-50 overflow-hidden flex items-center justify-center">
                  <img
                    src={member.cardPhoto || member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover object-[center_35%] min-h-[280px] lg:h-[48svh] lg:max-h-[500px]"
                  />
                </div>

                <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs sm:text-sm text-[#7542b3] font-semibold block mb-1">
                        Ph.D. student
                      </span>
                      <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-stone-900 tracking-tight leading-tight">
                        {member.name}
                      </h3>
                      <p className="text-sm sm:text-base text-stone-600 mt-1 font-normal">
                        Department of Educational Psychology · University of Minnesota
                      </p>
                    </div>

                    <blockquote className="italic text-base sm:text-lg lg:text-xl text-stone-800 leading-relaxed pt-2 font-normal">
                      “{member.oneSentence}”
                    </blockquote>
                  </div>

                  <div className="pt-4 border-t border-stone-200/80 flex items-center gap-6 text-sm sm:text-base">
                    <button
                      onClick={() => navigate(`/team/${member.id}`)}
                      className="inline-flex items-center gap-1.5 font-semibold text-[#7542b3] hover:underline cursor-pointer"
                    >
                      <span>Meet {member.name.split(' ')[0]}</span>
                      <span className="text-sm" aria-hidden="true">↗</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Next Member Arrow */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={() => scrollToSection('sec-masters')}
                  className="flex items-center justify-center min-h-[32px] text-[28px] leading-none text-[#9b96a1] hover:text-[#7542b3] transition-colors cursor-pointer select-none"
                  aria-label="Next: Master’s Students"
                >
                  <span aria-hidden="true">⌄</span>
                </button>
              </div>
            </div>
          </section>
        ))}

        {/* 4. Master’s students: 1 row, 2 columns - fits comfortably within one screen without over-cropping */}
        <section
          id="sec-masters"
          className="min-h-[calc(100vh-80px)] scroll-mt-20 flex flex-col justify-center py-4 sm:py-5 px-4 sm:px-6 relative border-b border-stone-200/60"
        >
          <div className="w-[92%] lg:w-[74vw] xl:w-[68vw] max-w-[1140px] mx-auto space-y-3 sm:space-y-3.5">
            <div className="border-b border-stone-200 pb-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                Master’s Students
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              {/* Jianjian Wu */}
              <div
                id="sec-jianjian"
                className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-xs flex flex-col"
              >
                <div className="bg-[#f8f6fa] overflow-hidden shrink-0 aspect-[16/10] max-h-[210px] sm:max-h-[230px]">
                  <img
                    src={jianjian.cardPhoto || jianjian.photo}
                    alt={jianjian.name}
                    className="w-full h-full object-cover object-[center_44%]"
                  />
                </div>
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <span className="text-xs sm:text-sm text-[#7542b3] font-semibold block">
                      Master’s student
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-stone-900 tracking-tight leading-tight">
                      {jianjian.name}
                    </h3>
                    <blockquote className="italic text-base sm:text-lg lg:text-xl text-stone-800 leading-relaxed font-normal">
                      “{jianjian.oneSentence}”
                    </blockquote>
                  </div>
                  <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between text-sm sm:text-base">
                    <button
                      onClick={() => navigate(`/team/${jianjian.id}`)}
                      className="inline-flex items-center gap-1 font-semibold text-[#7542b3] hover:underline cursor-pointer"
                    >
                      <span>Meet Jianjian</span>
                      <span className="text-sm" aria-hidden="true">↗</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Kiera Rosenberg */}
              <div
                id="sec-kiera"
                className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-xs flex flex-col"
              >
                <div className="bg-[#f8f6fa] overflow-hidden shrink-0 aspect-[16/10] max-h-[210px] sm:max-h-[230px]">
                  <img
                    src={kiera.cardPhoto || kiera.photo}
                    alt={kiera.name}
                    className="w-full h-full object-cover object-[center_36%]"
                  />
                </div>
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <span className="text-xs sm:text-sm text-[#7542b3] font-semibold block">
                      Master’s student
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-stone-900 tracking-tight leading-tight">
                      {kiera.name}
                    </h3>
                    <blockquote className="italic text-base sm:text-lg lg:text-xl text-stone-800 leading-relaxed font-normal">
                      “{kiera.oneSentence}”
                    </blockquote>
                  </div>
                  <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between text-sm sm:text-base">
                    <button
                      onClick={() => navigate(`/team/${kiera.id}`)}
                      className="inline-flex items-center gap-1 font-semibold text-[#7542b3] hover:underline cursor-pointer"
                    >
                      <span>Meet Kiera</span>
                      <span className="text-sm" aria-hidden="true">↗</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Member Arrow */}
            <div className="flex justify-center pt-1.5">
              <button
                onClick={() => scrollToSection('sec-collaborators')}
                className="flex items-center justify-center min-h-[28px] text-[24px] leading-none text-[#9b96a1] hover:text-[#7542b3] transition-colors cursor-pointer select-none"
                aria-label="Next: Collaborating labs & scholars"
              >
                <span aria-hidden="true">⌄</span>
              </button>
            </div>
          </div>
        </section>

        {/* 5. Collaborating labs at UMN & Alumni & Collaborators */}
        <section
          id="sec-collaborators"
          className="min-h-[calc(100vh-80px)] scroll-mt-20 flex flex-col justify-center py-8 lg:py-12 px-4 sm:px-6 relative bg-white"
        >
          <div className="w-[92%] lg:w-[74vw] xl:w-[68vw] max-w-[1140px] mx-auto space-y-8">
            <div className="border-b border-stone-200 pb-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                Collaborating Labs & Scholars
              </h2>
            </div>

            {/* Collaborating Labs at UMN */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-stone-800">
                Collaborating labs at UMN
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {COLLABORATING_LABS.map((lab, idx) => (
                  <div
                    key={idx}
                    className="bg-[#fbfbfd] p-6 rounded-2xl border border-stone-200/80 space-y-2 shadow-xs"
                  >
                    <div className="flex items-start gap-2.5">
                      <Building2 className="w-5 h-5 text-[#9174bc] shrink-0 mt-0.5" />
                      <h4 className="font-bold text-base text-stone-900 leading-snug">
                        {lab.link ? (
                          <a
                            href={lab.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#7542b3] transition-colors hover:underline block"
                          >
                            <span className="inline-flex items-center gap-1">
                              <span>{lab.name}</span>
                              <span className="text-xs font-normal" aria-hidden="true">↗</span>
                            </span>
                            {lab.subName && (
                              <span className="block text-[13.5px] font-medium text-stone-600 mt-0.5">
                                {lab.subName}
                              </span>
                            )}
                          </a>
                        ) : (
                          <div>
                            <span>{lab.name}</span>
                            {lab.subName && (
                              <span className="block text-[13.5px] font-medium text-stone-600 mt-0.5">
                                {lab.subName}
                              </span>
                            )}
                          </div>
                        )}
                      </h4>
                    </div>
                    <p className="text-sm text-stone-800 font-medium">
                      {lab.directorOrCoord}
                    </p>
                    <p className="text-xs text-stone-500">
                      {lab.affiliation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Alumni & Collaborators matching reference site exactly */}
            <div className="pt-6 border-t border-stone-200 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                Alumni & Collaborators
              </h2>

              {/* Alumni Subsection */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-stone-900">
                  Alumni
                </h3>
                <ul className="space-y-2.5 text-base sm:text-[17px] text-stone-800 leading-relaxed pl-5 list-disc">
                  {ALUMNI_MEMBERS.map((alumnus, idx) => (
                    <li key={idx} className="pl-1">
                      {alumnus.link ? (
                        <a
                          href={alumnus.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-stone-900 underline underline-offset-3 hover:text-[#9174bc] transition-colors"
                        >
                          {alumnus.name}
                        </a>
                      ) : (
                        <span>{alumnus.name}</span>
                      )}
                      {alumnus.title && ` – ${alumnus.title}`}
                      {alumnus.affiliation && ` at ${alumnus.affiliation}`}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Collaborators Subsection */}
              <div className="space-y-3 pt-4">
                <h3 className="text-xl font-bold text-stone-900">
                  Collaborators
                </h3>
                <ul className="space-y-2.5 text-base sm:text-[17px] text-stone-800 leading-relaxed pl-5 list-disc">
                  {COLLABORATORS.map((collab, idx) => (
                    <li key={idx} className="pl-1">
                      {collab.link ? (
                        <a
                          href={collab.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-stone-900 underline underline-offset-3 hover:text-[#9174bc] transition-colors"
                        >
                          {collab.name}
                        </a>
                      ) : (
                        <span>{collab.name}</span>
                      )}
                      {collab.title && collab.affiliation
                        ? ` – ${collab.title}, ${collab.affiliation}`
                        : collab.affiliation
                        ? ` – ${collab.affiliation}`
                        : collab.title
                        ? ` – ${collab.title}`
                        : ''}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
