"use client";

import { useEffect, useState } from "react";
import { BellOff, BellRing, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { subscribeUser, unsubscribeUser } from "@/lib/actions";
import { cn } from "@/lib/utils";

type PushNotificationManagerProps = {
  className?: string;
};

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i += 1) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

function getPushSubscriptionErrorMessage(error: unknown) {
  if (error instanceof DOMException && error.name === "AbortError") {
    return "Push registration failed. Your browser could not reach its push service.";
  }

  if (error instanceof Error && /applicationserverkey|vapid/i.test(error.message)) {
    return "The push key looks invalid. Restart the dev server so it reloads .env.local.";
  }

  return "Could not update push notifications.";
}

export function PushNotificationManager({
  className,
}: PushNotificationManagerProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [permission, setPermission] =
    useState<NotificationPermission>("default");
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null,
  );
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (
      !("serviceWorker" in navigator) ||
      !("PushManager" in window) ||
      !("Notification" in window)
    ) {
      return;
    }

    setIsSupported(true);
    setPermission(Notification.permission);

    let isMounted = true;

    async function syncSubscription() {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        });

        const currentSubscription =
          await registration.pushManager.getSubscription();

        if (isMounted) {
          setSubscription(currentSubscription);
        }
      } catch (error) {
        if (isMounted) {
          setStatus("Service worker registration failed.");
          console.error("Service worker registration failed:", error);
        }
      }
    }

    syncSubscription();

    return () => {
      isMounted = false;
    };
  }, []);

  async function ensureNotificationPermission() {
    if (Notification.permission === "granted") {
      return true;
    }

    const nextPermission = await Notification.requestPermission();
    setPermission(nextPermission);

    return nextPermission === "granted";
  }

  async function enablePushNotifications() {
    setIsBusy(true);
    setStatus("");

    try {
      if (!isSupported) {
        setStatus("Push notifications are not supported in this browser.");
        return;
      }

      const permissionGranted = await ensureNotificationPermission();
      if (!permissionGranted) {
        setStatus("Notification permission is required to enable push.");
        return;
      }

      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!vapidKey) {
        setStatus("Missing NEXT_PUBLIC_VAPID_PUBLIC_KEY.");
        return;
      }

      if (!navigator.onLine) {
        setStatus("Push registration needs a network connection.");
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      const currentSubscription =
        await registration.pushManager.getSubscription();

      if (currentSubscription) {
        setSubscription(currentSubscription);
        setStatus("Push notifications are already enabled.");
        return;
      }

      const applicationServerKey = urlBase64ToUint8Array(vapidKey);
      if (applicationServerKey.byteLength === 0) {
        setStatus("The VAPID public key could not be decoded.");
        return;
      }

      const nextSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      });

      await subscribeUser(JSON.parse(JSON.stringify(nextSubscription)));
      setSubscription(nextSubscription);
      setStatus("Push notifications enabled.");
    } catch (error) {
      console.error("Failed to subscribe to push:", error);
      setStatus(getPushSubscriptionErrorMessage(error));
    } finally {
      setIsBusy(false);
    }
  }

  async function disablePushNotifications() {
    setIsBusy(true);
    setStatus("");

    try {
      if (!subscription) {
        return;
      }

      await subscription.unsubscribe();
      setSubscription(null);
      await unsubscribeUser();
      setStatus("Push notifications disabled.");
    } catch (error) {
      console.error("Failed to unsubscribe from push:", error);
      setStatus("Could not disable push notifications.");
    } finally {
      setIsBusy(false);
    }
  }

  if (!isSupported) {
    return (
      <p className={cn("text-xs text-muted-foreground", className)}>
        Push notifications are not supported in this browser.
      </p>
    );
  }

  const isEnabled = Boolean(subscription);

  return (
    <div className={cn("grid gap-2", className)}>
      <div className="flex flex-wrap items-center gap-2">
        {isEnabled ? (
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={disablePushNotifications}
            disabled={isBusy}
          >
            {isBusy ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <BellOff className="size-4" />
            )}
            Disable notifications
          </Button>
        ) : (
          <Button
            type="button"
            size="sm"
            onClick={enablePushNotifications}
            disabled={isBusy}
          >
            {isBusy ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <BellRing className="size-4" />
            )}
            Enable notifications
          </Button>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        {isEnabled
          ? "Push alerts are active on this device."
          : permission === "denied"
            ? "Notifications are blocked. You can re-enable them from browser settings."
            : "Tap to let the browser or system show the permission prompt."}
      </p>

      {status ? (
        <p className="text-xs text-muted-foreground">{status}</p>
      ) : null}
    </div>
  );
}
