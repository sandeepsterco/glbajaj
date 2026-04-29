"use client"

import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image";
import Link from "next/link";
import { SkeletonGroup } from "../ui/Skeleton";
import { usePathname } from "next/navigation";

const getAwards = async () => {
    const { data, error } = await apiFetch(`award-recognitions`);

    if (error) throw new Error(error);
    return data;
}

export default function AwardsList() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["about-leadership"],
        queryFn: getAwards
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
        <div className="award-list">
            {awardsData?.data && awardsData.data?.map((item: any, idx: number) => (
                <div key={idx} className="award-box relative">
                    <figure>
                        <Image src={item.image || ''} width={600} height={443} className="w-100" alt="award" />
                    </figure>
                    {item?.title && (
                        <p>{item.title}</p>
                    )}
                    {item?.slug && (
                        <Link href={`${BASE_URL}${slug}/${item.slug}`} className="strech_link" />
                    )}
                </div>
            ))}

        </div>
    )
}