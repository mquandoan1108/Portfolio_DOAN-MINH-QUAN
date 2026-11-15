import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Project, ProjectGalleryItem } from '../types';
import {
  StoredGallerySlideRecord,
  getAllStoredGallerySlides,
  addStoredGalleryFiles,
  updateStoredGallerySlideLabel,
  saveSlideOrder,
  deleteStoredGallerySlide,
  clearProjectStoredGallerySlides,
  exportAllGalleriesToBackup,
  importGalleriesFromBackup,
} from '../utils/galleryStorage';

export function useProjectGalleries() {
  const [recordsByProject, setRecordsByProject] = useState<Record<string, StoredGallerySlideRecord[]>>({});
  const [objectUrls, setObjectUrls] = useState<Record<string, string>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const activeUrlsRef = useRef<Record<string, string>>({});

  const syncUrlsForRecords = useCallback((records: StoredGallerySlideRecord[]) => {
    const nextUrls: Record<string, string> = {};
    const neededIds = new Set(records.map((r) => r.id));

    // Revoke URLs that are no longer needed
    Object.entries(activeUrlsRef.current).forEach(([id, url]) => {
      if (!neededIds.has(id)) {
        URL.revokeObjectURL(url);
      } else {
        nextUrls[id] = url;
      }
    });

    // Create Object URLs for new records (raw untouched Blob)
    for (const rec of records) {
      if (!nextUrls[rec.id]) {
        nextUrls[rec.id] = URL.createObjectURL(rec.blob);
      }
    }

    activeUrlsRef.current = nextUrls;
    setObjectUrls(nextUrls);
  }, []);

  const refreshFromStorage = useCallback(async () => {
    try {
      const allRecords = await getAllStoredGallerySlides();
      const grouped: Record<string, StoredGallerySlideRecord[]> = {};
      for (const rec of allRecords) {
        if (!grouped[rec.projectId]) grouped[rec.projectId] = [];
        grouped[rec.projectId].push(rec);
      }
      syncUrlsForRecords(allRecords);
      setRecordsByProject(grouped);
    } catch (err) {
      console.error('Could not load local project galleries from IndexedDB:', err);
    } finally {
      setIsLoaded(true);
    }
  }, [syncUrlsForRecords]);

  useEffect(() => {
    refreshFromStorage();
    return () => {
      Object.values(activeUrlsRef.current).forEach((url) => URL.revokeObjectURL(url));
      activeUrlsRef.current = {};
    };
  }, [refreshFromStorage]);

  const totalCustomSlidesCount = useMemo(() => {
    return Object.values(recordsByProject).reduce((sum, list) => sum + list.length, 0);
  }, [recordsByProject]);

  const getSlidesForProject = useCallback(
    (project: Project | null): ProjectGalleryItem[] => {
      if (!project) return [];

      const builtInSlides: ProjectGalleryItem[] =
        project.gallery && project.gallery.length > 0
          ? project.gallery.map((item, idx) => ({
              ...item,
              id: item.id || `${project.id}-builtin-${idx}`,
              isCustom: false,
            }))
          : [
              {
                id: `${project.id}-builtin-0`,
                src: project.image,
                isCustom: false,
              },
            ];

      const customRecords = recordsByProject[project.id] || [];
      const customSlides: ProjectGalleryItem[] = customRecords
        .map((rec) => {
          const src = objectUrls[rec.id];
          if (!src) return null;
          return {
            id: rec.id,
            src,
            label: {
              vi: rec.labelVi,
              en: rec.labelEn,
            },
            isCustom: true,
            fileName: rec.fileName,
          } as ProjectGalleryItem;
        })
        .filter((item): item is ProjectGalleryItem => item !== null);

      return [...builtInSlides, ...customSlides];
    },
    [recordsByProject, objectUrls]
  );

  const addSlides = useCallback(
    async (projectId: string, files: File[]): Promise<number> => {
      const existing = recordsByProject[projectId] || [];
      const maxOrder = existing.reduce((max, item) => Math.max(max, item.order), -1);
      const inserted = await addStoredGalleryFiles(projectId, files, maxOrder + 1);
      await refreshFromStorage();
      return inserted.length;
    },
    [recordsByProject, refreshFromStorage]
  );

  const updateSlideLabel = useCallback(
    async (slideId: string, label: string) => {
      await updateStoredGallerySlideLabel(slideId, label, label);
      await refreshFromStorage();
    },
    [refreshFromStorage]
  );

  const moveCustomSlide = useCallback(
    async (projectId: string, slideId: string, direction: 'prev' | 'next') => {
      const current = [...(recordsByProject[projectId] || [])];
      const idx = current.findIndex((item) => item.id === slideId);
      if (idx === -1) return;

      const targetIdx = direction === 'prev' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= current.length) return;

      const [moved] = current.splice(idx, 1);
      current.splice(targetIdx, 0, moved);

      await saveSlideOrder(current.map((r) => r.id));
      await refreshFromStorage();
    },
    [recordsByProject, refreshFromStorage]
  );

  const removeSlide = useCallback(
    async (slideId: string) => {
      await deleteStoredGallerySlide(slideId);
      await refreshFromStorage();
    },
    [refreshFromStorage]
  );

  const clearCustomSlides = useCallback(
    async (projectId: string) => {
      await clearProjectStoredGallerySlides(projectId);
      await refreshFromStorage();
    },
    [refreshFromStorage]
  );

  const exportBackup = useCallback(async (): Promise<number> => {
    const backup = await exportAllGalleriesToBackup();
    const count = backup.slides.length;
    if (count === 0) return 0;

    const jsonBlob = new Blob([JSON.stringify(backup)], { type: 'application/json' });
    const url = URL.createObjectURL(jsonBlob);
    const dateStamp = new Date().toISOString().slice(0, 10);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-gallery-backup-${dateStamp}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return count;
  }, []);

  const importBackup = useCallback(
    async (file: File): Promise<{ importedCount: number; projectCount: number }> => {
      const result = await importGalleriesFromBackup(file);
      await refreshFromStorage();
      return result;
    },
    [refreshFromStorage]
  );

  return {
    isLoaded,
    totalCustomSlidesCount,
    getSlidesForProject,
    addSlides,
    updateSlideLabel,
    moveCustomSlide,
    removeSlide,
    clearCustomSlides,
    exportBackup,
    importBackup,
  };
}
