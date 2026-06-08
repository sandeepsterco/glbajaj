"use client"
import { apiFetch } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SkeletonGroup } from "../ui/Skeleton";

declare global {
  interface Window {
    Fancybox: any;
  }
}

const fetchDigitalPathshalaData = async (page: number) => {
  const { data, error } = await apiFetch(`glb-pathshala?page=${page}`);
  if (error) throw new Error(error);
  return data?.GLBPathshala;
};

// Converts any YouTube URL format to an embeddable URL
const getYouTubeEmbedUrl = (url: string): string => {
  try {
    const parsed = new URL(url);
    if (parsed.pathname.startsWith("/embed/")) return url;
    if (parsed.hostname === "youtu.be") return `https://www.youtube.com/embed${parsed.pathname}`;
    const videoId = parsed.searchParams.get("v");
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    return url;
  } catch {
    return url;
  }
};

export default function DigitalPathshalaVideoGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [allItems, setAllItems] = useState<any[]>([]);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["glb_pathshala", page],
    queryFn: () => fetchDigitalPathshalaData(page),
  });

  const isLastPage = data?.current_page >= data?.last_page;

  // Accumulate items across pages
  useEffect(() => {
    if (data?.data && data.data.length > 0) {
      setAllItems((prev) =>
        page === 1 ? data.data : [...prev, ...data.data]
      );
    }
  }, [data]);

  // Load Fancybox CSS + JS dynamically (once)
  useEffect(() => {
    if (!document.getElementById("fancybox-css")) {
      const link = document.createElement("link");
      link.id = "fancybox-css";
      link.rel = "stylesheet";
      link.href = "https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css";
      document.head.appendChild(link);
    }

    if (!document.getElementById("fancybox-js")) {
      const script = document.createElement("script");
      script.id = "fancybox-js";
      script.src = "https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.umd.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Attach click handlers whenever accumulated items change
  useEffect(() => {
    if (!allItems || allItems.length === 0) return;

    const init = () => {
      const container = containerRef.current;
      if (!container || !window.Fancybox) return;

      const items = container.querySelectorAll<HTMLElement>(".digital-patsala");
      const handlers: { el: HTMLElement; fn: () => void }[] = [];

      items.forEach((item, index) => {
        const fn = () => {
          const gallery: { src: string; type: string; caption: string }[] = [];

          items.forEach((el) => {
            const videoUrl = el.getAttribute("data-video-url") ?? "";
            gallery.push({
              src: getYouTubeEmbedUrl(videoUrl),
              type: "iframe",
              caption: el.getAttribute("data-caption") ?? "",
            });
          });

          window.Fancybox.show(gallery, {
            startIndex: index,
            Thumbs: false,
          });
        };

        item.addEventListener("click", fn);
        handlers.push({ el: item, fn });
      });

      return () => {
        handlers.forEach(({ el, fn }) => el.removeEventListener("click", fn));
      };
    };

    if (window.Fancybox) {
      return init();
    }

    const script = document.getElementById("fancybox-js") as HTMLScriptElement;
    if (!script) return;

    let cleanup: (() => void) | undefined;
    const onLoad = () => { cleanup = init(); };
    script.addEventListener("load", onLoad);

    return () => {
      script.removeEventListener("load", onLoad);
      cleanup?.();
    };
  }, [allItems]);

  const handleLoadMore = () => {
    if (!isFetching && !isLastPage) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className="digital-pathshala-grid" ref={containerRef}>
        {allItems.map((item: any, idx: number) => (
          <div
            key={idx}
            className="digital-patsala"
            data-src={item?.thumbnail}
            data-video-url={item?.video_url ?? ""}
            data-caption={item?.title ?? ""}
            style={{ cursor: "pointer" }}
          >
            <figure  className="flash-effect-2">
              <Image
                src={item?.thumbnail}
                className="img-fluid w-100"
                width={603}
                height={506}
                alt={item?.title ?? "digital pathshala"}
                loading="lazy"
              />
              <span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/plybtn.svg"
                  className="img-fluid"
                  alt="video play"
                />
              </span>
              <figcaption>
                <h3>{item?.title ?? "Principle of Programming Language by Dr. Saurabh Goel"}</h3>
              </figcaption>
            </figure>
          </div>
        ))}
        
      </div>

      {isFetching && (
          <SkeletonGroup count={6} wrapperClassName="grid gap-[3rem]" className="w-full h-[50rem]" />
        )}

      {!isLastPage && (
        <div className="dg-pathshala-btn">
          <a
            href="#0"
            className="supporting-btn"
            onClick={(e) => {
              e.preventDefault();
              handleLoadMore();
            }}
          >
            {isFetching ? "Loading..." : "Load More"}
          </a>
        </div>
      )}
    </>
  );
}