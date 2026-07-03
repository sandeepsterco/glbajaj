import AOS from "aos";

export const AOS_OPTIONS = {
  duration: 900,
  once: true,
  offset: 50,
} as const;

let initialized = false;
let debounceTimer: any| null = null;

function revealInViewportElements() {
  const offset = AOS_OPTIONS.offset;
  const viewHeight = window.innerHeight;

  document
    .querySelectorAll<HTMLElement>("[data-aos].aos-init:not(.aos-animate)")
    .forEach((el) => {
      const { top, bottom } = el.getBoundingClientRect();
      if (top < viewHeight - offset && bottom > 0) {
        el.classList.add("aos-animate");
      }
    });
}

export function initAOS() {
  if (initialized || typeof window === "undefined") return;
  AOS.init(AOS_OPTIONS);
  initialized = true;
}

/** Re-scan DOM and animate any [data-aos] elements already in the viewport. */
export function refreshAOS() {
  if (typeof window === "undefined") return;

  initAOS();
  AOS.refreshHard();

  requestAnimationFrame(() => {
    revealInViewportElements();
  });
}

export function scheduleDebouncedRefreshAOS(debounceMs = 80) {
  if (debounceTimer) window.clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(() => {
    debounceTimer = null;
    refreshAOS();
  }, debounceMs);
}

export function scheduleRefreshAOSSequence() {
  refreshAOS();
  const delays = [150, 400, 800, 1500];
  const timers = delays.map((delay) => window.setTimeout(refreshAOS, delay));
  return () => timers.forEach((id) => window.clearTimeout(id));
}
