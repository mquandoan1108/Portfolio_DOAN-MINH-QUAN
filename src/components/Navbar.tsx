import React, { useState } from 'react';
import { Sun, Moon, FileText, Menu, X, Globe } from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  currentLang: Language;
  onToggleLang: () => void;
  isDark: boolean;
  onToggleDark: () => void;
  onOpenCv: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onToggleLang,
  isDark,
  onToggleDark,
  onOpenCv,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#about', label: currentLang === 'vi' ? 'Giới thiệu' : 'About' },
    { href: '#experience', label: currentLang === 'vi' ? 'Kinh nghiệm' : 'Experience' },
    { href: '#projects', label: currentLang === 'vi' ? 'Dự án Data' : 'Projects' },
    { href: '#skills', label: currentLang === 'vi' ? 'Năng lực & Học vấn' : 'Competencies' },
    { href: '#roi-calculator', label: currentLang === 'vi' ? 'Mô phỏng ROI' : 'ROI Simulator' },
  ];

  return (
    <header
      style={{ fontFamily: 'system-ui' }}
      className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 dark:bg-slate-950/85 border-b border-slate-200/80 dark:border-slate-800 transition-colors"
    >
      <div
        style={{ fontFamily: 'system-ui', fontSize: '16px', lineHeight: '24px' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex items-center justify-between gap-8 h-16">
          
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            style={{ fontSize: '24px' }}
            className="font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            ĐOÀN MINH QUÂN
          </a>

          {/* Zone 2: 4-5 concise single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap shrink-0 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action with mode & lang controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={onToggleLang}
              type="button"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors whitespace-nowrap"
              title={currentLang === 'vi' ? 'Chuyển sang tiếng Anh' : 'Switch to Vietnamese'}
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>{currentLang === 'vi' ? 'EN' : 'VI'}</span>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={onToggleDark}
              type="button"
              className="p-2 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700/80 rounded-md transition-all active:scale-95 cursor-pointer shadow-xs"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? (currentLang === 'vi' ? 'Chuyển sang Chế độ sáng' : 'Switch to Light mode') : (currentLang === 'vi' ? 'Chuyển sang Chế độ tối' : 'Switch to Dark mode')}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-sky-600 transition-transform hover:-rotate-12" />
              )}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenCv}
              type="button"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap active:scale-[0.98] cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{currentLang === 'vi' ? 'Xem CV Chi Tiết' : 'View Executive CV'}</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {currentLang === 'vi' ? 'Giao diện hiển thị:' : 'Appearance mode:'}
              </span>
              <button
                onClick={onToggleDark}
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 cursor-pointer"
              >
                {isDark ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>{currentLang === 'vi' ? 'Chế độ tối (Đang bật)' : 'Dark mode (Active)'}</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-sky-600" />
                    <span>{currentLang === 'vi' ? 'Chế độ sáng (Đang bật)' : 'Light mode (Active)'}</span>
                  </>
                )}
              </button>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCv();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-500 transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>{currentLang === 'vi' ? 'Xem Hồ Sơ & Tải CV' : 'View & Download CV'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
