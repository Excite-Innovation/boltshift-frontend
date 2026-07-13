"use client";

import { useEffect, useRef, useState } from "react";

import {
  persistCollectionRecord,
  readLatestCollectionRecord,
} from "@/lib/offline-storage";

const STORED_COLLECTIONS_CHANGED_EVENT =
  "boltshift:stored-collections-changed";

type UsePersistentCollectionOptions<T> = {
  storageKey: string;
  fallback: T;
  hydrateFromStorage?: boolean;
};

export function usePersistentCollection<T>({
  storageKey,
  fallback,
  hydrateFromStorage = true,
}: UsePersistentCollectionOptions<T>) {
  const fallbackRef = useRef(fallback);
  const [value, setValue] = useState<T>(fallback);
  const [isHydrated, setIsHydrated] = useState(!hydrateFromStorage);

  useEffect(() => {
    if (!hydrateFromStorage) {
      setIsHydrated(true);
      return;
    }

    let isActive = true;

    async function hydrateCollection() {
      const latestRecord = await readLatestCollectionRecord(
        storageKey,
        fallbackRef.current,
      );

      if (!isActive) {
        return;
      }

      setValue(latestRecord.value);
      setIsHydrated(true);
    }

    void hydrateCollection();

    return () => {
      isActive = false;
    };
  }, [hydrateFromStorage, storageKey]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    persistCollectionRecord(storageKey, value);

    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(STORED_COLLECTIONS_CHANGED_EVENT));
    }
  }, [isHydrated, storageKey, value]);

  return {
    value,
    setValue,
    isHydrated,
  };
}
