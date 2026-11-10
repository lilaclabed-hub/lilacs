import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { LilacFlower } from './LilacLogo';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Exactly matching the screenshot navigation:
  // Learn more about the lab · Meet our team · Explore research projects · See publications · Lab news · Contact information
  const navLinks = [
    { to: '/about', label: 'Learn more about the lab' },
    { to: '/team', label: 'Meet our team' },
    { to: '/research', label: 'Explore research projects' },
    { to: '/publications', label: 'See publications' },
    { to: '/news', label: 'Lab news' },
    { to: '/contact', label: 'Contact information' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-stone-200/80">
      <div className="w-[min(92%,1240px)] mx-auto px-6 sm:px-8 lg:px-10 h-18 sm:h-20 flex items-center justify-between">
        {/* Left: Logo with 5-lobed Lilac Flower & LILACS LAB matching screenshot */}
        {/* Left: Brand Logo matching reference site with black S */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-[9px] font-sans font-bold text-[#1d1d1f] tracking-[-0.05em] text-[25px] sm:text-[26px] select-none whitespace-nowrap cursor-pointer transition-opacity hover:opacity-90"
          aria-label="LILACS Lab home"
        >
          <LilacFlower className="w-[28px] h-[28px] sm:w-[30px] sm:h-[30px]" />
          <span>
            <span>LILAC</span>
            <span className="text-[#1d1d1f]">S</span>
            <span className="font-medium tracking-normal text-[#626269] text-[16px]">
              {' '}LAB
            </span>
          </span>
        </button>

        {/* Right: Desktop Navigation Links aligned to LILACS baseline */}
        <nav className="hidden lg:flex items-center gap-x-7 xl:gap-x-9 text-[14.5px] font-normal text-stone-700 translate-y-[3.5px]">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to));
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={`relative py-3 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-[#9174bc] font-semibold'
                    : 'hover:text-stone-950 text-stone-700'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-7 h-[2.5px] rounded-full"
                    style={{ backgroundColor: '#9174bc' }}
                  />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white/95 backdrop-blur-xl px-4 py-4 space-y-2 shadow-xl">
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-stone-800 rounded-xl hover:bg-stone-50"
          >
            Home
          </NavLink>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 text-base rounded-xl transition-colors ${
                  isActive
                    ? 'bg-purple-50 text-[#9174bc] font-bold'
                    : 'text-stone-700 hover:bg-stone-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};
