import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  X,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Images,
  Upload,
  Trash2,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  Plus,
  Check,
  Lock,
} from 'lucide-react';
import { Project, ProjectGalleryItem, Language } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  slides: ProjectGalleryItem[];
  onAddSlides: (projectId: string, files: File[]) => Promise<number>;
  onUpdateSlideLabel: (slideId: string, label: string) => Promise<void>;
  onMoveCustomSlide: (projectId: string, slideId: string, direction: 'prev' | 'next') => Promise<void>;
  onRemoveSlide: (slideId: string) => Promise<void>;
  onClearCustomSlides: (projectId: string) => Promise<void>;
  onClose: () => void;
  currentLang: Language;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  slides,
  onAddSlides,
  onUpdateSlideLabel,
  onMoveCustomSlide,
  onRemoveSlide,
  onClearCustomSlides,
  onClose,
  currentLang,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [confirmClearAll, setConfirmClearAll] = useState(false);
  const [editingLabels, setEditingLabels] = useState<Record<string, string>>({});

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const hasGallery = slides.length > 1;
  const customSlides = slides.filter((s) => s.isCustom);
  const isGalleryCapable = Boolean(project?.gallery) || slides.length > 1 || customSlides.length > 0;

  // Reset UI states when switching project
  useEffect(() => {
    setActiveIndex(0);
    setIsLightboxOpen(false);
    setIsManagerOpen(false);
    setUploadError(null);
    setConfirmClearAll(false);
    setEditingLabels({});
  }, [project?.id]);

  // Clamp activeIndex if slides are deleted
  useEffect(() => {
    if (slides.length > 0 && activeIndex >= slides.length) {
      setActiveIndex(slides.length - 1);
    }
  }, [slides.length, activeIndex]);

  const goToPrev = useCallback(() => {
    if (slides.length <= 1) return;
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToNext = useCallback(() => {
    if (slides.length <= 1) return;
    setActiveIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  // Keyboard shortcuts (ignore arrow keys while typing inside an input)
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const targetTag = (e.target as HTMLElement | null)?.tagName;
      const isEditingInput = targetTag === 'INPUT' || targetTag === 'TEXTAREA';

      if (e.key === 'Escape') {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          onClose();
        }
      } else if (!isEditingInput && e.key === 'ArrowLeft' && hasGallery) {
        goToPrev();
      } else if (!isEditingInput && e.key === 'ArrowRight' && hasGallery) {
        goToNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, isLightboxOpen, hasGallery, goToPrev, goToNext, onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;
    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const processSelectedFiles = async (fileList: FileList | null) => {
    if (!project || !fileList || fileList.length === 0) return;

    setUploadError(null);
    const allFiles = Array.from(fileList);
    const validImages = allFiles.filter((file) =>
      file.type.startsWith('image/') || /\.(png|jpe?g|webp|gif)$/i.test(file.name)
    );

    if (validImages.length === 0) {
      setUploadError(
        currentLang === 'vi'
          ? 'Vui lòng chọn tệp hình ảnh hợp lệ (.jpg, .png, .webp).'
          : 'Please select valid image files (.jpg, .png, .webp).'
      );
      return;
    }

    if (validImages.length < allFiles.length) {
      setUploadError(
        currentLang === 'vi'
          ? 'Một số tệp không phải hình ảnh đã bị bỏ qua.'
          : 'Some non-image files were skipped.'
      );
    }

    setIsUploading(true);
    try {
      const previousCount = slides.length;
      const addedCount = await onAddSlides(project.id, validImages);
      if (addedCount > 0) {
        setActiveIndex(previousCount);
      }
    } catch (err) {
      console.error('Upload error:', err);
      setUploadError(
        currentLang === 'vi'
          ? 'Không thể lưu ảnh vào bộ nhớ trình duyệt. Vui lòng thử lại.'
          : 'Failed to save images to browser storage. Please try again.'
      );
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
    processSelectedFiles(e.dataTransfer.files);
  };

  const handleLabelChange = (slideId: string, val: string) => {
    setEditingLabels((prev) => ({ ...prev, [slideId]: val }));
  };

  const handleLabelCommit = async (slideId: string, fallbackLabel: string) => {
    const draft = editingLabels[slideId];
    if (draft === undefined) return;
    const trimmed = draft.trim() || fallbackLabel;
    await onUpdateSlideLabel(slideId, trimmed);
    setEditingLabels((prev) => {
      const copy = { ...prev };
      delete copy[slideId];
      return copy;
    });
  };

  if (!project) return null;

  const currentSlide = slides[activeIndex] || slides[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Click outside backdrop */}
      <div className="fixed inset-0 -z-10" onClick={onClose} aria-hidden="true" />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl">
        
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 z-20 p-2.5 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full bg-slate-900/75 hover:bg-slate-900 text-white backdrop-blur-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Project Visual Header / Interactive Carousel */}
        {isGalleryCapable ? (
          <div className="bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
            {/* Title Header Bar + Local Uploader Toggle */}
            <div className="px-6 sm:px-8 pt-6 pb-4 pr-16 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-1">
                  <span>{project.categoryLabel[currentLang]}</span>
                  <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                  <span className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400 normal-case font-medium font-mono tabular-nums">
                    <Images className="w-3.5 h-3.5 text-sky-500" />
                    {activeIndex + 1} / {slides.length}{' '}
                    {currentLang === 'vi' ? 'ảnh gốc' : slides.length === 1 ? 'original image' : 'original images'}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
                  {project.title[currentLang]}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsManagerOpen((prev) => !prev)}
                className={`inline-flex items-center justify-center gap-2 px-4 py-2 min-h-[40px] rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 border ${
                  isManagerOpen
                    ? 'bg-sky-600 text-white border-sky-600 hover:bg-sky-700'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>
                  {isManagerOpen
                    ? currentLang === 'vi'
                      ? 'Đóng trình tải ảnh'
                      : 'Close Uploader'
                    : currentLang === 'vi'
                      ? 'Thêm / Quản lý ảnh gốc'
                      : 'Upload Original Images'}
                </span>
              </button>
            </div>

            {/* Collapsible Local Image Uploader Drawer */}
            {isManagerOpen && (
              <div className="px-6 sm:px-8 py-5 bg-slate-50 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {currentLang === 'vi'
                        ? 'Tải lên ảnh gốc từ thiết bị của bạn'
                        : 'Attach Original Screenshots from Your Device'}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      {currentLang === 'vi'
                        ? 'Ảnh được giữ nguyên 100% chất lượng gốc (không nén, không chỉnh sửa AI) và lưu trực tiếp trong trình duyệt này.'
                        : 'Files are preserved at 100% original quality (no compression or AI edits) and saved locally in this browser.'}
                    </p>
                  </div>

                  {customSlides.length > 0 && (
                    <div className="shrink-0">
                      {confirmClearAll ? (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={async () => {
                              await onClearCustomSlides(project.id);
                              setConfirmClearAll(false);
                              setActiveIndex(0);
                            }}
                            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-700 text-white transition-colors"
                          >
                            {currentLang === 'vi' ? 'Xác nhận xóa hết' : 'Confirm Clear'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmClearAll(false)}
                            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                          >
                            {currentLang === 'vi' ? 'Hủy' : 'Cancel'}
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmClearAll(true)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>
                            {currentLang === 'vi' ? 'Xóa ảnh đã tải' : 'Clear Uploads'}
                          </span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Drag & Drop + File Input Zone */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingOver(true);
                  }}
                  onDragLeave={() => setIsDraggingOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      fileInputRef.current?.click();
                    }
                  }}
                  className={`rounded-xl border-2 border-dashed p-5 text-center cursor-pointer transition-colors ${
                    isDraggingOver
                      ? 'border-sky-500 bg-sky-50/70 dark:bg-sky-950/30'
                      : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950/50 hover:border-sky-400 dark:hover:border-sky-500'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp,image/*"
                    className="hidden"
                    onChange={(e) => processSelectedFiles(e.target.files)}
                  />
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {isUploading
                        ? currentLang === 'vi'
                          ? 'Đang lưu ảnh gốc...'
                          : 'Saving original images...'
                        : currentLang === 'vi'
                          ? 'Kéo thả các ảnh gốc vào đây hoặc bấm để chọn nhiều tệp (.jpg, .png, .webp)'
                          : 'Drag & drop original screenshots here, or click to browse multiple JPG / PNG / WebP files'}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {currentLang === 'vi'
                        ? 'Có thể chọn nhiều ảnh cùng lúc'
                        : 'Supports multi-file selection'}
                    </div>
                  </div>
                </div>

                {uploadError && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}

                {/* Slide Order & Caption List */}
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {slides.map((slide, idx) => {
                    const slideId = slide.id || `slide-${idx}`;
                    const currentLabel = slide.label?.[currentLang] || slide.fileName || `Slide ${idx + 1}`;
                    const draftValue = editingLabels[slideId];
                    const customIdx = customSlides.findIndex((c) => c.id === slide.id);
                    const isFirstCustom = customIdx <= 0;
                    const isLastCustom = customIdx === -1 || customIdx >= customSlides.length - 1;

                    return (
                      <div
                        key={slideId}
                        className={`flex items-center gap-3 p-2.5 rounded-xl border bg-white dark:bg-slate-950/60 ${
                          idx === activeIndex
                            ? 'border-sky-400 dark:border-sky-600'
                            : 'border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setActiveIndex(idx)}
                          className="w-14 aspect-[3/2] rounded-md overflow-hidden bg-slate-900 shrink-0 border border-slate-200 dark:border-slate-700"
                          title={currentLang === 'vi' ? 'Xem ảnh này' : 'View slide'}
                        >
                          <img
                            src={slide.src}
                            alt={currentLabel}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </button>

                        <div className="flex-1 min-w-0">
                          {slide.isCustom && slide.id ? (
                            <div className="flex items-center gap-1.5">
                              <input
                                type="text"
                                value={draftValue !== undefined ? draftValue : currentLabel}
                                onChange={(e) => handleLabelChange(slideId, e.target.value)}
                                onBlur={() => handleLabelCommit(slideId, currentLabel)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.currentTarget.blur();
                                  }
                                }}
                                placeholder={currentLang === 'vi' ? 'Nhập tiêu đề trang báo cáo...' : 'Enter dashboard page title...'}
                                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                              />
                              {draftValue !== undefined && (
                                <button
                                  type="button"
                                  onClick={() => handleLabelCommit(slideId, currentLabel)}
                                  aria-label="Save title"
                                  className="p-1.5 rounded-lg bg-sky-600 text-white hover:bg-sky-700 shrink-0"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                              <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="truncate">{currentLabel}</span>
                              <span className="text-[11px] font-normal text-slate-400 shrink-0">
                                · {currentLang === 'vi' ? 'Ảnh gốc mặc định' : 'Built-in'}
                              </span>
                            </div>
                          )}
                        </div>

                        {slide.isCustom && slide.id && (
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              disabled={isFirstCustom}
                              onClick={() => onMoveCustomSlide(project.id, slide.id!, 'prev')}
                              aria-label={currentLang === 'vi' ? 'Chuyển lên trước' : 'Move earlier'}
                              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <ArrowLeft className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={isLastCustom}
                              onClick={() => onMoveCustomSlide(project.id, slide.id!, 'next')}
                              aria-label={currentLang === 'vi' ? 'Chuyển xuống sau' : 'Move later'}
                              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onRemoveSlide(slide.id!)}
                              aria-label={currentLang === 'vi' ? 'Xóa ảnh này' : 'Delete image'}
                              className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Main Swipeable Slide Stage */}
            <div
              className="relative group select-none bg-slate-950/95"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="relative aspect-[3/2] max-h-[480px] w-full overflow-hidden flex items-center justify-center">
                <div
                  className="flex w-full h-full transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                  {slides.map((slide, sIdx) => (
                    <div
                      key={slide.id || sIdx}
                      className="w-full h-full shrink-0 flex items-center justify-center p-2 sm:p-4"
                    >
                      <img
                        src={slide.src}
                        alt={slide.label?.[currentLang] || `${project.title[currentLang]} - ${sIdx + 1}`}
                        referrerPolicy="no-referrer"
                        onClick={() => setIsLightboxOpen(true)}
                        className="w-full h-full object-contain rounded-lg shadow-md cursor-zoom-in"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Prev / Next Navigation Buttons (shown when > 1 slide) */}
                {hasGallery && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        goToPrev();
                      }}
                      aria-label={currentLang === 'vi' ? 'Ảnh trước' : 'Previous image'}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 min-h-[40px] min-w-[40px] p-2.5 flex items-center justify-center rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md shadow-lg border border-white/15 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        goToNext();
                      }}
                      aria-label={currentLang === 'vi' ? 'Ảnh tiếp theo' : 'Next image'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 min-h-[40px] min-w-[40px] p-2.5 flex items-center justify-center rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md shadow-lg border border-white/15 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Fullscreen Zoom Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLightboxOpen(true);
                  }}
                  aria-label={currentLang === 'vi' ? 'Phóng to toàn màn hình' : 'Open fullscreen'}
                  className="absolute top-3 right-3 z-10 px-3 py-1.5 min-h-[36px] rounded-lg bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-medium backdrop-blur-md border border-white/15 flex items-center gap-1.5 transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">
                    {currentLang === 'vi' ? 'Phóng to' : 'Expand'}
                  </span>
                </button>
              </div>

              {/* Active Slide Caption + Dot Indicators */}
              <div className="px-4 sm:px-6 py-2.5 bg-slate-900 text-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="font-medium text-sky-300 truncate">
                  {currentSlide?.label?.[currentLang] || `${project.title[currentLang]} (${activeIndex + 1}/${slides.length})`}
                </div>
                {hasGallery && (
                  <div className="flex items-center gap-1.5 ml-auto">
                    {slides.map((slide, dotIdx) => (
                      <button
                        key={slide.id || dotIdx}
                        type="button"
                        onClick={() => setActiveIndex(dotIdx)}
                        aria-label={`Slide ${dotIdx + 1}`}
                        className={`h-1.5 rounded-full transition-all ${
                          dotIdx === activeIndex
                            ? 'w-5 bg-sky-400'
                            : 'w-1.5 bg-slate-600 hover:bg-slate-400'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Strip + Quick Add Button */}
            <div className="px-4 sm:px-6 py-3 bg-slate-50 dark:bg-slate-900/90 flex items-center gap-2.5 overflow-x-auto">
              {slides.map((slide, tIdx) => {
                const isSelected = tIdx === activeIndex;
                return (
                  <button
                    key={slide.id || tIdx}
                    type="button"
                    onClick={() => setActiveIndex(tIdx)}
                    className={`group/thumb relative shrink-0 w-24 sm:w-28 aspect-[3/2] rounded-lg overflow-hidden border-2 transition-all ${
                      isSelected
                        ? 'border-sky-500 ring-2 ring-sky-500/30 opacity-100 scale-[1.02]'
                        : 'border-slate-200 dark:border-slate-700 opacity-65 hover:opacity-100'
                    }`}
                    title={slide.label?.[currentLang] || `Slide ${tIdx + 1}`}
                  >
                    <img
                      src={slide.src}
                      alt={slide.label?.[currentLang] || `Thumbnail ${tIdx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-slate-950/80 text-[10px] font-mono font-bold text-white tabular-nums">
                      {tIdx + 1}
                    </div>
                  </button>
                );
              })}

              {/* Quick "+ Add Original Images" Tile */}
              <button
                type="button"
                onClick={() => {
                  setIsManagerOpen(true);
                  setTimeout(() => fileInputRef.current?.click(), 50);
                }}
                className="shrink-0 w-24 sm:w-28 aspect-[3/2] rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-sky-500 dark:hover:border-sky-400 bg-white dark:bg-slate-950/50 flex flex-col items-center justify-center gap-1 text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                title={currentLang === 'vi' ? 'Thêm ảnh gốc từ máy' : 'Add original screenshots'}
              >
                <Plus className="w-4 h-4" />
                <span className="text-[11px] font-semibold">
                  {currentLang === 'vi' ? 'Thêm ảnh' : 'Add Photos'}
                </span>
              </button>
            </div>
          </div>
        ) : (
          /* Single Image Banner for Projects without Multi-Slide Gallery */
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
        )}

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

      {/* Fullscreen Lightbox Overlay */}
      {isLightboxOpen && currentSlide && (
        <div
          className="fixed inset-0 z-[60] bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
          onClick={() => setIsLightboxOpen(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Lightbox Top Bar */}
          <div
            className="flex items-center justify-between gap-4 text-white max-w-7xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <div className="text-xs font-mono tabular-nums text-sky-400">
                {activeIndex + 1} / {slides.length}
              </div>
              <div className="text-sm sm:text-base font-semibold truncate">
                {currentSlide.label?.[currentLang] || project.title[currentLang]}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="p-2.5 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full bg-slate-800/90 hover:bg-slate-700 text-white transition-colors shrink-0"
              aria-label={currentLang === 'vi' ? 'Đóng chế độ phóng to' : 'Close fullscreen'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lightbox Main Image & Navigation */}
          <div
            className="relative flex-1 flex items-center justify-center max-w-7xl w-full mx-auto my-3 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentSlide.src}
              alt={currentSlide.label?.[currentLang] || project.title[currentLang]}
              referrerPolicy="no-referrer"
              className="max-h-[78vh] max-w-full object-contain rounded-lg shadow-2xl select-none"
            />

            {hasGallery && (
              <>
                <button
                  type="button"
                  onClick={goToPrev}
                  aria-label={currentLang === 'vi' ? 'Ảnh trước' : 'Previous image'}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] p-3 flex items-center justify-center rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/15 shadow-lg transition-transform hover:scale-105"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  aria-label={currentLang === 'vi' ? 'Ảnh tiếp theo' : 'Next image'}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] p-3 flex items-center justify-center rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/15 shadow-lg transition-transform hover:scale-105"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Bottom Thumbnails */}
          {hasGallery && (
            <div
              className="flex items-center justify-center gap-2 overflow-x-auto max-w-4xl w-full mx-auto py-1"
              onClick={(e) => e.stopPropagation()}
            >
              {slides.map((slide, lIdx) => (
                <button
                  key={slide.id || lIdx}
                  type="button"
                  onClick={() => setActiveIndex(lIdx)}
                  className={`shrink-0 w-20 aspect-[3/2] rounded-md overflow-hidden border-2 transition-all ${
                    lIdx === activeIndex
                      ? 'border-sky-400 opacity-100 scale-105'
                      : 'border-slate-700 opacity-50 hover:opacity-90'
                  }`}
                >
                  <img
                    src={slide.src}
                    alt={slide.label?.[currentLang] || `Slide ${lIdx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
