"use client"

import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image";
import Link from "next/link";
import { SkeletonGroup } from "../ui/Skeleton";
import { usePathname } from "next/navigation";

const getAchievement = async () => {
    const { data, error } = await apiFetch(`achivements`);

    if (error) throw new Error(error);
    return data;
}

export default function AchievementList() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["achievement-list"],
        queryFn: getAchievement
    })

    const pathname = usePathname();
    const slug = pathname.split('/').filter(Boolean).pop();

    if (isLoading) {
        return (
            <SkeletonGroup wrapperClassName="mt-[7.7rem]" count={2} className="bg-gray-300 h-[40rem] w-[100%]" />
        );
    }

    const achievementData = data?.achivements;

    return (
        <div className="award-list">
            {achievementData?.data && achievementData.data?.map((item: any, idx: number) => (
                <div key={idx} className="award-box relative">
                    <figure>
                        <Image src={item.image || ''} width={600} height={443} className="w-100" alt="award"  data-aos="fade-up" data-aos-delay="200"/>
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
    )
}