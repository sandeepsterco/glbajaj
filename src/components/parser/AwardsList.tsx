"use client"

import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image";
import Link from "next/link";
import { SkeletonGroup } from "../ui/Skeleton";
import { usePathname, useSearchParams } from "next/navigation";
import PaginationWrapper from "../common/pagination/PaginationWrapper";

const getAwards = async (page:number) => {
    
    const { data, error } = await apiFetch(`award-recognitions?page=${page}`);
    if (error) throw new Error(error);
    return data;
}

export default function AwardsList() {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;

    const { data, isLoading, isError } = useQuery({
        queryKey: ["about-leadership", page],
        queryFn: ()=>getAwards(page)
    })

    const pathname = usePathname();
    const slug = pathname.split('/').filter(Boolean).pop();

    if (isLoading) {
        return (
            <SkeletonGroup wrapperClassName="mt-[7.7rem]" count={2} className="bg-gray-300 h-[40rem] w-[100%]" />
        );
    }

    const awardsData = data?.awards;

    return (
        <>
            <div className="award-list">
                {awardsData?.data && awardsData.data?.map((item: any, idx: number) => (
                    <div key={idx} className="award-box relative">
                        <figure className="flash-effect">
                            <Image src={item.image || ''} width={600} height={443} className="w-100" alt="award" data-aos="fade-up" data-aos-delay="200" />
                        </figure>
                        {item?.title && (
                            <p data-aos="fade-up" data-aos-delay="400">{item.title}</p>
                        )}
                        {item?.slug && (
                            <Link href={`${BASE_URL}${slug}/${item.slug}`} className="strech_link" />
                        )}
                    </div>
                ))}

            </div>

            <PaginationWrapper
                currentPage={awardsData?.current_page || 1}
                totalPages={awardsData?.last_page || 1}
            />
        </>
    )
}