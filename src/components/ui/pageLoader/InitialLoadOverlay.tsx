"use client";

import { useEffect, useState } from "react";
import PageLoader from "./PageLoader";

export default function InitialLoadOverlay() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (document.readyState === "complete") {
      setIsLoaded(true);
      return;
    }

    const handleLoad = () => setIsLoaded(true);
    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  if (isLoaded) return null;

  return <PageLoader variant="overlay" label="Loading site" />;
}
