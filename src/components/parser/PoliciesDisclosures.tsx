"use client"

import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api"
import { useQuery } from "@tanstack/react-query"
import { SkeletonGroup } from "../ui/Skeleton";
import { useState } from "react";

function isNestedPolicyMap(v: unknown): v is Record<string, any[]> {
    return typeof v === "object" && v !== null && !Array.isArray(v);
}

const getPolicyLists = async () => {
    const { data, error } = await apiFetch(`policies-pdf`);
    if (error) throw new Error(error);
    return data?.policies_pdf;
}

const PolicyItem = ({ item, idx }: { item: any; idx: number }) => (
    <div
        className="fac_policy_list">
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
        </div>
        <a target="_blank" href={item.pdf} className="strech_link" rel="noreferrer" />
    </div>
);

const PolicyTabContent = ({ value }: { value: any }) => {
    if (Array.isArray(value)) {
        return (
            <>
                {value.map((item: any, idx: number) => (
                    <PolicyItem key={item.id ?? idx} item={item} idx={idx} />
                ))}
            </>
        );
    }

    if (isNestedPolicyMap(value)) {
        return (
            <>
                {Object.entries(value).map(([subKey, subItems]) => (
                    <div key={subKey} className="policy_subgroup">
                        <h4>{subKey}</h4>
                        {subItems.map((item: any, idx: number) => (
                            <PolicyItem key={item.id ?? idx} item={item} idx={idx} />
                        ))}
                    </div>
                ))}
            </>
        );
    }

    return null;
};

export default function PoliciesDisclosures() {
    const [activeTab, setActiveTab] = useState<string | null>(null);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["policy-disclosure"],
        queryFn: getPolicyLists,
        select: (data) => {
            const entries = Object.entries(data ?? {});
            return { entries, firstKey: entries[0]?.[0] ?? null };
        }
    });

    // Set initial active tab once data loads
    const tabs = data?.entries ?? [];
    const resolvedActiveTab = activeTab ?? data?.firstKey ?? null;

    if (isLoading) {
        return (
            <SkeletonGroup
                wrapperClassName="mt-[7.7rem] !block"
                count={5}
                className="bg-gray-300 h-[10rem] w-[100%] !mb-[1rem] block"
            />
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
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Failed to Load Policies</h3>
                <p className="text-gray-500 text-sm max-w-md">
                    Something went wrong while fetching the policies. Please try again later.
                </p>
            </div>
        );
    }

    const activeContent = tabs.find(([key]) => key === resolvedActiveTab)?.[1];

    return (
        <>
            {/* Tab Headers */}
            <div className="policy_tabs_wrapper" data-aos="fade-up" data-aos-delay="300">
                <ul className="custom_pages_lists">
                    {tabs.map(([key]) => (
                        <li key={key} className={`tab_item ${resolvedActiveTab === key ? "active" : ""}`}>
                            <button
                                type="button"
                                onClick={() => setActiveTab(key)}
                                className="tab_btn"
                            >
                                {key}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Tab Content */}
            <div className="policy_tab_content" data-aos="fade-up" data-aos-delay="500">
                {activeContent != null && (
                    <PolicyTabContent value={activeContent} />
                )}
            </div>
        </>
    );
}