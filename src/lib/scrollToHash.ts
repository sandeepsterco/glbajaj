const DEFAULT_HEADER_OFFSET = 200;
const MAX_WAIT_MS = 10000;

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
 * then scrolls to it with a fixed header offset.
 */
export function scrollToHashWhenReady(
  hash?: string,
  options: ScrollToHashOptions = {}
): () => void {
  if (typeof window === "undefined") return () => {};

  const id = getHashId(hash);
  if (!id) return () => {};

  let cancelled = false;

  const tryScroll = () => {
    if (cancelled) return true;
    return scrollToHashElement(id, options);
  };

  if (tryScroll()) return () => { cancelled = true; };

  const observer = new MutationObserver(() => {
    if (tryScroll()) observer.disconnect();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  const timeout = window.setTimeout(() => observer.disconnect(), MAX_WAIT_MS);

  return () => {
    cancelled = true;
    observer.disconnect();
    window.clearTimeout(timeout);
  };
}
