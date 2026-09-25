"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export type SyncInit = (root: HTMLElement) => () => void;
export type GatedTask = [selector: string, loader: (root: HTMLElement) => Promise<() => void>];

function waitForLayout() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

export function createCmsEnhancer(syncInits: SyncInit[], gatedTasks: GatedTask[]) {
  return function CmsEnhancer({ containerId }: { containerId: string }) {
    const pathname = usePathname();

    useEffect(() => {
      let cancelled = false;
      const cleanupFns: (() => void)[] = [];

      async function init() {
        await waitForLayout();
        if (cancelled) return;

        const root = document.getElementById(containerId);
        if (!root) return;

        // ── Synchronous, no-dependency modules ────────────────────────
        for (const run of syncInits) {
          cleanupFns.push(run(root));
        }

        if (cancelled) return;

        // ── Swiper / Fancybox modules — gated on selector presence ────
        for (const [selector, loader] of gatedTasks) {
          if (cancelled) return;
          if (!root.querySelector(selector)) continue;
          try {
            const cleanup = await loader(root);
            if (cancelled) {
              cleanup();
              return;
            }
            cleanupFns.push(cleanup);
          } catch (err) {
            console.error(`CmsEnhancer: failed to init "${selector}"`, err);
          }
        }
      }

      init();

      return () => {
        cancelled = true;
        cleanupFns.forEach((cleanup) => cleanup());
      };
    }, [containerId, pathname]);

    return null;
  };
}