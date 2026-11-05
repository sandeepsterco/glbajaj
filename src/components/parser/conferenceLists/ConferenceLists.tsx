
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api"
import Image from "next/image";
import Link from "next/link";
import PaginationWrapper from "../../common/pagination/PaginationWrapper";
import './conferenceList.css'
import { notFound } from "next/navigation";

const getConferenceLists = async (page: number) => {
    const { data, error } = await apiFetch(`research-conferences?page=${page}`);

    if (error) throw new Error(error);
    return data;
}

export default async function ConferenceLists({params, searchParams, pageName}:{params:any; searchParams:any; pageName:string}) {
    const currentPage = Number(searchParams.page) || 1;

    const data = await getConferenceLists(currentPage);

    const {parentSlug} = await params;
    const currentSlug = 'conferences';
    const conferenceData = data?.research_conferences;

    if (currentPage > 1 && !conferenceData?.data?.length) notFound();

    return (
        <>
            <div className="confrence_grid">
                {conferenceData?.data && conferenceData.data?.map((item: any) => (
                    <div className="confrence_grid_Bx" key={item.id}>
                        <figure  className="flash-effect-2">
                            <Image src={item.image || '/images/default/confrence.webp'} width={380} height={275} className="img-fluid" alt={item?.alt || pageName} />
                        </figure>
                        {item?.title && (
                            <p>{item.title}</p>
                        )}
                        {item?.slug && (
                            <>
                            {/* <img src="/images/icons/arrow-right.svg" alt="arrow" className="img-fluid arrow_icon" /> */}
                            <Link href={`${BASE_URL}${parentSlug}/${currentSlug}/${item.slug}`} className="strech_link"></Link>
                            </>
                        )}
                    </div>
                ))}
            </div>

            <PaginationWrapper
                currentPage={conferenceData?.current_page || 1}
                totalPages={conferenceData?.last_page || 1}
                basePath={`/${parentSlug}/${currentSlug}`}
            />
        </>
    )
}