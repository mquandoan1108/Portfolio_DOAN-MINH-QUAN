import React from 'react';
import { GraduationCap, Award, CheckCircle2, BookOpen, Layers, Check } from 'lucide-react';
import { Language } from '../types';
import { SKILL_CATEGORIES, EDUCATION_DATA } from '../data/portfolioData';

interface SkillsEducationSectionProps {
  currentLang: Language;
}

export const SkillsEducationSection: React.FC<SkillsEducationSectionProps> = ({ currentLang }) => {
  return (
    <section
      id="skills"
      style={{ fontFamily: 'system-ui' }}
      className="py-16 lg:py-24 border-b border-slate-200/80 dark:border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-sky-700 dark:text-sky-400 tracking-wide uppercase mb-2">
            <span>Competencies & Education</span>
            <span aria-hidden="true" className="mx-2 text-slate-300 dark:text-slate-700">·</span>
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
            {currentLang === 'vi' ? 'Năng Lực Chuyên Môn & Nền Tảng Học Vấn' : 'Core Competencies & Academic Background'}
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            {currentLang === 'vi'
              ? 'Sự kết hợp giữa tư duy chuẩn mực của ngành Hàng không và kỹ năng phân tích dữ liệu thực chiến trong ngành Logistics.'
              : 'Synthesizing rigorous aviation operational standards with hands-on data analytics and supply chain logistics.'}
          </p>
        </div>

        {/* 2-Column Split: Left Skills, Right Education */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Skills Categories (Span 7) */}
          <div className="lg:col-span-7 space-y-8">
            {SKILL_CATEGORIES.map((category, catIdx) => (
              <div
                key={catIdx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs"
              >
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span>{category.title[currentLang]}</span>
                  <span className="text-xs font-normal text-sky-600 dark:text-sky-400 font-mono">
                    0{catIdx + 1}
                  </span>
                </h3>

                <div className="space-y-4">
                  {category.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {skill.name}
                        </span>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                          {skill.level[currentLang]}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {skill.context[currentLang]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Education & Certifications (Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Degree Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs">
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-mono">
                  {EDUCATION_DATA.period}
                </span>
                <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wide">
                  {currentLang === 'vi' ? 'Đại học chính quy' : 'Formal Bachelor Degree'}
                </span>
              </div>

              <div className="mt-4">
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {EDUCATION_DATA.degree[currentLang]}
                </h3>
                <p className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-1">
                  {EDUCATION_DATA.institution[currentLang]}
                </p>
              </div>

              {/* GPA Metric Strip */}
              <div className="mt-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {currentLang === 'vi' ? 'Điểm trung bình tích lũy' : 'Cumulative GPA'}
                  </div>
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {currentLang === 'vi' ? 'Xếp loại Khá' : 'Good'}
                  </div>
                </div>
                <div className="text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
                  {EDUCATION_DATA.gpa}
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {EDUCATION_DATA.description[currentLang]}
              </p>

              {/* Highlights & Modules */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                {EDUCATION_DATA.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                    <span>{item[currentLang]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Aviation Standards Box */}
            <div className="bg-sky-50 dark:bg-sky-950/40 rounded-2xl border border-sky-100 dark:border-sky-900/60 p-6 space-y-3">
              <div className="text-xs font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider">
                {currentLang === 'vi' ? 'Quy chuẩn an toàn hàng không & dịch vụ' : 'Aviation Ground Safety Standard'}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentLang === 'vi'
                  ? 'Kinh nghiệm thực tiễn tại SAGS (Cảng Hàng không Quốc tế Tân Sơn Nhất) giúp rèn luyện khả năng tuân thủ quy trình nghiêm ngặt, xử lý khủng hoảng thời gian thực và quản lý sai lệch chất lượng dịch vụ ở tiêu chuẩn cao nhất.'
                  : 'Practical operations at Tan Son Nhat International Airport instilled rigorous standard operating procedure (SOP) compliance, real-time crisis resolution, and high-tolerance quality auditing.'}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
