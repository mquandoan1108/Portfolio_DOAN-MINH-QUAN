import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { RoiSimulator } from './components/RoiSimulator';
import { SkillsEducationSection } from './components/SkillsEducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CvModal } from './components/CvModal';
import { Language } from './types';
import { PERSONAL_INFO } from './data/portfolioData';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('vi');
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [isCvOpen, setIsCvOpen] = useState<boolean>(false);
  const [phoneCopied, setPhoneCopied] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync dark class on document element & body
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleLanguage = () => {
    setCurrentLang((prev) => (prev === 'vi' ? 'en' : 'vi'));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const toggleDarkMode = () => {
    setIsDark((prev) => {
      const next = !prev;
      showToast(
        currentLang === 'vi'
          ? next
            ? 'Đã chuyển sang Chế độ tối (Dark mode)'
            : 'Đã chuyển sang Chế độ sáng (Light mode)'
          : next
            ? 'Switched to Dark mode'
            : 'Switched to Light mode'
      );
      return next;
    });
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setPhoneCopied(true);
    showToast(currentLang === 'vi' ? 'Đã sao chép số điện thoại: ' + PERSONAL_INFO.phone : 'Copied phone number: ' + PERSONAL_INFO.phone);
    setTimeout(() => setPhoneCopied(false), 2500);
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 ${isDark ? 'dark' : ''}`}>
      
      {/* Navigation Top Bar Contract */}
      <Navbar
        currentLang={currentLang}
        onToggleLang={toggleLanguage}
        isDark={isDark}
        onToggleDark={toggleDarkMode}
        onOpenCv={() => setIsCvOpen(true)}
      />

      {/* Main Body Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          currentLang={currentLang}
          onOpenCv={() => setIsCvOpen(true)}
          onCopyPhone={handleCopyPhone}
        />

        {/* Work Experience Section */}
        <ExperienceSection currentLang={currentLang} />

        {/* Selected Data & Analytics Projects */}
        <ProjectsSection currentLang={currentLang} />

        {/* Interactive ROI & Operational Waste Simulator */}
        <RoiSimulator currentLang={currentLang} />

        {/* Skills & Education */}
        <SkillsEducationSection currentLang={currentLang} />

        {/* Direct Contact & Opportunities */}
        <ContactSection
          currentLang={currentLang}
          onCopyPhone={handleCopyPhone}
          phoneCopied={phoneCopied}
        />
      </main>

      {/* Footer */}
      <Footer currentLang={currentLang} />

      {/* Executive CV Viewer / Print Modal */}
      <CvModal
        isOpen={isCvOpen}
        onClose={() => setIsCvOpen(false)}
        currentLang={currentLang}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold shadow-xl border border-slate-700/50 dark:border-slate-200/50 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
