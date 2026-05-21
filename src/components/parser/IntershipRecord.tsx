"use client"

import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image";
import Link from "next/link";
import { SkeletonGroup } from "../ui/Skeleton";
import { usePathname } from "next/navigation";

const getConferenceLists = async () => {
    const { data, error } = await apiFetch(`intern`);

    if (error) throw new Error(error);
    return data;
}

export default function IntershipRecord() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["placement-record"],
        queryFn: getConferenceLists
    })

    const pathname = usePathname();
    const slug = pathname.split('/').filter(Boolean).pop();

    if (isLoading) {
        return (
            <SkeletonGroup wrapperClassName="mt-[7.7rem] grid-cols-3 gap-[4rem]" count={6} className="bg-gray-300 h-[40rem] w-[100%]" />
        );
    }

    const placement_data = data?.intern?.data;

    return (
        <div className="placement_grid">
            {placement_data && placement_data?.map((item:any, idx:number)=>(
                <div key={idx} className="place_box relative">
                    <div className="place_imgbox">
                        <figure>
                            <img src={item.image ?? ''} alt={item?.name} />
                        </figure>
                        {item?.logo_image && (
                            <div className="place_complog">
                                <figure>
                                    <img src={item?.logo_image ?? ''} alt="company logo" />
                                </figure>
                            </div>
                        )}
                        
                    </div>
                    <div className="place_infobox">
                        <h3 >{item.name}</h3>
                        <p >{item?.course && <><strong>{item?.course}</strong> |</>} {item?.batch && <>Batch <strong>{item.batch}</strong></>} </p>

                        {item?.package && (
                            <div className="place_pkg">
                                <h3 className="font36">Package ₹<strong>{item.package}</strong></h3>
                            </div> 
                        )}
                        
                    </div>
                    <Link className="strech_link" href={`${BASE_URL}internship/${item?.slug ?? '#'}`} />
                </div>
            ))}
            

        </div>
    )
}