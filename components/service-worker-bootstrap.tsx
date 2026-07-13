"use client";

import { useEffect } from "react";

const REFRESH_CACHE_TAG = "boltshift-refresh-cache";

type ExtendedServiceWorkerRegistration = ServiceWorkerRegistration & {
  sync?: {
    register(tag: string): Promise<void>;
  };
  periodicSync?: {
    register(tag: string, options: { minInterval: number }): Promise<void>;
  };
};

async function registerBackgroundRefresh(
  registration: ExtendedServiceWorkerRegistration,
) {
  try {
    await registration.sync?.register(REFRESH_CACHE_TAG);
  } catch {
    // Background Sync is not available in every browser.
  }

  try {
    await registration.periodicSync?.register(REFRESH_CACHE_TAG, {
      minInterval: 24 * 60 * 60 * 1000,
    });
  } catch {
    // Periodic Sync is optional and may be blocked by the browser.
  }
}

export function ServiceWorkerBootstrap() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    let registration: ExtendedServiceWorkerRegistration | null = null;

    const handleOnline = () => {
      if (!registration) {
        return;
      }

      void registration.update().catch(() => undefined);
      registration.active?.postMessage({ type: "REFRESH_CACHE" });
    };

    const registerServiceWorker = async () => {
      try {
        registration = (await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        })) as ExtendedServiceWorkerRegistration;

        await registerBackgroundRefresh(registration);

        if (navigator.onLine) {
          registration.active?.postMessage({ type: "REFRESH_CACHE" });
        }
      } catch (error) {
        console.error("Service worker registration failed:", error);
      }
    };

    void registerServiceWorker();
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return null;
}
