"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, RefreshCcw, WifiOff } from "lucide-react";

import { cn } from "@/lib/utils";

export function OfflineStatusBanner() {
  const [isOnline, setIsOnline] = useState(true);
  const [showReconnectMessage, setShowReconnectMessage] = useState(false);

  useEffect(() => {
    if (typeof navigator === "undefined") {
      return;
    }

    let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnectMessage(true);

      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }

      reconnectTimeout = setTimeout(() => {
        setShowReconnectMessage(false);
      }, 4000);
    };

    const handleOffline = () => {
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
        reconnectTimeout = null;
      }

      setShowReconnectMessage(false);
      setIsOnline(false);
    };

    setIsOnline(navigator.onLine);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);

      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
    };
  }, []);

  if (isOnline && !showReconnectMessage) {
    return null;
  }

  const isOffline = !isOnline;

  return (
    <div
      className={cn(
        "mb-4 rounded-2xl border px-4 py-3 shadow-sm backdrop-blur",
        isOffline
          ? "border-amber-300 bg-amber-50 text-amber-950"
          : "border-emerald-300 bg-emerald-50 text-emerald-950",
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "mt-0.5 rounded-full p-1.5",
            isOffline ? "bg-amber-100" : "bg-emerald-100",
          )}
        >
          {isOffline ? (
            <WifiOff className="size-4" aria-hidden="true" />
          ) : (
            <RefreshCcw className="size-4" aria-hidden="true" />
          )}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold">
            {isOffline ? "You're offline" : "Back online"}
          </p>
          <p className="text-sm leading-5 opacity-90">
            {isOffline
              ? "Cart and wishlist changes stay on this device until your connection returns. Cached pages may still open."
              : "Cached content will refresh in the background and any saved changes are still available locally."}
          </p>
        </div>

        {isOffline ? (
          <AlertTriangle
            className="mt-0.5 size-4 shrink-0"
            aria-hidden="true"
          />
        ) : null}
      </div>
    </div>
  );
}
