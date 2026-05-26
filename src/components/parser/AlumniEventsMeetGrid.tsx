"use client"
import { apiFetch } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SkeletonGroup } from "../ui/Skeleton";
import Link from "next/link";
import { BASE_URL } from "@/src/config/config";
import { usePathname } from "next/navigation";

const fetchAlumniEventsGrid = async (page: number) => {
  const { data, error } = await apiFetch(`alumni-events?page=${page}`);
  if (error) throw new Error(error);
  return data?.alumni_events;
};

export default function AlumniEventsMeetGrid() {
  const [page, setPage] = useState(1);
  const [allItems, setAllItems] = useState<any[]>([]);
  const pathname = usePathname();
  const slug = pathname.split('/').filter(Boolean).pop();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["glb_pathshala", page],
    queryFn: () => fetchAlumniEventsGrid(page),
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

  const handleLoadMore = () => {
    if (!isFetching && !isLastPage) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className="award-list" >
        {allItems.map((item: any, idx: number) => (
          <div className="award-box" key={idx}>
            <figure>
              <Image src={item?.item ?? '/images/default/gallery-main.webp'} className="img-fluid w-100" width={600} height={443} loading="lazy" alt={item?.title ?? 'alumni events'} />
            </figure>
            {item?.title && (
              <p>{item.title}</p>
            )}
            <Link href={`${BASE_URL}${slug}/${item.slug}`} className="strech_link" />
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