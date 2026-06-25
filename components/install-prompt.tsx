"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PushNotificationManager } from "@/components/push-notification-manager";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
};

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const isStandaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.matchMedia("(display-mode: window-controls-overlay)").matches ||
      Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone);

    setIsStandalone(isStandaloneMode);
    setIsIOS(
      /iPad|iPhone|iPod/.test(window.navigator.userAgent) &&
        !(window as typeof window & { MSStream?: unknown }).MSStream,
    );

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setStatus("Boltshift was installed successfully.");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) {
      return;
    }

    await deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === "accepted") {
      setStatus("Install confirmed.");
    } else {
      setStatus("Install dismissed.");
    }

    setDeferredPrompt(null);
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md pointer-events-none sm:inset-x-auto sm:right-4">
      <Card className="pointer-events-auto border-border/70 bg-background/95 shadow-2xl backdrop-blur">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="text-sm">Boltshift PWA</CardTitle>
              <CardDescription>
                Install the app for faster access, offline browsing, and push
                alerts.
              </CardDescription>
            </div>
            <Badge variant="secondary">
              {isStandalone ? "Installed" : "Ready"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-0">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              {deferredPrompt ? (
                <Button type="button" onClick={handleInstall}>
                  Add to home screen
                </Button>
              ) : null}

              {isStandalone ? (
                <Badge variant="secondary">The app is already installed.</Badge>
              ) : isIOS ? (
                <Badge variant="outline" className="whitespace-normal">
                  On iPhone or iPad, use Share then Add to Home Screen.
                </Badge>
              ) : (
                <Badge variant="outline">Waiting for the install prompt</Badge>
              )}
            </div>

            <p className="text-xs leading-5 text-muted-foreground">
              The service worker keeps the app shell and static assets cached
              for offline use, while push notifications keep you updated.
            </p>
          </div>

          {status ? (
            <p className="text-xs leading-5 text-muted-foreground">{status}</p>
          ) : null}

          <Separator />

          <PushNotificationManager />
        </CardContent>
      </Card>
    </div>
  );
}
