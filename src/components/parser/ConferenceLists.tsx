"use client"

import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image";
import Link from "next/link";
import { SkeletonGroup } from "../ui/Skeleton";
import { usePathname } from "next/navigation";

const getConferenceLists = async () => {
    const { data, error } = await apiFetch(`research-conferences`);

    if (error) throw new Error(error);
    return data;
}

export default function ConferenceLists() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["conferences-symposium"],
        queryFn: getConferenceLists
    })

    const pathname = usePathname();
    const slug = pathname.split('/').filter(Boolean).pop();

    if (isLoading) {
        return (
            <SkeletonGroup wrapperClassName="mt-[7.7rem] grid-cols-3 gap-[4rem]" count={6} className="bg-gray-300 h-[40rem] w-[100%]" />
        );
    }

    const conferenceData = data?.research_conferences;

    return (
        <div className="confrence_grid">
            {conferenceData?.data  && conferenceData.data?.map((item:any, idx:number)=>(
                <div className="confrence_grid_Bx">
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
    )
}