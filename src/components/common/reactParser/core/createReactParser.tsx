import { Suspense, lazy, useMemo } from "react";
import parse, {
    attributesToProps,
    Element,
    HTMLReactParserOptions,
    domToReact,
  } from "html-react-parser";

  import Image from "next/image";
  import Link from "next/link";
  import DOMPurify from "isomorphic-dompurify";
  import HashLinkAnchor from "../HashLinkAnchor";
  import CmsEnhancer from "@/src/lib/CmsEnhancer";

  export type ParserCtx = { homeData?: any; params?: any; searchParams?: any; data?: any };
export type ComponentMap = Record<string, (ctx: ParserCtx) => React.ReactElement>;

const EMPTY_TAGS = new Set(["h1", "h2", "h3", "h4", "h5", "h6", "p"]);

const DOMPURIFY_ADD_ATTR = [
    "target",
    // "data-aos",
    // "data-aos-delay",
    // "data-aos-duration",
    // "data-aos-offset",
    // "data-aos-easing",
    // "data-aos-once",
    // "data-aos-mirror",
    // "data-aos-anchor",
    // "data-aos-anchor-placement",
  ];
  
  const DOMPURIFY_ALLOWED_TAGS = [
    "a", "b", "i", "em", "strong", "span", "div", "p",
    "h1", "h2", "h3", "h4", "h5", "h6",
    "ul", "ol", "li", "br", "hr",
    "img", "table", "thead", "tbody", "tr", "th", "td",
    "section", "article", "aside", "header", "footer",
    "figure", "figcaption", "blockquote", "pre", "code",
    "sup", "sub", "button", "iframe", "nav", "main",
    "picture", "source", "video", "audio",
    "svg", "path", "circle", "rect", "line", "polyline", "polygon", "g", "use",
    "label", "form", "input", "textarea", "select", "option",
    "dl", "dt", "dd", "small", "mark", "details", "summary",
  ];
  
  const DOMPURIFY_ALLOWED_ATTR = [
    "class", "id", "src", "alt", "href", "target",
    "width", "height", "style", "rel", "type",
    "data-src", "data-tab",
    "data-wow-delay", "data-wow-duration", "data-wow-offset", "data-wow-iteration",
    "data-aos", "data-aos-delay", "data-aos-duration", "data-aos-offset",
    "data-aos-easing", "data-aos-once", "data-aos-mirror",
    "data-aos-anchor", "data-aos-anchor-placement",
  ];

  function ParserWidgetFallback() {
    return (
      <div
        className="my-[2rem] h-[20rem] w-full animate-pulse rounded bg-[#ede9e7]"
        aria-hidden="true"
      />
    );
  }

  export function withLazyComponent(
    loader: () => Promise<{ default: React.ComponentType<any> }>,
    props?: Record<string, any>
  ) {
    const Component = lazy(loader);
    return (
      <Suspense fallback={<ParserWidgetFallback />}>
        <Component {...props} />
      </Suspense>
    );
  }

  function hasMeaningfulContent(node: any): boolean {
    if (node.type === "text") return node.data?.trim().length > 0;
    if (node.type === "tag") {
      if (node.attribs?.id) return true;
      if (["img","video","iframe","input","textarea","select"].includes(node.name)) return true;
      if (node.children?.length) return node.children.some(hasMeaningfulContent);
      return false;
    }
    return false;
  }

  function hashString(str: string): string {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) hash = (hash * 33) ^ str.charCodeAt(i);
    return (hash >>> 0).toString(36);
  }
  function getBaseParserOptions(map: ComponentMap, ctx: ParserCtx): HTMLReactParserOptions {
    const options: HTMLReactParserOptions = {
      replace(domNode) {
        if (!(domNode instanceof Element && domNode.attribs)) return;
  
        if (EMPTY_TAGS.has(domNode.name)) {
          const hasText = domNode.children.some(
            (c) => c.type === "text" && (c as any).data?.trim() !== ""
          );
          const hasElement = domNode.children.some((c) => c.type === "tag");
          if (!hasText && !hasElement) return <></>;
        }
  
        if (domNode.name === "a") {
          const props = attributesToProps(domNode.attribs) as any;
          const href = props.href?.trim();
          const classList = (domNode.attribs?.class || "").split(" ");
          if ((classList.includes("dynamic_btn") || classList.includes("strech_link")) && (!href || href === "#")) {
            return <></>;
          }
          const { href: _href, ...rest } = props;
          if (href && href.startsWith("#")) {
            return <HashLinkAnchor {...rest} href={href}>{domToReact(domNode.children as any, options)}</HashLinkAnchor>;
          }
          return <Link href={href || "#"} prefetch={false} {...rest}>{domToReact(domNode.children as any, options)}</Link>;
        }
  
        if (domNode.name === "img") {
          const props = attributesToProps(domNode.attribs) as any;
          const resolvedSrc = (() => {
            const s = props.src || "";
            if (!s) return "";
            if (s.startsWith("http") || s.startsWith("/") || s.startsWith("data:")) return s;
            return "/" + s;
          })();
          if (!resolvedSrc) return <></>;
          const parsedWidth = props.width && !isNaN(parseInt(props.width, 10)) ? parseInt(props.width, 10) : undefined;
          const parsedHeight = props.height && !isNaN(parseInt(props.height, 10)) ? parseInt(props.height, 10) : undefined;
          if (!parsedWidth || !parsedHeight) {
            const { src: _s, width: _w, height: _h, ...rest } = props;
            return <img {...rest} src={resolvedSrc} alt={props.alt || ""} loading="lazy" decoding="async" style={{ ...(props.style || {}) }} />;
          }
          return <Image {...props} src={resolvedSrc} alt={props.alt || ""} width={parsedWidth} height={parsedHeight} loading="lazy" style={{ ...(props.style || {}) }} />;
        }
  
        if (domNode.name === "iframe") {
          const classList = (domNode.attribs?.class || "").split(/\s+/);
          const src = (domNode.attribs?.src || "").trim();
          if (classList.includes("parser_common") && !src) return <></>;
        }
  
        if (domNode.name === "div") {
          const hasId = !!domNode.attribs?.id;
          const hasContent = (domNode.children || []).some(hasMeaningfulContent);
          if (!hasId && !hasContent) return <></>;
        }
  
        if (domNode.attribs?.class) {
          const cleaned = domNode.attribs.class.replace(/\baos-init\b/g, "").replace(/\baos-animate\b/g, "").replace(/\s+/g, " ").trim();
          if (cleaned) domNode.attribs.class = cleaned; else delete domNode.attribs.class;
        }
  
        if (domNode.attribs.id) {
          const factory = map[domNode.attribs.id];
          if (factory) return factory(ctx);
        }
      },
    };
    return options;
  }

  export function createReactParser(map: ComponentMap, Enhancer: React.ComponentType<{ containerId: string }>) {
    return function ReactParser({ html, homeData, params, searchParams, data }: { html: any } & ParserCtx) {
      const sanitizedHtml = useMemo(
        () =>
          DOMPurify.sanitize(html, {
            ADD_ATTR: DOMPURIFY_ADD_ATTR,
            ALLOWED_TAGS: DOMPURIFY_ALLOWED_TAGS,
            ALLOWED_ATTR: DOMPURIFY_ALLOWED_ATTR,
            ADD_DATA_URI_TAGS: ["img"],
            ALLOW_DATA_ATTR: true,
          }),
        [html]
      );
  
      const containerId = useMemo(() => `cms-block-${hashString(sanitizedHtml)}`, [sanitizedHtml]);
      const ctx = useMemo(() => ({ homeData, params, searchParams, data }), [homeData, params, searchParams, data]);
      const options = useMemo(() => getBaseParserOptions(map, ctx), [ctx]);
      const parsedContent = useMemo(() => parse(sanitizedHtml, options), [sanitizedHtml, options]);
  
      return (
        <div id={containerId}>
          {parsedContent}
          <Enhancer containerId={containerId} />
        </div>
      );
    };
  }
