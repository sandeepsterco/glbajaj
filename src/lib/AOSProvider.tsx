"use client";

import "aos/dist/aos.css";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  initAOS,
  refreshAOS,
  scheduleDebouncedRefreshAOS,
  scheduleRefreshAOSSequence,
} from "./aos";

function mutationAddsAosNodes(mutations: MutationRecord[]) {
  return mutations.some((mutation) => {
    if (
      mutation.type === "attributes" &&
      mutation.attributeName?.startsWith("data-aos")
    ) {
      return true;
    }

    if (mutation.type !== "childList") return false;

    for (const node of mutation.addedNodes) {
      if (!(node instanceof Element)) continue;
      if (node.hasAttribute("data-aos") || node.querySelector("[data-aos]")) {
        return true;
      }
    }

    return false;
  });
}

export default function AOSProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    initAOS();
  }, []);

  useEffect(() => {
    const cleanup = scheduleRefreshAOSSequence();
    return cleanup;
  }, [pathname]);

  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) refreshAOS();
    };

    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  useEffect(() => {
    const container = document.querySelector(".main-container");
    if (!container) return;

    const observer = new MutationObserver((mutations) => {
      if (mutationAddsAosNodes(mutations)) {
        scheduleDebouncedRefreshAOS();
      }
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-aos", "data-aos-delay", "class"],
    });

    return () => observer.disconnect();
  }, [pathname]);

  return children;
}
