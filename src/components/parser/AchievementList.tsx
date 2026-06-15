"use client"

import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image";
import Link from "next/link";
import { SkeletonGroup } from "../ui/Skeleton";
import { usePathname, useSearchParams } from "next/navigation";
import PaginationWrapper from "../common/pagination/PaginationWrapper";

const getAchievement = async (page: number) => {
    const { data, error } = await apiFetch(`achivements?page=${page}`);

    if (error) throw new Error(error);
    return data;
}

export default function AchievementList() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;

    const slug = pathname.split('/').filter(Boolean).pop();

    const { data, isLoading, isError, isFetching } = useQuery({
        queryKey: ["achievement-list", page],
        queryFn: () => getAchievement(page)
    })

    const achievementData = data?.achivements;


    if (isLoading) {
        return (
            <SkeletonGroup wrapperClassName="mt-[7.7rem]" count={6} className="bg-gray-300 h-[40rem] w-[100%]" />
        );
    }

    return (
        <>
            <div className="award-list">
                {achievementData?.data && achievementData.data?.map((item: any, idx: number) => (
                    <div key={idx} className="award-box relative">
                        <figure className="flash-effect-2">
                            <Image src={item.image || ''} width={600} height={443} className="w-100 img-fluid" loading="lazy" alt="award" data-aos="fade-up" data-aos-delay="200" />
                        </figure>
                        {item?.title && (
                            <p data-aos="fade-up" data-aos-delay="400">{item.title}</p>
                        )}
                        {item?.slug && (
                            <Link href={`${BASE_URL}achievements/${item.slug}`} className="strech_link" />
                        )}
                    </div>
                ))}

            </div>

            <PaginationWrapper
                currentPage={achievementData?.current_page || 1}
                totalPages={achievementData?.last_page || 1}
            />
        </>
    )
}