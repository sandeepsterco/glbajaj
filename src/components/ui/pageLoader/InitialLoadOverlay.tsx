"use client";

import { useEffect, useState } from "react";
import PageLoader from "./PageLoader";

const MAX_OVERLAY_MS = 2200;
const MIN_OVERLAY_MS = 280;

/**
 * Never wait for window "load" — hero video and third-party scripts can block it
 * indefinitely and leave the overlay stuck.
 */
export default function InitialLoadOverlay() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const startedAt = performance.now();
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, MIN_OVERLAY_MS - elapsed);
      window.setTimeout(() => setIsLoaded(true), remaining);
    };

    if (document.readyState !== "loading") {
      finish();
      return;
    }

    document.addEventListener("DOMContentLoaded", finish, { once: true });
    const fallback = window.setTimeout(finish, MAX_OVERLAY_MS);

    return () => {
      document.removeEventListener("DOMContentLoaded", finish);
      window.clearTimeout(fallback);
    };
  }, []);

  if (isLoaded) return null;

  return <PageLoader variant="overlay" label="Loading site" />;
}
