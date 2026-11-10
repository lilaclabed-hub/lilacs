import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Pause, Play, ArrowRight, ChevronDown } from 'lucide-react';
import { RESEARCH_PROJECTS } from '../data/labData';

const SLIDESHOW_IMAGES = [
  {
    src: './assets/project_photo/web/DSC04892.jpg',
    alt: 'Reading material displayed on a tablet',
  },
  {
    src: './assets/project_photo/web/3_project-1.jpg',
    alt: 'A researcher visits students at their desks',
  },
  {
    src: './assets/project_photo/web/DSC04788.jpg',
    alt: 'A small group discusses material displayed on a laptop',
  },
  {
    src: './assets/project_photo/web/DSC04853.jpg',
    alt: 'A researcher works alongside a student in the classroom',
  },
];

type ProjectFilter = 'all' | 'developmental' | 'instructional';

export const ResearchPage: React.FC = () => {
  const location = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');
  
  // Apple-style typography float transitions
  const [heroVisible, setHeroVisible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [filterAnimKey, setFilterAnimKey] = useState(0);
  const projectsSectionRef = useRef<HTMLElement | null>(null);

  // Preload slideshow images on mount for instant zero-lag rendering
  useEffect(() => {
    SLIDESHOW_IMAGES.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });
  }, []);

  // Trigger hero floating typography transition immediately on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // IntersectionObserver for Apple-style floating typography when scrolling to Current Projects
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setProjectsVisible(true);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    if (projectsSectionRef.current) {
      observer.observe(projectsSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 4.5-second interval slideshow with soft, gentle 1.5s ambient dissolve
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Handle direct landing from news links or URL hash
  useEffect(() => {
    if (location.hash) {
      const rawId = location.hash.replace('#', '');
      const el = document.getElementById(rawId);
      if (el) {
        setProjectsVisible(true);
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setHighlightedId(rawId);
          setTimeout(() => setHighlightedId(null), 3000);
        }, 120);
      }
    }
  }, [location.hash]);

  const handleFilterChange = (filter: ProjectFilter) => {
    setActiveFilter(filter);
    setFilterAnimKey((prev) => prev + 1);
  };

  const scrollToProjects = () => {
    setProjectsVisible(true);
    const el = document.getElementById('sec-current-projects');
    if (el) {
      const navOffset = 80;
      const elementTop = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, elementTop - navOffset),
        behavior: 'smooth',
      });
    }
  };

  const developmentalProjects = RESEARCH_PROJECTS.filter(
    (p) => p.category === 'Developmental Processes'
  );
  const instructionalProjects = RESEARCH_PROJECTS.filter(
    (p) => p.category === 'Instructional Approaches'
  );

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f]">
      {/* Top Hero Section: Two Lines of Inquiry occupying one full viewport */}
      <section className="min-h-[calc(100svh-4.5rem)] sm:min-h-[calc(100svh-5rem)] flex flex-col justify-between py-6 sm:py-8 lg:py-10">
        <div className="max-w-[1140px] mx-auto px-8 sm:px-12 lg:px-16 xl:px-20 w-full my-auto space-y-6 sm:space-y-8">
          {/* Header Block with Apple-style floating text entrance */}
          <div>
            <p
              className={`text-[14px] sm:text-[15px] font-normal text-[#8e75ad] tracking-normal mb-1.5 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: '80ms' }}
            >
              Explore research projects
            </p>
            <h1
              className={`text-3xl sm:text-4xl lg:text-[46px] font-bold text-stone-900 tracking-tight leading-tight transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'
              }`}
              style={{ transitionDelay: '160ms' }}
            >
              Two Lines of Inquiry
            </h1>
          </div>

          {/* 2-Column: Lines of inquiry on left, photo slideshow on right matching 1240px proportions */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-8 xl:gap-12 items-center">
            {/* Left: Numbered lines of inquiry with Apple float transition */}
            <div
              className={`transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'
              }`}
              style={{ transitionDelay: '240ms' }}
            >
              <ol className="list-decimal pl-6 space-y-5 text-[18px] sm:text-[20px] text-stone-800 leading-relaxed font-normal">
                <li className="pl-1">
                  We investigate{' '}
                  <strong className="font-semibold text-[#7542b3]">
                    developmental processes
                  </strong>{' '}
                  of reading comprehension and content knowledge.
                </li>
                <li className="pl-1">
                  We investigate{' '}
                  <strong className="font-semibold text-[#a43e8c]">
                    instructional approaches
                  </strong>{' '}
                  to support reading comprehension and content knowledge,
                  building on the first line of research.
                </li>
              </ol>
            </div>

            {/* Right: Slideshow photo with Apple float entrance */}
            <div
              className={`w-full max-w-[460px] mx-auto lg:mx-0 transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                heroVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-[0.98]'
              }`}
              style={{ transitionDelay: '320ms' }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xs bg-stone-100 aspect-[16/10] w-full border border-stone-200/90">
                {SLIDESHOW_IMAGES.map((img, idx) => {
                  const isActive = idx === currentSlide;
                  return (
                    <img
                      key={img.src}
                      src={img.src}
                      alt={img.alt}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                        isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    />
                  );
                })}

                {/* Subtle, barely-noticeable pause/play toggle */}
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute bottom-2 right-2 z-20 w-5 h-5 rounded-full bg-black/20 hover:bg-black/50 text-white/70 hover:text-white flex items-center justify-center opacity-25 hover:opacity-85 transition-all cursor-pointer backdrop-blur-xs"
                  aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-2 h-2 fill-current" />
                  ) : (
                    <Play className="w-2 h-2 fill-current ml-0.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Under-section scope description (Centered, single line on desktop) */}
          <div
            className={`w-full pt-1 text-center transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '380ms' }}
          >
            <p className="text-stone-700 text-sm sm:text-base lg:text-[17px] leading-relaxed mx-auto text-center md:whitespace-nowrap">
              We study both printed and online/digital texts. Our research often focuses on elementary years and multilingual students.
            </p>
          </div>
        </div>

        {/* Arrow Button down to Current Research Projects */}
        <div
          className={`w-full flex justify-center pt-3 pb-3 transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '460ms' }}
        >
          <button
            type="button"
            onClick={scrollToProjects}
            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-stone-200/90 bg-white hover:border-[#7542b3]/40 hover:bg-[#f1e7fa]/40 text-[#736e79] hover:text-[#7542b3] transition-all cursor-pointer select-none group shadow-2xs"
            aria-label="Scroll down to Current Research Projects"
            title="Current Research Projects"
          >
            <ChevronDown className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      </section>

      {/* Current Research Projects Section: matched to max-w-[1240px] px-6 sm:px-8 lg:px-10 */}
      <section
        ref={projectsSectionRef}
        id="sec-current-projects"
        className="pt-12 sm:pt-16 pb-24 border-t border-stone-200/90 scroll-mt-20 w-full"
      >
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-10 space-y-8 w-full">
          {/* Header & Filter Controls with Apple float entrance */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
            <div
              className={`transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'
              }`}
              style={{ transitionDelay: '80ms' }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight">
                Current Research Projects
              </h2>
              <p className="text-sm sm:text-base text-stone-600 mt-1">
                Ongoing investigations across our developmental and instructional research programs.
              </p>
            </div>

            {/* Apple Segmented Pill Switcher matching screenshot without numbers */}
            <div
              className={`inline-flex items-center p-1 rounded-full bg-[#ededf0] border border-stone-200/50 self-start sm:self-auto transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: '160ms' }}
              role="tablist"
              aria-label="Filter research projects"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeFilter === 'all'}
                onClick={() => handleFilterChange('all')}
                className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[13.5px] sm:text-[14.5px] font-medium transition-all duration-200 cursor-pointer select-none ${
                  activeFilter === 'all'
                    ? 'bg-[#1d1d1f] text-white shadow-xs'
                    : 'text-[#424245] hover:text-[#1d1d1f]'
                }`}
              >
                All
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeFilter === 'developmental'}
                onClick={() => handleFilterChange('developmental')}
                className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[13.5px] sm:text-[14.5px] font-medium transition-all duration-200 cursor-pointer select-none ${
                  activeFilter === 'developmental'
                    ? 'bg-[#1d1d1f] text-white shadow-xs'
                    : 'text-[#424245] hover:text-[#1d1d1f]'
                }`}
              >
                Developmental
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeFilter === 'instructional'}
                onClick={() => handleFilterChange('instructional')}
                className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[13.5px] sm:text-[14.5px] font-medium transition-all duration-200 cursor-pointer select-none ${
                  activeFilter === 'instructional'
                    ? 'bg-[#1d1d1f] text-white shadow-xs'
                    : 'text-[#424245] hover:text-[#1d1d1f]'
                }`}
              >
                Instructional
              </button>
            </div>
          </div>

          {/* 1-Column Layout for Current Research Projects with Apple-style floating typography */}
          <div
            key={filterAnimKey}
            className="flex flex-col gap-12 w-full pt-2"
          >
            {/* Developmental Processes */}
            {(activeFilter === 'all' || activeFilter === 'developmental') && (
              <div
                className={`w-full transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <div className="pb-3 border-b-2 border-[#7542b3] flex items-baseline justify-between">
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                    Developmental Processes
                  </h3>
                  <span className="text-xs font-semibold text-[#7542b3] uppercase tracking-wider">
                    Line 01
                  </span>
                </div>

                <div className="divide-y divide-stone-200/80">
                  {developmentalProjects.map((project, idx) => {
                    const isTarget = highlightedId === project.id;
                    const itemDelay = Math.min(240 + idx * 70, 700);
                    return (
                      <article
                        key={project.id}
                        id={project.id}
                        className={`py-6 sm:py-7 scroll-mt-28 group transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'
                        } ${
                          isTarget
                            ? 'bg-[#f1e7fa]/40 px-4 -mx-4 rounded-xl'
                            : 'hover:bg-stone-50/70 hover:px-3 hover:-mx-3 rounded-xl'
                        }`}
                        style={{ transitionDelay: `${itemDelay}ms` }}
                      >
                        <div className="flex items-baseline gap-3 mb-2">
                          <span className="text-sm sm:text-base font-bold text-[#7542b3] shrink-0 font-mono transition-transform duration-300 group-hover:scale-105">
                            {project.number < 10 ? `0${project.number}` : project.number}
                          </span>
                          <h4 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight leading-snug group-hover:text-[#7542b3] transition-colors duration-300">
                            {project.title}
                          </h4>
                        </div>

                        <p className="text-base sm:text-[17px] text-stone-700 leading-relaxed font-normal pl-7 sm:pl-8 mb-4 max-w-[1080px]">
                          {project.fullDesc}
                        </p>

                        {/* Citation & Action Link */}
                        <div className="pl-7 sm:pl-8 flex items-center justify-between flex-wrap gap-2 pt-1">
                          <span className="text-xs text-stone-500 italic">
                            {project.citation}
                          </span>
                          <Link
                            to="/publications"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#7542b3] hover:underline transition-transform duration-200 group-hover:translate-x-0.5"
                          >
                            <span>Related publications</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Instructional Approaches */}
            {(activeFilter === 'all' || activeFilter === 'instructional') && (
              <div
                className={`w-full transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{
                  transitionDelay: `${
                    activeFilter === 'all' ? 240 + developmentalProjects.length * 60 : 200
                  }ms`,
                }}
              >
                <div className="pb-3 border-b-2 border-[#355e65] flex items-baseline justify-between">
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                    Instructional Approaches
                  </h3>
                  <span className="text-xs font-semibold text-[#355e65] uppercase tracking-wider">
                    Line 02
                  </span>
                </div>

                <div className="divide-y divide-stone-200/80">
                  {instructionalProjects.map((project, idx) => {
                    const isTarget = highlightedId === project.id;
                    const baseDelay = activeFilter === 'all' ? 280 + developmentalProjects.length * 60 : 240;
                    const itemDelay = Math.min(baseDelay + idx * 70, 850);
                    return (
                      <article
                        key={project.id}
                        id={project.id}
                        className={`py-6 sm:py-7 scroll-mt-28 group transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'
                        } ${
                          isTarget
                            ? 'bg-[#f1e7fa]/40 px-4 -mx-4 rounded-xl'
                            : 'hover:bg-stone-50/70 hover:px-3 hover:-mx-3 rounded-xl'
                        }`}
                        style={{ transitionDelay: `${itemDelay}ms` }}
                      >
                        <div className="flex items-baseline gap-3 mb-2">
                          <span className="text-sm sm:text-base font-bold text-[#355e65] shrink-0 font-mono transition-transform duration-300 group-hover:scale-105">
                            {project.number < 10 ? `0${project.number}` : project.number}
                          </span>
                          <h4 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight leading-snug group-hover:text-[#355e65] transition-colors duration-300">
                            {project.link ? (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline inline-flex items-center gap-1.5 text-stone-900 hover:text-[#355e65]"
                              >
                                <span>{project.title}</span>
                                <span className="text-sm text-[#355e65] font-normal" aria-hidden="true">↗</span>
                              </a>
                            ) : (
                              project.title
                            )}
                          </h4>
                        </div>

                        <p className="text-base sm:text-[17px] text-stone-700 leading-relaxed font-normal pl-7 sm:pl-8 mb-4 max-w-[1080px]">
                          {project.id === 'inference-making' ? (
                            <>
                              Supporting inference-making is critical as many young students often have difficulties in activating and integrating content knowledge with text. We work with the{' '}
                              <a
                                href="https://inferencegalaxy.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-[#355e65] underline decoration-[#355e65]/50 underline-offset-3 hover:decoration-[#355e65] transition-colors inline-flex items-center gap-0.5"
                              >
                                <span>Inference Galaxy lab</span>
                                <span className="text-xs" aria-hidden="true">↗</span>
                              </a>{' '}
                              to design and test instructional technology in supporting young students’ inference-making and content knowledge development.
                            </>
                          ) : (
                            project.fullDesc
                          )}
                        </p>

                        {/* Citation & Action Link */}
                        <div className="pl-7 sm:pl-8 flex items-center justify-between flex-wrap gap-2 pt-1">
                          <span className="text-xs text-stone-500 italic">
                            {project.citation}
                          </span>
                          <Link
                            to="/publications"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#7542b3] hover:underline transition-transform duration-200 group-hover:translate-x-0.5"
                          >
                            <span>Related publications</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
