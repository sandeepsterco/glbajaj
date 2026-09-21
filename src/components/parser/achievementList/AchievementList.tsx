import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api"
import Image from "next/image";
import Link from "next/link";
import { SkeletonGroup } from "../../ui/Skeleton";
import PaginationWrapper from "../../common/pagination/PaginationWrapper";

const getAchievement = async (page: number) => {
    const { data, error } = await apiFetch(`achivements?page=${page}`);

    if (error) throw new Error(error);
    return data;
}

export default async function AchievementList({searchParams}:{searchParams:any}) {
    const page = Number(searchParams?.page) || 1;


    const data = await getAchievement(page);

    const achievementData = data?.achivements;

    return (
        <>
            <div className="award-list">
                {achievementData?.data && achievementData.data?.map((item: any, idx: number) => (
                    <div key={idx} className="award-box relative">
                        <figure className="flash-effect-2">
                            <Image src={item.image || ''} width={600} height={443} className="w-100 img-fluid" loading="lazy" alt="award" data-aos="fade-up" data-aos-delay="200" />
                        </figure>
                        {item?.title && (
                            <p data-aos="fade-up" data-aos-delay="400">{item.title}</p>
                        )}
                        {item?.slug && (
                            <Link href={`${BASE_URL}why-glbitm/achievements/${item.slug}`} className="strech_link" />
                        )}
                    </div>
                ))}

            </div>

            <PaginationWrapper
                currentPage={achievementData?.current_page || 1}
                totalPages={achievementData?.last_page || 1}
            />
        </>
    )
}