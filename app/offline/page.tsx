"use client";

import { WifiOff } from "lucide-react";
import Link from "next/link";

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-muted flex items-center justify-center">
          <WifiOff className="w-10 h-10 text-muted-foreground" />
        </div>

        {/* Logo */}
        <div className="flex justify-center">
          <img src="/logo.svg" alt="WeMoveX" className="h-8" />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">
            You&apos;re offline
          </h1>
          <p className="text-muted-foreground">
            It looks like you&apos;ve lost your internet connection. Please
            check your network and try again.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-4xl font-medium hover:opacity-90 transition-opacity"
          >
            Try again
          </button>
          <Link
            href="/"
            className="block w-full py-3 px-4 border border-border text-foreground rounded-4xl font-medium hover:bg-muted transition-colors"
          >
            Go to homepage
          </Link>
        </div>

        {/* Help text */}
        <p className="text-sm text-muted-foreground">
          Your quote progress is saved and will be available when you&apos;re
          back online.
        </p>
      </div>
    </div>
  );
}

