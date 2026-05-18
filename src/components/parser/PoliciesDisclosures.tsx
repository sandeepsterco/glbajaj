"use client"

import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api"
import { useQuery } from "@tanstack/react-query"
import { SkeletonGroup } from "../ui/Skeleton";
import PaginationWrapper from "../common/pagination/PaginationWrapper";
import { useSearchParams } from "next/navigation";

const getPolicyLists = async (page:number) => {
    
    const { data, error } = await apiFetch(`policies-pdf`);

    if (error) throw new Error(error);
    return data?.policies_pdf;
}

const PolicyItem = ({ item, idx }: { item: any; idx: number }) => (
    <div
      className="fac_policy_list"
      data-aos="fade-up"
      data-aos-delay={600 + (idx + 1) * 100}
    >
      <div className="fac_policy_left">
        <h5>{item?.title}</h5>
      </div>
      <div className="fac_policy_right">
        <figure>
          <img
            src="https://project-demo.in/gl-bajaj/assets/img/page-file/1778482442_OwH01DuXvRFZa392zsX9.svg"
            className="img-fluid"
            alt="pdf"
          />
        </figure>
        {/* <p>Download</p> */}
      </div>
      <a target="_blank" href={item.pdf} className="strech_link" rel="noreferrer" />
    </div>
  );

export default function PoliciesDisclosures() {
    const searchParams = useSearchParams();
    const page = searchParams.get('page');
    const currentPage = Number(page) || 1;

    const { data, isLoading, isError } = useQuery({
        queryKey: ["policy-disclosure"],
        queryFn: ()=>getPolicyLists(currentPage)
    })

    if (isLoading) {
        return (
            <SkeletonGroup wrapperClassName="mt-[7.7rem] !block" count={5} className="bg-gray-300 h-[10rem] w-[100%] !mb-[1rem] block" />
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="mb-4 text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Failed to Load Policies
                </h3>
                <p className="text-gray-500 text-sm max-w-md">
                    {"Something went wrong while fetching the policies. Please try again later."}
                </p>
            </div>
        );
    }

    const policiesData = data;

    return (
        <>
            {Object.entries(policiesData).map(([key, value])=>{
                return (
                    <>
                        <h2 className="font24" data-aos="fade-up" data-aos-delay="400">{key}</h2>

                        {Array.isArray(value) ? 
                            value.map((item:any, idx:number)=>(
                                <PolicyItem key={item.id ?? idx} item={item} idx={idx} />
                            )) 
                            : 
                            Object.entries(value).map(([subKey, subItems]: [string, any]) => (
                                <div key={subKey} className="policy_subgroup">
                                    <h4  data-aos="fade-up" data-aos-delay="400">{subKey}</h4>
                                    {subItems.map((item: any, idx: number) => (
                                    <PolicyItem key={item.id ?? idx} item={item} idx={idx} />
                                    ))}
                                </div>
                            ))
                        }
                    </>
                )
            })}
            
            {/* <PaginationWrapper
                    currentPage={data?.current_page || 1}
                    totalPages={data?.last_page || 1}
                /> */}
        </>
    )
}