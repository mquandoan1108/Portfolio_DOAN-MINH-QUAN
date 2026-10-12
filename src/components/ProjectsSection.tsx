import React, { useState } from 'react';
import { ArrowUpRight, BarChart2, Database, Layers, Sparkles } from 'lucide-react';
import { Project, Language } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { ProjectDetailModal } from './ProjectDetailModal';

interface ProjectsSectionProps {
  currentLang: Language;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ currentLang }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: currentLang === 'vi' ? 'Tất cả dự án' : 'All Projects' },
    { id: 'operations', label: 'Operations Analytics' },
    { id: 'powerbi', label: 'Power BI & BI' },
    { id: 'python', label: 'Python & EDA' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="projects"
      style={{ fontFamily: 'system-ui' }}
      className="py-16 lg:py-24 border-b border-slate-200/80 dark:border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Category Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold text-sky-700 dark:text-sky-400 tracking-wide uppercase mb-2">
              <span>Selected Case Studies</span>
              <span aria-hidden="true" className="mx-2 text-slate-300 dark:text-slate-700">·</span>
              <span>Data Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
              {currentLang === 'vi' ? 'Dự Án Phân Tích & Báo Cáo Thông Minh' : 'Analytics & Business Intelligence Projects'}
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
              {currentLang === 'vi'
                ? 'Ứng dụng dữ liệu chuyên sâu bằng Power BI, Python và mô hình hóa tài chính để giải quyết các bài toán vận hành phức tạp.'
                : 'Empirical data modeling with Power BI and Python solving real-world supply chain and profitability challenges.'}
            </p>
          </div>

          {/* Interactive Filter Segmented Control */}
          <div className="inline-flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shrink-0 self-start md:self-auto">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  type="button"
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Bento Box Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, idx) => {
            const isWide = selectedCategory === 'all' ? (idx === 0 || idx === 3) : false;

            return (
              <div
                key={project.id}
                onClick={() => setActiveModalProject(project)}
                className={`group flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 ${
                  isWide ? 'md:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Visual Thumbnail */}
                <div className={`relative overflow-hidden bg-slate-950 ${isWide ? 'aspect-[16/8]' : 'aspect-[16/10]'}`}>
                  <img
                    src={project.image}
                    alt={project.title[currentLang]}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {/* Clean unboxed category kicker on top-left */}
                  <div className="absolute top-4 left-4 text-xs font-semibold text-white/90 drop-shadow-sm flex items-center gap-1.5">
                    <span>{project.categoryLabel[currentLang]}</span>
                  </div>

                  {/* Corner Expand Indicator */}
                  <div className="absolute bottom-4 right-4 p-2 rounded-lg bg-slate-900/70 backdrop-blur-md text-white opacity-80 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      {project.title[currentLang]}
                    </h3>
                    
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                      {project.summary[currentLang]}
                    </p>
                  </div>

                  {/* Metrics Row (Tabular numbers) */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-3 gap-2 text-left">
                    {project.metrics.map((m, mIdx) => (
                      <div key={mIdx}>
                        <div className="text-[11px] text-slate-400 truncate">
                          {m.label[currentLang]}
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-sky-600 dark:text-sky-400 font-mono tabular-nums truncate mt-0.5">
                          {typeof m.value === 'string' ? m.value : m.value[currentLang]}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer tools list without pill enclosures */}
                  <div className="pt-2 flex flex-wrap items-center gap-x-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {project.tools.slice(0, 3).map((tool, tIdx) => (
                      <React.Fragment key={tIdx}>
                        {tIdx > 0 && <span aria-hidden="true">/</span>}
                        <span>{tool}</span>
                      </React.Fragment>
                    ))}
                    {project.tools.length > 3 && (
                      <>
                        <span aria-hidden="true">/</span>
                        <span>+{project.tools.length - 3}</span>
                      </>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Project Deep-Dive Modal */}
      <ProjectDetailModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        currentLang={currentLang}
      />
    </section>
  );
};
