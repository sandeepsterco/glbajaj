// components/RouteChangeHandler.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global{
    interface Window {
        __initCustomJS?: () => void;
      }
}



export default function RouteChangeHandler() {
  const pathname = usePathname();

  useEffect(() => {
    // Small delay to let the new DOM paint before initializing
    const timer = setTimeout(() => {
      if (typeof window.__initCustomJS === "function") {
        window.__initCustomJS();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}