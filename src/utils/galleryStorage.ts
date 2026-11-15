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
