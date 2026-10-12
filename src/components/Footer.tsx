import React from 'react';
import { ArrowUp, Mail, Phone, ExternalLink } from 'lucide-react';
import { Language } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-10 bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Brand & Copyright */}
          <div className="text-center sm:text-left space-y-1">
            <div className="font-bold text-slate-200 text-sm tracking-tight">
              ĐOÀN MINH QUÂN
            </div>
            <p className="text-slate-500">
              © {new Date().getFullYear()} {PERSONAL_INFO.name}. {currentLang === 'vi' ? 'Bảo lưu mọi quyền.' : 'All rights reserved.'}
            </p>
          </div>

          {/* Quick Contact Links */}
          <div className="flex items-center gap-6 font-medium">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="hover:text-white transition-colors"
            >
              {PERSONAL_INFO.email}
            </a>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors inline-flex items-center gap-1"
            >
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            type="button"
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            aria-label="Back to top"
            title={currentLang === 'vi' ? 'Lên đầu trang' : 'Back to top'}
          >
            <ArrowUp className="w-4 h-4" />
          </button>

        </div>
      </div>
    </footer>
  );
};
