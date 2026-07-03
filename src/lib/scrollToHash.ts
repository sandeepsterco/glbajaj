const DEFAULT_HEADER_OFFSET = 200;
const MAX_WAIT_MS = 10000;
const STABILIZE_MS = 2500;

export type ScrollToHashOptions = {
  offset?: number;
  behavior?: ScrollBehavior;
};

function getHashId(hash?: string): string | null {
  const raw = hash ?? (typeof window !== "undefined" ? window.location.hash : "");
  const id = raw.replace(/^#/, "").trim();
  return id || null;
}

export function scrollToHashElement(
  id: string,
  options: ScrollToHashOptions = {}
): boolean {
  const el = document.getElementById(id);
  if (!el) return false;

  const behavior = options.behavior ?? "smooth";
  const scrollMarginTop =
    parseFloat(window.getComputedStyle(el).scrollMarginTop) || 0;

  if (scrollMarginTop > 0) {
    el.scrollIntoView({ behavior, block: "start" });
    return true;
  }

  const offset = options.offset ?? DEFAULT_HEADER_OFFSET;
  const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top: y, behavior });
  return true;
}

/**
 * Waits for a hash target to appear in the DOM (e.g. after ReactParser renders)
 * then scrolls to it with a fixed header offset. Keeps correcting the scroll
 * position for a short window afterwards, since lazily-loaded widgets
 * (dynamic() imports with skeleton fallbacks) often resize right after we land.
 */
export function scrollToHashWhenReady(
  hash?: string,
  options: ScrollToHashOptions = {}
): () => void {
  if (typeof window === "undefined") return () => {};

  const id = getHashId(hash);
  if (!id) return () => {};

  let cancelled = false;
  let resizeObserver: ResizeObserver | null = null;
  let stabilizeTimeout: number | null = null;

  const stopStabilizing = () => {
    resizeObserver?.disconnect();
    resizeObserver = null;
    if (stabilizeTimeout) {
      window.clearTimeout(stabilizeTimeout);
      stabilizeTimeout = null;
    }
  };

  const stabilizeScroll = () => {
    const el = document.getElementById(id);
    if (!el) return;

    let lastTop = el.getBoundingClientRect().top;

    resizeObserver = new ResizeObserver(() => {
      if (cancelled) return;
      const newTop = el.getBoundingClientRect().top;
      if (Math.abs(newTop - lastTop) > 2) {
        scrollToHashElement(id, { ...options, behavior: "auto" });
        lastTop = el.getBoundingClientRect().top;
      }
    });
    resizeObserver.observe(document.body);

    stabilizeTimeout = window.setTimeout(stopStabilizing, STABILIZE_MS);
  };

  const tryScroll = () => {
    if (cancelled) return true;
    const success = scrollToHashElement(id, options);
    if (success) stabilizeScroll();
    return success;
  };

  if (tryScroll()) {
    return () => {
      cancelled = true;
      stopStabilizing();
    };
  }

  const observer = new MutationObserver(() => {
    if (tryScroll()) observer.disconnect();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  const timeout = window.setTimeout(() => observer.disconnect(), MAX_WAIT_MS);

  return () => {
    cancelled = true;
    observer.disconnect();
    window.clearTimeout(timeout);
    stopStabilizing();
  };
}