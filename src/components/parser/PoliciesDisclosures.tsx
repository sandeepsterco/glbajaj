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

export default function PoliciesDisclosures() {
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
        <div>
            <div className="fac_policy_list" data-aos="fade-up" data-aos-delay="600">
                <div className="fac_policy_left">
                    <h5>test</h5>
                    <p>test date</p>
                </div>
                <div className="fac_policy_right">
                    <figure>
                        <img src="https://project-demo.in/gl-bajaj/assets/img/page-file/1778482442_OwH01DuXvRFZa392zsX9.svg" className="img-fluid" alt="pdf" />
                    </figure>
                    <p>Download</p>
                </div>
                <a target="_blank" href="{item.pdf}" className="strech_link"></a>
            </div>
        </div>
    )
}