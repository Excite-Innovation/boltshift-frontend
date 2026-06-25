"use client";

import { useEffect, useState } from "react";
import { BellOff, BellRing, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeUser, unsubscribeUser, sendNotification } from "@/lib/actions";
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
    return "Push registration failed. Your browser could not reach its push service. Try a different browser, disable VPN/proxy filtering, or retry once network access is available.";
  }

  if (error instanceof Error) {
    if (/applicationserverkey|vapid/i.test(error.message)) {
      return "The push key looks invalid. Restart the dev server so it reloads .env.local, then try again.";
    }
  }

  return "Could not enable push notifications.";
}

export function PushNotificationManager({
  className,
}: PushNotificationManagerProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [permission, setPermission] =
    useState<NotificationPermission>("default");
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null,
  );
  const [message, setMessage] = useState(
    "New Boltshift updates are ready for you.",
  );
  const [status, setStatus] = useState<string>("");

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

    async function registerServiceWorker() {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        });

        if (!isMounted) {
          return;
        }

        setIsRegistered(true);

        const currentSubscription =
          await registration.pushManager.getSubscription();

        if (!isMounted) {
          return;
        }

        setSubscription(currentSubscription);
      } catch (error) {
        if (isMounted) {
          setStatus("Service worker registration failed.");
          console.error("Service worker registration failed:", error);
        }
      }
    }

    registerServiceWorker()

    return () => {
      isMounted = false;
    }
  }, []);

  async function ensureNotificationPermission() {
    if (Notification.permission === "granted") {
      return true;
    }

    const nextPermission = await Notification.requestPermission();
    setPermission(nextPermission);

    return nextPermission === "granted";
  }

  async function subscribeToPush() {
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
        setStatus("Push registration needs a network connection to reach the browser push service.");
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      const existingSubscription = await registration.pushManager.getSubscription();

      if (existingSubscription) {
        setSubscription(existingSubscription);
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

      setSubscription(nextSubscription);
      await subscribeUser(JSON.parse(JSON.stringify(nextSubscription)));
      setStatus("Push notifications enabled.");
    } catch (error) {
      console.error("Failed to subscribe to push:", error);
      setStatus(getPushSubscriptionErrorMessage(error));
    } finally {
      setIsBusy(false);
    }
  }

  async function unsubscribeFromPush() {
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

  async function sendTestNotification() {
    if (!subscription) {
      return;
    }

    setIsBusy(true);
    setStatus("");

    try {
      await sendNotification(message.trim() || "Boltshift has a new update.");
      setMessage("New Boltshift updates are ready for you.");
      setStatus("Test notification sent.");
    } catch (error) {
      console.error("Failed to send test notification:", error);
      setStatus("Could not send the test notification.");
    } finally {
      setIsBusy(false);
    }
  }

  if (!isSupported) {
    return (
      <div className={cn("rounded-2xl border border-border/70 p-4", className)}>
        <p className="text-sm font-medium text-foreground">
          Push notifications are not supported in this browser.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-4", className)}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">
            Push notifications
          </h3>
          <p className="text-sm text-muted-foreground">
            Stay informed about order updates, delivery changes, and special
            offers.
          </p>
        </div>

        <div className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
          {subscription
            ? "Enabled"
            : !isRegistered
              ? "Starting"
              : permission === "denied"
              ? "Blocked"
              : "Off"}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {subscription ? (
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={unsubscribeFromPush}
            disabled={isBusy}
          >
            {isBusy ? <Loader2 className="size-4 animate-spin" /> : <BellOff className="size-4" />}
            Disable push
          </Button>
        ) : (
          <Button
            type="button"
            size="sm"
            onClick={subscribeToPush}
            disabled={isBusy}
          >
            {isBusy ? <Loader2 className="size-4 animate-spin" /> : <BellRing className="size-4" />}
            Enable push
          </Button>
        )}

        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={sendTestNotification}
          disabled={!subscription || isBusy}
        >
          <Send className="size-4" />
          Send test
        </Button>
      </div>

      <label className="grid gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Test notification message
        </span>
        <Input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Write a short notification message"
        />
      </label>

      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <span>Service worker: {isRegistered ? "ready" : "registering"}</span>
        <span>Permission: {permission}</span>
      </div>

      {status ? (
        <p className="text-xs leading-5 text-muted-foreground">{status}</p>
      ) : null}
    </div>
  );
}
