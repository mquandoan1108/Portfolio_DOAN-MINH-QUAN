import { useState, useEffect, useCallback, useRef } from 'react';
import { Project, ProjectGalleryItem } from '../types';
import {
  StoredGallerySlideRecord,
  getAllStoredGallerySlides,
  addStoredGalleryFiles,
  updateStoredGallerySlideLabel,
  saveSlideOrder,
  deleteStoredGallerySlide,
  clearProjectStoredGallerySlides,
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

  return {
    isLoaded,
    getSlidesForProject,
    addSlides,
    updateSlideLabel,
    moveCustomSlide,
    removeSlide,
    clearCustomSlides,
  };
}
