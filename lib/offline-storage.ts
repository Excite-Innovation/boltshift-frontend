type StoredRecord<T> = {
  value: T;
  updatedAt: number;
};

const DATABASE_NAME = "boltshift-offline";
const DATABASE_VERSION = 1;
const STORE_NAME = "collections";

const indexedDbUnavailableMessage =
  "IndexedDB is not available in this browser.";

function isBrowser() {
  return typeof window !== "undefined";
}

function safeDateNow() {
  return Date.now();
}

function getStorage() {
  if (!isBrowser()) {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function parseStoredRecord<T>(rawValue: string | null, fallback: T): StoredRecord<T> {
  if (!rawValue) {
    return {
      value: fallback,
      updatedAt: 0,
    };
  }

  try {
    const parsedValue: unknown = JSON.parse(rawValue);

    if (Array.isArray(parsedValue)) {
      return {
        value: parsedValue as T,
        updatedAt: 0,
      };
    }

    if (
      typeof parsedValue === "object" &&
      parsedValue !== null &&
      "value" in parsedValue &&
      "updatedAt" in parsedValue
    ) {
      const record = parsedValue as StoredRecord<T>;

      return {
        value: record.value,
        updatedAt:
          typeof record.updatedAt === "number" ? record.updatedAt : 0,
      };
    }
  } catch {
    return {
      value: fallback,
      updatedAt: 0,
    };
  }

  return {
    value: fallback,
    updatedAt: 0,
  };
}

function serializeStoredRecord<T>(record: StoredRecord<T>) {
  return JSON.stringify(record);
}

function openDatabase() {
  if (!isBrowser() || !("indexedDB" in window)) {
    return Promise.reject(new Error(indexedDbUnavailableMessage));
  }

  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = window.indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

    request.addEventListener("upgradeneeded", () => {
      const database = request.result;

      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: "key" });
      }
    });

    request.addEventListener("success", () => {
      resolve(request.result);
    });

    request.addEventListener("error", () => {
      reject(request.error ?? new Error(indexedDbUnavailableMessage));
    });
  });
}

export async function readCollectionRecordFromIndexedDb<T>(
  key: string,
): Promise<StoredRecord<T> | null> {
  try {
    const database = await openDatabase();

    return await new Promise<StoredRecord<T> | null>((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);

      request.addEventListener("success", () => {
        const result = request.result as StoredRecord<T> | undefined;

        if (!result) {
          database.close();
          resolve(null);
          return;
        }

        database.close();
        resolve({
          value: result.value,
          updatedAt: typeof result.updatedAt === "number" ? result.updatedAt : 0,
        });
      });

      request.addEventListener("error", () => {
        database.close();
        reject(request.error ?? new Error(indexedDbUnavailableMessage));
      });

      transaction.addEventListener("error", () => {
        database.close();
        reject(transaction.error ?? new Error(indexedDbUnavailableMessage));
      });
    });
  } catch {
    return null;
  }
}

export function readCollectionRecordFromStorage<T>(
  key: string,
  fallback: T,
) {
  const storage = getStorage();

  if (!storage) {
    return {
      value: fallback,
      updatedAt: 0,
    };
  }

  try {
    return parseStoredRecord<T>(storage.getItem(key), fallback);
  } catch {
    return {
      value: fallback,
      updatedAt: 0,
    };
  }
}

export async function readLatestCollectionRecord<T>(
  key: string,
  fallback: T,
) {
  const [localRecord, indexedDbRecord] = await Promise.all([
    Promise.resolve(readCollectionRecordFromStorage(key, fallback)),
    readCollectionRecordFromIndexedDb<T>(key),
  ]);

  if (!indexedDbRecord) {
    return localRecord;
  }

  if (indexedDbRecord.updatedAt >= localRecord.updatedAt) {
    return indexedDbRecord;
  }

  return localRecord;
}

export function writeCollectionRecordToStorage<T>(key: string, value: T) {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  try {
    storage.setItem(
      key,
      serializeStoredRecord({
        value,
        updatedAt: safeDateNow(),
      }),
    );
  } catch {
    // LocalStorage can be unavailable or full; the IndexedDB mirror remains as a fallback.
  }
}

export async function writeCollectionRecordToIndexedDb<T>(
  key: string,
  value: T,
) {
  try {
    const database = await openDatabase();

    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put({
        key,
        value,
        updatedAt: safeDateNow(),
      });

      request.addEventListener("error", () => {
        database.close();
        reject(request.error ?? new Error(indexedDbUnavailableMessage));
      });

      transaction.addEventListener("complete", () => {
        database.close();
        resolve();
      });

      transaction.addEventListener("error", () => {
        database.close();
        reject(transaction.error ?? new Error(indexedDbUnavailableMessage));
      });
    });
  } catch {
    // Ignore storage failures so the UI can keep working offline.
  }
}

export function persistCollectionRecord<T>(key: string, value: T) {
  writeCollectionRecordToStorage(key, value);
  void writeCollectionRecordToIndexedDb(key, value);
}
