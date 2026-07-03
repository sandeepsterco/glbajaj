const MAIN_CONTAINER_SELECTOR = ".main-container";
const PARSER_DYNAMIC_SELECTOR = "[data-react-parser-dynamic]";

export function getMainContainer() {
  if (typeof document === "undefined") return null;
  return document.querySelector(MAIN_CONTAINER_SELECTOR);
}

export function isRouteSkeletonVisible() {
  return Boolean(
    document.querySelector(`${MAIN_CONTAINER_SELECTOR} .page-loader-content`)
  );
}

function hasActiveParserDynamic() {
  return Boolean(document.querySelector(PARSER_DYNAMIC_SELECTOR));
}

function isStaticMainContentReady(container: Element) {
  if (container.querySelector(".happenings_page, .innerPage_wrapper, .program_page")) {
    const text = container.textContent?.trim() ?? "";
    return text.length > 120;
  }

  const main = container.querySelector("main");
  if (main) {
    const middleBlocks = Array.from(main.children).filter((child) => {
      const el = child as HTMLElement;
      if (el.matches(".full_image_banner, .home_banner, [class*='banner'], .page-loader-content")) {
        return false;
      }
      return el.offsetHeight > 60 || (el.textContent?.trim().length ?? 0) > 30;
    });

    if (middleBlocks.length > 0) return true;
  }

  const text = container.textContent?.trim() ?? "";
  return container.scrollHeight > 320 && text.length > 120;
}

export function isMiddleContentReady() {
  const container = getMainContainer();
  if (!container) return false;
  if (isRouteSkeletonVisible()) return false;

  if (container.getAttribute("data-route-content-ready") === "true") {
    return true;
  }

  if (container.getAttribute("data-awaiting-parser") === "true") {
    if (hasActiveParserDynamic()) return false;
    container.removeAttribute("data-awaiting-parser");
  }

  return isStaticMainContentReady(container);
}

export function markAwaitingParser() {
  const container = getMainContainer();
  container?.setAttribute("data-awaiting-parser", "true");
  container?.removeAttribute("data-route-content-ready");
}

export function markRouteContentReady() {
  const container = getMainContainer();
  container?.removeAttribute("data-awaiting-parser");
  container?.setAttribute("data-route-content-ready", "true");
}

export function resetRouteContentReady() {
  getMainContainer()?.removeAttribute("data-route-content-ready");
}
