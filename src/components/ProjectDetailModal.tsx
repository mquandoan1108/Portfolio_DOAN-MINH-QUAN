import React, { useEffect } from 'react';
import { X, CheckCircle, Database, BarChart3, TrendingUp, Layers, ArrowRight } from 'lucide-react';
import { Project, Language } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  currentLang: Language;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  currentLang,
}) => {
  // ESC key support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Click outside backdrop */}
      <div className="fixed inset-0 -z-10" onClick={onClose} aria-hidden="true" />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl">
        
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Project Header Banner with High-res Visual */}
        <div className="relative aspect-video sm:aspect-[21/9] w-full overflow-hidden bg-slate-950">
          <img
            src={project.image}
            alt={project.title[currentLang]}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-90"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent flex items-end p-6 sm:p-8">
            <div className="text-white">
              <div className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-1">
                {project.categoryLabel[currentLang]}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {project.title[currentLang]}
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Executive Summary */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              {currentLang === 'vi' ? 'Tổng quan dự án' : 'Executive Overview'}
            </h3>
            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {project.summary[currentLang]}
            </p>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {project.description[currentLang]}
            </p>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
            {project.metrics.map((metric, idx) => (
              <div key={idx}>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {metric.label[currentLang]}
                </div>
                <div className="text-xl font-extrabold text-sky-600 dark:text-sky-400 font-mono mt-1 tabular-nums">
                  {typeof metric.value === 'string' ? metric.value : metric.value[currentLang]}
                </div>
              </div>
            ))}
          </div>

          {/* Structured Deep-Dive (Problem -> Solution -> Impact) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. Challenge */}
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
              <div className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-2">
                {currentLang === 'vi' ? '1. Thách thức / Bối cảnh' : '1. Business Challenge'}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {project.challenge[currentLang]}
              </p>
            </div>

            {/* 2. Solution */}
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
              <div className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-2">
                {currentLang === 'vi' ? '2. Giải pháp kỹ thuật' : '2. Technical Solution'}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {project.solution[currentLang]}
              </p>
            </div>

            {/* 3. Business Impact */}
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
                {currentLang === 'vi' ? '3. Giá trị định lượng' : '3. Quantified Impact'}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {project.impact[currentLang]}
              </p>
            </div>

          </div>

          {/* Root Cause Analysis & Action Plans (When available) */}
          {project.keyFindings && project.keyFindings.length > 0 && (
            <div className="p-5 sm:p-6 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>
                    {currentLang === 'vi'
                      ? 'Phân Tích 4 Nguyên Nhân Gốc Rễ & Kế Hoạch Can Thiệp'
                      : '4 Core Causes of Operational Inefficiency & Action Plans'}
                  </span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {project.keyFindings.map((finding, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs"
                  >
                    <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
                      <span>{finding.title[currentLang]}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {finding.detail[currentLang]}
                    </p>
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-sky-700 dark:text-sky-300">
                      {finding.action[currentLang]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tools & Tech Stack */}
          <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                {currentLang === 'vi' ? 'Công cụ sử dụng' : 'Technologies & Stack'}
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={onClose}
              type="button"
              className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors ml-auto"
            >
              {currentLang === 'vi' ? 'Đóng cửa sổ' : 'Close Details'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
