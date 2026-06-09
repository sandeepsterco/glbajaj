"use client";

import { useEffect, useRef, useState } from "react";
import PageLoader from "./PageLoader";

const MAX_OVERLAY_MS = 8000;
const MIN_OVERLAY_MS = 400;
const POLL_MS = 80;

/**
 * Full-page overlay for hard refresh / first document load only.
 * Root layout keeps this mounted; it does not remount on client navigation,
 * so per-route loading.tsx still handles in-app redirects.
 */
function isRouteSkeletonVisible() {
  return Boolean(
    document.querySelector(".main-container .page-loader-content")
  );
}

function isMainContentReady() {
  const container = document.querySelector(".main-container");
  if (!container) return false;
  if (isRouteSkeletonVisible()) return false;

  if (
    container.querySelector(
      ".happenings_page, main .swiper, main video, main iframe, .home_cms_section"
    )
  ) {
    return true;
  }

  const main = container.querySelector("main");
  if (main && (main.textContent?.trim().length ?? 0) > 60) {
    return true;
  }

  const text = container.textContent?.trim() ?? "";
  return container.scrollHeight > 280 && text.length > 80;
}

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
      if (isMainContentReady()) {
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

    observer?.observe(container!, { childList: true, subtree: true });

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
