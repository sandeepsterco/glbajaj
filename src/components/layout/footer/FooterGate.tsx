"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { isMiddleContentReady, resetRouteContentReady } from "@/src/lib/mainContentReady";

const POLL_MS = 80;
const MAX_WAIT_MS = 8000;

export default function FooterGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    setShowFooter(false);
    resetRouteContentReady();

    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      cleanupRef?.();
      setShowFooter(true);
    };

    const tryFinish = () => {
      if (isMiddleContentReady()) {
        finish();
        return true;
      }
      return false;
    };

    let cleanupRef: (() => void) | null = null;

    if (tryFinish()) return;

    const poll = window.setInterval(() => {
      if (tryFinish()) window.clearInterval(poll);
    }, POLL_MS);

    const maxTimeout = window.setTimeout(finish, MAX_WAIT_MS);

    const container = document.querySelector(".main-container");
    const observer = container
      ? new MutationObserver(() => {
          tryFinish();
        })
      : null;

    observer?.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-awaiting-parser", "data-route-content-ready", "class"],
    });

    cleanupRef = () => {
      window.clearInterval(poll);
      window.clearTimeout(maxTimeout);
      observer?.disconnect();
    };

    return cleanupRef;
  }, [pathname]);

  if (!showFooter) return null;

  return <>{children}</>;
}
