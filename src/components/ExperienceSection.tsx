import React, { useState } from 'react';
import { Briefcase, Building2, Calendar, MapPin, ChevronRight, CheckCircle2, TrendingUp } from 'lucide-react';
import { Language, Experience } from '../types';
import { EXPERIENCES } from '../data/portfolioData';

interface ExperienceSectionProps {
  currentLang: Language;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ currentLang }) => {
  const [activeExpId, setActiveExpId] = useState<string>(EXPERIENCES[0].id);

  const selectedExp = EXPERIENCES.find((e) => e.id === activeExpId) || EXPERIENCES[0];

  return (
    <section
      id="experience"
      style={{ fontFamily: 'system-ui' }}
      className="py-16 lg:py-24 border-b border-slate-200/80 dark:border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with balanced headline & unboxed kicker */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-sky-700 dark:text-sky-400 tracking-wide uppercase mb-2">
            <span>Career History</span>
            <span aria-hidden="true" className="mx-2 text-slate-300 dark:text-slate-700">·</span>
            <span>Proven Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
            {currentLang === 'vi' ? 'Hành Trình Sự Nghiệp & Thành Tích Vận Hành' : 'Work Experience & Operational Milestones'}
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            {currentLang === 'vi'
              ? 'Kinh nghiệm thực chiến từ chỉ huy đội xe logistics quy mô lớn đến thiết lập hệ thống kiểm soát chất lượng kinh doanh cho tập đoàn.'
              : 'Direct leadership from line-haul fleet dispatching across 15 provinces to architecting corporate quality control & BI systems.'}
          </p>
        </div>

        {/* Master-Detail / Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left List of Roles / Quick Selector */}
          <div className="lg:col-span-5 space-y-3">
            {EXPERIENCES.map((exp) => {
              const isActive = exp.id === activeExpId;
              return (
                <div
                  key={exp.id}
                  onClick={() => setActiveExpId(exp.id)}
                  className={`p-5 rounded-xl border text-left cursor-pointer transition-all ${
                    isActive
                      ? 'bg-white dark:bg-slate-900 border-sky-500/80 dark:border-sky-500 shadow-md ring-1 ring-sky-500/20'
                      : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {exp.period[currentLang]}
                    </span>
                    {exp.isCurrent && (
                      <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                        {currentLang === 'vi' ? 'Hiện tại' : 'Current'}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                    {exp.role[currentLang]}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 mt-1">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{exp.company}</span>
                    <span aria-hidden="true">·</span>
                    <span>{exp.location}</span>
                  </div>

                  {/* Summary Metric Chips (Clean text with separator) */}
                  <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {exp.metrics.map((m, mIdx) => (
                      <span key={mIdx} className="font-semibold text-sky-600 dark:text-sky-400 tabular-nums">
                        {m.value} {m.label[currentLang]}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Detailed Case Study Card */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            
            {/* Header of Active Role */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-200/80 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                  {selectedExp.company}
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {selectedExp.role[currentLang]}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedExp.period[currentLang]}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {selectedExp.location}
                  </span>
                </div>
              </div>

              {/* Verified Metrics Badge */}
              <div className="flex flex-row sm:flex-col items-start sm:items-end gap-2 shrink-0">
                {selectedExp.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 border border-sky-100 dark:border-sky-900 text-right"
                  >
                    <div className="text-sm font-extrabold text-sky-700 dark:text-sky-300 font-mono tabular-nums">
                      {metric.value}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                      {metric.label[currentLang]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Responsibilities & Impact */}
            <div className="py-6 space-y-4">
              <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {currentLang === 'vi' ? 'Nhiệm vụ trọng tâm & Đóng góp định lượng' : 'Key Responsibilities & Quantified Impact'}
              </h4>

              <ul className="space-y-3.5 text-sm text-slate-700 dark:text-slate-300">
                {selectedExp.highlights[currentLang].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Core Competencies Used */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                {currentLang === 'vi' ? 'Công cụ & Phương pháp luận ứng dụng' : 'Tools & Methodologies Applied'}
              </h4>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600 dark:text-slate-300">
                {selectedExp.coreSkills.map((skill, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
