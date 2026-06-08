// components/RouteChangeHandler.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    __initCustomJS?: () => void;
    __scheduleInitCustomJS?: () => void;
  }
}



export default function RouteChangeHandler() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.__scheduleInitCustomJS === "function") {
      window.__scheduleInitCustomJS();
    } else if (typeof window.__initCustomJS === "function") {
      window.__initCustomJS();
    }
  }, [pathname]);

  return null;
}