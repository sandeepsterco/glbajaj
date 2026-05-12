"use client"

import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api"
import { useQuery } from "@tanstack/react-query"
import { SkeletonGroup } from "../ui/Skeleton";

const getPolicyLists = async () => {
    const { data, error } = await apiFetch(`policies-pdf`);

    if (error) throw new Error(error);
    return data?.policies_pdf;
}

export default function PoliciesDisclosures() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["policy-disclosure"],
        queryFn: getPolicyLists
    })

    if (isLoading) {
        return (
            <SkeletonGroup wrapperClassName="mt-[7.7rem] !block" count={5} className="bg-gray-300 h-[10rem] w-[100%] !mb-[1rem] block" />
        );
    }

    const policiesData = data?.data;

    return (
        <>
            {policiesData?.length > 0 && policiesData?.map((item:any, idx:number)=>(
                <div key={idx} className="fac_policy_list" data-aos="fade-up" data-aos-delay={600+((idx+1)*100)}>
                    <div className="fac_policy_left">
                        <h5>{item?.title}</h5>
                    </div>
                    <div className="fac_policy_right">
                        <figure>
                            <img src="https://project-demo.in/gl-bajaj/assets/img/page-file/1778482442_OwH01DuXvRFZa392zsX9.svg" className="img-fluid" alt="pdf" />
                        </figure>
                        <p>Download</p>
                    </div>
                    <a target="_blank" href={item.pdf} className="strech_link"></a>
                </div>
            ))}
        </>
    )
}