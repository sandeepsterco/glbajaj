"use client"

import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image";
import Link from "next/link";
import { SkeletonGroup } from "../ui/Skeleton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "../common/pagination/Pagination";

const getConferenceLists = async (page: number) => {
    const { data, error } = await apiFetch(`research-conferences?page=${page}`);

    if (error) throw new Error(error);
    return data;
}

export default function ConferenceLists() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const { data, isLoading, isError } = useQuery({
        queryKey: ["conferences-symposium", currentPage],
        queryFn: () => getConferenceLists(currentPage)
    })

    const pathname = usePathname();
    const slug = pathname.split('/').filter(Boolean).pop();
    const conferenceData = data?.research_conferences;

    const handlePageChange = (page: number) => {
        if (!conferenceData || page < 1 || page > conferenceData.last_page || page === currentPage) {
            return;
        }

        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(page));
        router.push(`${pathname}?${params.toString()}`);
    };

    if (isLoading) {
        return (
            <SkeletonGroup wrapperClassName="mt-[7.7rem] grid-cols-3 gap-[4rem]" count={6} className="bg-gray-300 h-[40rem] w-[100%]" />
        );
    }

    if (isError) {
        return null;
    }

    return (
        <>
            <div className="confrence_grid">
                {conferenceData?.data && conferenceData.data?.map((item: any) => (
                    <div className="confrence_grid_Bx" key={item.id}>
                        <figure>
                            <Image src={item.image || '/images/default/confrence.webp'} width={380} height={275} className="img-fluid" alt={item.title} />
                        </figure>
                        {item?.title && (
                            <p>{item.title}</p>
                        )}
                        <img src="/images/icons/arrow-right.svg" alt="arrow" className="img-fluid arrow_icon" />
                        {item?.slug && (
                            <Link href={`${BASE_URL}${slug}/${item.slug}`} className="strech_link"></Link>
                        )}
                    </div>
                ))}
            </div>

            <Pagination
                currentPage={conferenceData?.current_page || 1}
                totalPages={conferenceData?.last_page || 1}
                onPageChange={handlePageChange}
                maxVisiblePages={5}
            />
        </>
    )
}