// hooks/useContainer25MaxWidth.ts
import { useEffect } from "react";

export function useContainer25MaxWidth() {
  useEffect(() => {
    let frozenWidth: number | null = null;

    const applyMaxWidth = () => {
      // Temporarily clear all max-content styles to get natural container size
      const targets = document.querySelectorAll(
        ".max-content, .max-content-sm, .max-content-md, .max-content-lg, .max-content-xl, .max-content-xxl"
      );

      targets.forEach((el) => {
        (el as HTMLElement).style.maxWidth = "";
      });

      // Use rAF to let browser reflow after clearing
      requestAnimationFrame(() => {
        const container = document.querySelector(".container25") as HTMLElement;
        if (!container) return;

        const windowWidth = window.innerWidth;
        const containerOffset = container.getBoundingClientRect().left + window.scrollX;
        const containerWidth = container.offsetWidth;
        const rightEdge_calc = containerOffset + containerWidth;

        let rightEdge = rightEdge_calc;

        if (windowWidth >= 2550) {
          if (!frozenWidth) {
            frozenWidth = rightEdge_calc;
          }
          rightEdge = frozenWidth;
        } else {
          frozenWidth = null;
        }

        targets.forEach((el) => {
          (el as HTMLElement).style.maxWidth = rightEdge + "px";
        });
      });
    };

    // Wait for full paint before first run — matches DOMContentLoaded timing in vanilla JS
    requestAnimationFrame(() => applyMaxWidth());

    window.addEventListener("resize", applyMaxWidth);

    return () => {
      window.removeEventListener("resize", applyMaxWidth);
    };
  }, []);
}