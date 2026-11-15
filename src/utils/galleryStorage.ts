export interface StoredGallerySlideRecord {
  id: string;
  projectId: string;
  fileName: string;
  mimeType: string;
  blob: Blob;
  labelVi: string;
  labelEn: string;
  order: number;
  createdAt: number;
}

export interface PortableGallerySlide {
  id: string;
  projectId: string;
  fileName: string;
  mimeType: string;
  labelVi: string;
  labelEn: string;
  order: number;
  createdAt: number;
  dataBase64: string;
}

export interface PortableGalleryBackup {
  version: 1;
  app: 'portfolio-gallery-backup';
  exportedAt: string;
  slides: PortableGallerySlide[];
}

const DB_NAME = 'portfolio_original_galleries_db';
const DB_VERSION = 1;
const STORE_NAME = 'project_slides';

function openGalleryDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      reject(new Error('IndexedDB is not supported in this browser.'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('projectId', 'projectId', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Failed to open IndexedDB.'));
  });
}

function stripFileExtension(fileName: string): string {
  return fileName.replace(/\.[^/.]+$/, '').trim() || 'Screenshot';
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      const commaIdx = result.indexOf(',');
      if (commaIdx === -1) {
        reject(new Error('Failed to encode binary image data.'));
        return;
      }
      resolve(result.slice(commaIdx + 1));
    };
    reader.onerror = () => reject(reader.error || new Error('FileReader failed while exporting image.'));
    reader.readAsDataURL(blob);
  });
}

function base64ToBlob(base64: string, mimeType: string): Blob {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mimeType || 'image/jpeg' });
}

export async function getAllStoredGallerySlides(): Promise<StoredGallerySlideRecord[]> {
  const db = await openGalleryDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();

    req.onsuccess = () => {
      const records = (req.result as StoredGallerySlideRecord[]) || [];
      records.sort((a, b) => a.order - b.order || a.createdAt - b.createdAt);
      resolve(records);
    };
    req.onerror = () => reject(req.error || new Error('Failed to read gallery records.'));
  });
}

export async function addStoredGalleryFiles(
  projectId: string,
  files: File[],
  startingOrder: number
): Promise<StoredGallerySlideRecord[]> {
  const db = await openGalleryDb();
  const baseTime = Date.now();

  const newRecords: StoredGallerySlideRecord[] = files.map((file, idx) => {
    const cleanName = stripFileExtension(file.name);
    return {
      id: `${projectId}-${baseTime}-${idx}-${Math.random().toString(36).slice(2, 8)}`,
      projectId,
      fileName: file.name,
      mimeType: file.type || 'image/jpeg',
      blob: file,
      labelVi: cleanName,
      labelEn: cleanName,
      order: startingOrder + idx,
      createdAt: baseTime + idx,
    };
  });

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    for (const record of newRecords) {
      store.put(record);
    }

    tx.oncomplete = () => resolve(newRecords);
    tx.onerror = () => reject(tx.error || new Error('Failed to save uploaded images.'));
  });
}

export async function updateStoredGallerySlideLabel(
  slideId: string,
  labelVi: string,
  labelEn: string
): Promise<void> {
  const db = await openGalleryDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const getReq = store.get(slideId);

    getReq.onsuccess = () => {
      const existing = getReq.result as StoredGallerySlideRecord | undefined;
      if (!existing) return;
      store.put({
        ...existing,
        labelVi,
        labelEn,
      });
    };

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error || new Error('Failed to update image label.'));
  });
}

export async function saveSlideOrder(orderedSlideIds: string[]): Promise<void> {
  const db = await openGalleryDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    orderedSlideIds.forEach((id, idx) => {
      const req = store.get(id);
      req.onsuccess = () => {
        const record = req.result as StoredGallerySlideRecord | undefined;
        if (record) {
          store.put({ ...record, order: idx });
        }
      };
    });

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error || new Error('Failed to reorder slides.'));
  });
}

export async function deleteStoredGallerySlide(slideId: string): Promise<void> {
  const db = await openGalleryDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.delete(slideId);

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error || new Error('Failed to delete slide.'));
  });
}

export async function clearProjectStoredGallerySlides(projectId: string): Promise<void> {
  const db = await openGalleryDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const index = store.index('projectId');
    const req = index.getAllKeys(projectId);

    req.onsuccess = () => {
      const keys = req.result || [];
      for (const key of keys) {
        store.delete(key);
      }
    };

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error || new Error('Failed to clear custom slides.'));
  });
}

export async function exportAllGalleriesToBackup(): Promise<PortableGalleryBackup> {
  const allRecords = await getAllStoredGallerySlides();
  const slides: PortableGallerySlide[] = await Promise.all(
    allRecords.map(async (rec) => ({
      id: rec.id,
      projectId: rec.projectId,
      fileName: rec.fileName,
      mimeType: rec.mimeType,
      labelVi: rec.labelVi,
      labelEn: rec.labelEn,
      order: rec.order,
      createdAt: rec.createdAt,
      dataBase64: await blobToBase64(rec.blob),
    }))
  );

  return {
    version: 1,
    app: 'portfolio-gallery-backup',
    exportedAt: new Date().toISOString(),
    slides,
  };
}

export async function importGalleriesFromBackup(
  file: File
): Promise<{ importedCount: number; projectCount: number }> {
  const rawText = await file.text();
  let parsed: unknown;

  try {
    parsed = JSON.parse(rawText);
  } catch {
    throw new Error('INVALID_JSON');
  }

  if (
    !parsed ||
    typeof parsed !== 'object' ||
    (parsed as PortableGalleryBackup).app !== 'portfolio-gallery-backup' ||
    !Array.isArray((parsed as PortableGalleryBackup).slides)
  ) {
    throw new Error('INVALID_SCHEMA');
  }

  const candidateSlides = (parsed as PortableGalleryBackup).slides;
  const validRecords: StoredGallerySlideRecord[] = [];
  const affectedProjects = new Set<string>();

  for (const item of candidateSlides) {
    if (
      !item ||
      typeof item.id !== 'string' ||
      typeof item.projectId !== 'string' ||
      typeof item.dataBase64 !== 'string' ||
      !item.dataBase64
    ) {
      continue;
    }

    const mimeType =
      typeof item.mimeType === 'string' && item.mimeType.startsWith('image/')
        ? item.mimeType
        : 'image/jpeg';

    const blob = base64ToBlob(item.dataBase64, mimeType);
    const fallbackName =
      typeof item.fileName === 'string' && item.fileName.trim()
        ? item.fileName
        : 'screenshot.jpg';

    validRecords.push({
      id: item.id,
      projectId: item.projectId,
      fileName: fallbackName,
      mimeType,
      blob,
      labelVi: typeof item.labelVi === 'string' ? item.labelVi : stripFileExtension(fallbackName),
      labelEn: typeof item.labelEn === 'string' ? item.labelEn : stripFileExtension(fallbackName),
      order: typeof item.order === 'number' ? item.order : 0,
      createdAt: typeof item.createdAt === 'number' ? item.createdAt : Date.now(),
    });
    affectedProjects.add(item.projectId);
  }

  if (validRecords.length === 0) {
    throw new Error('EMPTY_BACKUP');
  }

  const db = await openGalleryDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    for (const record of validRecords) {
      store.put(record);
    }
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error || new Error('Failed to import backup into IndexedDB.'));
  });

  return {
    importedCount: validRecords.length,
    projectCount: affectedProjects.size,
  };
}
