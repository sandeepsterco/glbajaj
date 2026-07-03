"use client";

import { useEffect, useRef, useState } from "react";
import PageLoader from "./PageLoader";
import { isMiddleContentReady } from "@/src/lib/mainContentReady";

const MAX_OVERLAY_MS = 8000;
const MIN_OVERLAY_MS = 0;
const POLL_MS = 80;

/**
 * Full-page overlay for hard refresh / first document load only.
 * Root layout keeps this mounted; it does not remount on client navigation,
 * so per-route loading.tsx still handles in-app redirects.
 */
export default function InitialLoadOverlay() {
  const [isDone, setIsDone] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const startedAt = performance.now();
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      cleanupRef.current?.();
      cleanupRef.current = null;

      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, MIN_OVERLAY_MS - elapsed);
      window.setTimeout(() => setIsDone(true), remaining);
    };

    const tryFinish = () => {
      if (isMiddleContentReady()) {
        finish();
        return true;
      }
      return false;
    };

    if (tryFinish()) return;

    const poll = window.setInterval(() => {
      if (tryFinish()) window.clearInterval(poll);
    }, POLL_MS);

    const maxTimeout = window.setTimeout(finish, MAX_OVERLAY_MS);

    const container = document.querySelector(".main-container");
    const observer = container
      ? new MutationObserver(() => {
          tryFinish();
        })
      : null;

    observer?.observe(container!, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-awaiting-parser", "data-route-content-ready", "class"],
    });

    cleanupRef.current = () => {
      window.clearInterval(poll);
      window.clearTimeout(maxTimeout);
      observer?.disconnect();
    };

    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, []);

  if (isDone) return null;

  return <PageLoader variant="overlay" label="Loading" />;
}
