"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
};

const INSTALL_PROMPT_DISMISSED_KEY = "boltshift-install-prompt-dismissed";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = window.localStorage.getItem(
      INSTALL_PROMPT_DISMISSED_KEY,
    );

    setIsDismissed(dismissed === "true");

    const isStandaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.matchMedia("(display-mode: window-controls-overlay)").matches ||
      Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone);

    setIsStandalone(isStandaloneMode);

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsDismissed(true);
      window.localStorage.setItem(INSTALL_PROMPT_DISMISSED_KEY, "true");
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
    await deferredPrompt.userChoice;

    setDeferredPrompt(null);
    setIsDismissed(true);
    window.localStorage.setItem(INSTALL_PROMPT_DISMISSED_KEY, "true");
  }

  function handleClose() {
    setIsDismissed(true);
    window.localStorage.setItem(INSTALL_PROMPT_DISMISSED_KEY, "true");
  }

  if (isStandalone || isDismissed) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md pointer-events-none sm:inset-x-auto sm:right-4">
      <div className="pointer-events-auto flex items-center gap-2 rounded-2xl border border-border/70 bg-background/95 px-3 py-3 shadow-2xl backdrop-blur">
        <Button
          type="button"
          onClick={handleInstall}
          className="flex-1"
          disabled={!deferredPrompt}
        >
          Add to home screen
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleClose}
          aria-label="Dismiss install prompt"
        >
          <X className="size-4" />
        </Button>
      </div>
    </div>
  );
}
