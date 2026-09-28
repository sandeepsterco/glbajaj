import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api"
import Image from "next/image";
import Link from "next/link";
import PaginationWrapper from "../../common/pagination/PaginationWrapper";
import './awardList.css'

const getAwards = async (page:number) => {
    
    const { data, error } = await apiFetch(`award-recognitions?page=${page}`);
    if (error) throw new Error(error);
    return data;
}

export default async function AwardsList({params, searchParams}:{params:any; searchParams:any}) {
    const page = Number(searchParams.page) || 1;

    const data = await getAwards(page);

    const {parentSlug, innerSlug} = await params;

    const awardsData = data?.awards;

    return (
        <>
            <div className="award-list">
                {awardsData?.data && awardsData.data?.map((item: any, idx: number) => (
                    <div key={idx} className="award-box relative">
                        <figure className="flash-effect">
                            <Image src={item.image || ''} width={600} height={443} className="w-100" alt="award" data-aos="fade-up" data-aos-delay="200" />
                        </figure>
                        {item?.title && (
                            <p data-aos="fade-up" data-aos-delay="400">{item.title}</p>
                        )}
                        {item?.slug && (
                            <Link href={`${BASE_URL}${parentSlug}/${innerSlug}/${item.slug}`} className="strech_link" />
                        )}
                    </div>
                ))}

            </div>

            <PaginationWrapper
                currentPage={awardsData?.current_page || 1}
                totalPages={awardsData?.last_page || 1}
            />
        </>
    )
}