import React, { useEffect } from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { PERSONAL_INFO, EXPERIENCES, EDUCATION_DATA, SKILL_CATEGORIES } from '../data/portfolioData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose, currentLang }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/75 backdrop-blur-sm print:p-0 print:bg-white animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0 -z-10" onClick={onClose} aria-hidden="true" />

      {/* Main CV Modal Wrapper */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl print:max-h-none print:shadow-none print:border-none print:rounded-none">
        
        {/* Floating Controls Bar (Hidden during print) */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {currentLang === 'vi' ? 'Hồ Sơ Năng Lực Trực Tuyến' : 'Executive Curriculum Vitae'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{currentLang === 'vi' ? 'In / Lưu PDF' : 'Print / Save PDF'}</span>
            </button>

            <button
              onClick={onClose}
              type="button"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close CV Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable CV Content (Clean A4 Paper Design) */}
        <div className="p-8 sm:p-12 text-slate-900 dark:text-slate-100 print:p-6 print:text-black space-y-8 font-sans">
          
          {/* Header */}
          <div className="border-b border-slate-200 dark:border-slate-800 print:border-slate-300 pb-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  ĐOÀN MINH QUÂN
                </h1>
                <p className="text-base font-bold text-sky-600 dark:text-sky-400 print:text-sky-800 mt-1">
                  {PERSONAL_INFO.title[currentLang]}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 print:text-slate-600 mt-2 max-w-xl leading-relaxed">
                  {PERSONAL_INFO.bio[currentLang]}
                </p>
              </div>

              {/* Direct Info */}
              <div className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300 print:text-slate-700 font-mono shrink-0">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-sky-600" />
                  <span>{PERSONAL_INFO.phoneDisplay}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-sky-600" />
                  <span>{PERSONAL_INFO.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-sky-600" />
                  <span>linkedin.com/in/{PERSONAL_INFO.linkedinHandle}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-sky-600" />
                  <span>{PERSONAL_INFO.location[currentLang]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Quantified Highlights */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 print:text-slate-700 mb-3 pb-1 border-b border-slate-100 dark:border-slate-800">
              {currentLang === 'vi' ? 'Chỉ Số Hiệu Quả Nổi Bật' : 'Core Performance Metrics'}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {PERSONAL_INFO.stats.map((stat, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 print:bg-slate-100">
                  <div className="text-xl font-extrabold font-mono text-sky-600 dark:text-sky-400 print:text-sky-800 tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold mt-1">
                    {stat.label[currentLang]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 print:text-slate-700 mb-4 pb-1 border-b border-slate-100 dark:border-slate-800">
              {currentLang === 'vi' ? 'Kinh Nghiệm Làm Việc' : 'Professional Experience'}
            </h2>
            
            <div className="space-y-6">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white print:text-black">
                        {exp.role[currentLang]}
                      </h3>
                      <div className="text-xs font-semibold text-sky-600 dark:text-sky-400 print:text-sky-800">
                        {exp.company} · {exp.location}
                      </div>
                    </div>
                    <div className="text-xs font-mono text-slate-500 dark:text-slate-400 print:text-slate-600">
                      {exp.period[currentLang]}
                    </div>
                  </div>

                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 print:text-slate-700">
                    {exp.highlights[currentLang].map((hl, hlIdx) => (
                      <li key={hlIdx} className="flex items-start gap-2">
                        <span className="text-sky-600 dark:text-sky-400 print:text-sky-800 font-bold">•</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 print:text-slate-700 mb-3 pb-1 border-b border-slate-100 dark:border-slate-800">
              {currentLang === 'vi' ? 'Học Vấn' : 'Academic Background'}
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white print:text-black">
                  {EDUCATION_DATA.degree[currentLang]}
                </h3>
                <div className="text-slate-600 dark:text-slate-400 print:text-slate-700">
                  {EDUCATION_DATA.institution[currentLang]}
                </div>
              </div>
              <div className="text-right sm:mt-0 mt-1 font-mono">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 print:text-emerald-700">GPA: {EDUCATION_DATA.gpa}</span>
                <span className="mx-2 text-slate-400">·</span>
                <span>{EDUCATION_DATA.period}</span>
              </div>
            </div>
          </div>

          {/* Core Competencies */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 print:text-slate-700 mb-3 pb-1 border-b border-slate-100 dark:border-slate-800">
              {currentLang === 'vi' ? 'Năng Lực & Kỹ Năng Kỹ Thuật' : 'Core Competencies & Technical Skills'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 print:text-black">
                    {cat.title[currentLang]}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 print:text-slate-700">
                    {cat.skills.map((s) => s.name).join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
