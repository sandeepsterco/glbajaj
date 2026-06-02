"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PageLoader from "./PageLoader";

const NAVIGATION_TIMEOUT_MS = 8000;

function isInternalNavigation(href: string, pathname: string) {
  try {
    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) return false;
    if (url.pathname === pathname && url.search === window.location.search) {
      return false;
    }
    return !href.startsWith("#");
  } catch {
    return false;
  }
}

export default function NavigationProgress() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  useEffect(() => {
    if (!isNavigating) return;

    const timeout = window.setTimeout(
      () => setIsNavigating(false),
      NAVIGATION_TIMEOUT_MS
    );
    return () => window.clearTimeout(timeout);
  }, [isNavigating]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const anchor = (event.target as Element).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      if (!isInternalNavigation(href, pathname)) return;

      setIsNavigating(true);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [pathname]);

  if (!isNavigating) return null;

  return (
    <>
      <div className="navigation-progress-bar" aria-hidden="true" />
      <PageLoader variant="overlay" />
    </>
  );
}
