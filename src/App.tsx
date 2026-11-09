import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/AboutPage';
import { TeamPage } from './components/TeamPage';
import { MemberProfile } from './components/MemberProfile';
import { ResearchPage } from './components/ResearchPage';
import { PublicationsPage } from './components/PublicationsPage';
import { NewsPage } from './components/NewsPage';
import { MentoringPage } from './components/MentoringPage';
import { ContactPage } from './components/ContactPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#faf9f6] text-stone-900 selection:bg-purple-200 selection:text-purple-900">
        {/* Institutional Header & Top Navigation Bar */}
        <Header />

        {/* Dedicated Separate Pages Router */}
        <main className="flex-1 flex flex-col">
          <Routes>
            {/* Landing Page (matches Slide 1 with only the 6 navigation buttons) */}
            <Route path="/" element={<HomePage />} />

            {/* 1) Learn more about the lab (pdf 1_about lab & Slide 2) */}
            <Route path="/about" element={<AboutPage />} />

            {/* 2) Meet our team (pdf 2_lab_members & Slides 3, 4, 5) */}
            <Route path="/team" element={<TeamPage />} />
            <Route path="/people" element={<TeamPage />} />

            {/* Individual Team Member Sub-pages (Slides 6-11) */}
            <Route path="/team/:id" element={<MemberProfile />} />
            <Route path="/people/:id" element={<MemberProfile />} />

            {/* 3) Explore research projects (pdf 3_projects & Slides 12, 13) */}
            <Route path="/research" element={<ResearchPage />} />

            {/* 4) View recent publications (Google Scholar citations & Slide 14) */}
            <Route path="/publications" element={<PublicationsPage />} />

            {/* 5) Lab news (Slide 15 & lab project milestones) */}
            <Route path="/news" element={<NewsPage />} />

            {/* Advising & Mentoring (PDF 1 & Slide 7) */}
            <Route path="/mentoring" element={<MentoringPage />} />

            {/* 6) Contact information (Slide 16) */}
            <Route path="/contact" element={<ContactPage />} />

            {/* Catch-all redirect to Home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}
