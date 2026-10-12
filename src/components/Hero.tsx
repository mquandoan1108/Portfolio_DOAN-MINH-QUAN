import React from 'react';
import { ArrowDown, Mail, Phone, ExternalLink, ShieldCheck, MapPin } from 'lucide-react';
import { Language } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  currentLang: Language;
  onOpenCv: () => void;
  onCopyPhone: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onOpenCv, onCopyPhone }) => {
  return (
    <section
      id="about"
      style={{ fontFamily: 'system-ui' }}
      className="pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-slate-200/80 dark:border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Screen 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Clean Unboxed Kicker Metadata */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-sky-700 dark:text-sky-400 tracking-wide uppercase">
                <span>Business Quality Control</span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">/</span>
                <span>Data Analytics</span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">/</span>
                <span>Viettel Logistics</span>
              </div>

              {/* Primary Balanced Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] text-balance">
                {currentLang === 'vi' ? (
                  <>
                    Tối ưu quy trình vận hành & kiểm soát chất lượng bằng{' '}
                    <span className="text-sky-600 dark:text-sky-400">dữ liệu thực chiến.</span>
                  </>
                ) : (
                  <>
                    Optimizing operational workflows and business quality with{' '}
                    <span className="text-sky-600 dark:text-sky-400">empirical data.</span>
                  </>
                )}
              </h1>

              {/* Sub-headline & Bio */}
              <p className="text-lg font-medium text-slate-700 dark:text-slate-300 leading-snug">
                {PERSONAL_INFO.title[currentLang]}
              </p>

              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                {PERSONAL_INFO.bio[currentLang]}
              </p>

              {/* Location & Key Trust Marker */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 pt-1">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                  {PERSONAL_INFO.location[currentLang]}
                </span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  {currentLang === 'vi' ? 'Sẵn sàng tiếp nhận cơ hội mới' : 'Open to New Opportunities'}
                </span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                <span>Viettel Logistics ({currentLang === 'vi' ? '04/2024 - Hiện tại' : 'Apr 2024 - Present'})</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-8">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-sm hover:shadow transition-all active:scale-[0.98]"
              >
                <span>{currentLang === 'vi' ? 'Xem Dự Án Data' : 'Explore Data Projects'}</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenCv}
                type="button"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all active:scale-[0.98]"
              >
                <span>{currentLang === 'vi' ? 'Hồ Sơ Năng Lực (CV)' : 'Full Executive Resume'}</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{currentLang === 'vi' ? 'Liên hệ trực tiếp' : 'Get in Touch'}</span>
              </a>
            </div>

          </div>

          {/* Right Column: Visual Anchor / Portrait at matching height */}
          <div className="lg:col-span-5 flex flex-col justify-center items-center lg:items-end">
            <div className="relative w-full max-w-md lg:max-w-none aspect-square sm:aspect-[4/4.5] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-100 dark:bg-slate-900 group">
              
              {/* Portrait Image with Fallback Container */}
              <img
                src={PERSONAL_INFO.heroImage}
                alt={PERSONAL_INFO.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                onError={(e) => {
                  // Fallback avatar container
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />

              {/* Styled Fallback container if offline */}
              <div
                style={{ display: 'none' }}
                className="w-full h-full bg-gradient-to-br from-slate-800 to-sky-950 flex flex-col items-center justify-center p-8 text-center text-white"
              >
                <div className="w-24 h-24 rounded-full bg-sky-600/30 border border-sky-400/40 flex items-center justify-center text-3xl font-bold mb-4">
                  ĐMQ
                </div>
                <h3 className="text-xl font-bold">Đoàn Minh Quân</h3>
                <p className="text-xs text-slate-300 mt-1">Business Analyst & QC Manager</p>
              </div>

              {/* Bottom Scrim & Quick Contact Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent flex items-end justify-between text-white">
                <div>
                  <div className="text-sm font-bold tracking-wide">ĐOÀN MINH QUÂN</div>
                  <div className="text-xs text-slate-300 font-medium">Business Quality Control Manager</div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
                    title="LinkedIn Profile"
                    aria-label="LinkedIn"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={onCopyPhone}
                    type="button"
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
                    title="Copy Phone Number"
                    aria-label="Copy phone"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Quantified Rigor: Full-Width 4-Column KPI Metric Strip */}
        <div className="mt-14 pt-10 border-t border-slate-200/80 dark:border-slate-800">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {PERSONAL_INFO.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 transition-colors"
              >
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-sky-600 dark:text-sky-400 font-mono tabular-nums">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-2">
                  {stat.label[currentLang]}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {stat.subtext[currentLang]}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
