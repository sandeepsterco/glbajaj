"use client"
import { apiFetch } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SkeletonGroup } from "../ui/Skeleton";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { BASE_URL } from "@/src/config/config";
import PaginationWrapper from "../common/pagination/PaginationWrapper";


const fetchDigitalPathshalaData = async (page: number) => {
  const { data, error } = await apiFetch(`clubs-societies?page=${page}`);
  if (error) throw new Error(error);
  return data?.clubs_and_societies;
};

export default function WhyClubsGrid() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  
  const slug = pathname.split('/').filter(Boolean).pop();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["glb_pathshala", page],
    queryFn: () => fetchDigitalPathshalaData(page),
  });

  if (isLoading) return <SkeletonGroup count={6} wrapperClassName="grid gap-[3rem]" className="w-full h-[50rem]" />;

  return (
    <>
      <div className="media_grid">
        {data?.data && data.data?.length > 0 && data.data.map((item:any, idx:number)=>(
          <div key={idx} className="media_grid_Bx1">
            <figure className="flash-effect-2">
              <Image src={item?.image ?? '/images/default/clubs_society.webp'} width={221} height={163} className="img-fluid" alt={item?.title ?? 'clubs & society image'} loading="lazy" />
            </figure>
            <div className="media_txt">
              {item?.title && (
                <p>{item.title}</p>
              )}
              {item?.slug && (
                <Link className="cus-btn btn" href={`${BASE_URL}${slug}/${item.slug}`}>View Club Detail</Link>
              )}
            </div>
          </div>
        ))}
        
      </div>

      <PaginationWrapper
                    currentPage={data?.current_page || 1}
                    totalPages={data?.last_page || 1}
                />
    </>
  );
}