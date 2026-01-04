"use client";

import { useState, useEffect } from "react";
import { X, Share, Plus, Download } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Check if already installed
    const standalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    setIsStandalone(standalone);

    if (standalone) return;

    // Detect iOS
    const ios =
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as unknown as { MSStream?: unknown }).MSStream;
    setIsIOS(ios);

    // Check if user dismissed prompt before
    const dismissed = localStorage.getItem("pwa-prompt-dismissed");
    if (dismissed) return;

    // Listen for the beforeinstallprompt event (Chrome/Android)
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // Show iOS prompt after a delay
    if (ios) {
      const timer = setTimeout(() => setShowPrompt(true), 3000);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      };
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("pwa-prompt-dismissed", "true");
  };

  // Don't show if already installed or prompt not triggered
  if (isStandalone || !showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 pb-safe animate-in slide-in-from-bottom duration-300">
      <div className="max-w-md mx-auto bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
        <div className="p-4">
          <div className="flex items-start gap-3">
            {/* App Icon */}
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <img src="/logo.svg" alt="WeMoveX" className="w-8 h-8" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-foreground">
                    Install WeMoveX
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Get quick access to vehicle transport quotes
                  </p>
                </div>
                <button
                  onClick={handleDismiss}
                  className="p-1 -m-1 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Dismiss"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* iOS Instructions */}
              {isIOS ? (
                <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-2.5">
                  <span>Tap</span>
                  <Share className="w-4 h-4 text-primary" />
                  <span>then</span>
                  <span className="inline-flex items-center gap-1 text-foreground font-medium">
                    <Plus className="w-4 h-4" />
                    Add to Home Screen
                  </span>
                </div>
              ) : (
                /* Chrome/Android Install Button */
                <button
                  onClick={handleInstall}
                  className="mt-3 w-full py-2.5 px-4 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Install App
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

