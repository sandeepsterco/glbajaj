import { apiFetch } from "@/src/lib/api";
import Image from "next/image";
import Link from "next/link";
import { BASE_URL } from "@/src/config/config";
import PaginationWrapper from "../common/pagination/PaginationWrapper";


const fetchDigitalPathshalaData = async (page: number) => {
  const { data, error } = await apiFetch(`clubs-societies?page=${page}`);
  if (error) throw new Error(error);
  return data?.clubs_and_societies;
};

export default async function WhyClubsGrid({params, searchParams}:{params:any; searchParams:any}) {
  const page = Number(searchParams.page) || 1;
  
  const {parentSlug} = await params;
  const currentSlug = 'clubs';

  const data = await fetchDigitalPathshalaData(page);

  return (
    <>
      <div className="media_grid">
        {data?.data && data.data?.length > 0 && data.data.map((item:any, idx:number)=>(
          <div key={idx} className="media_grid_Bx1">
            <figure className="flash-effect-2">
              <Image src={item?.image ?? '/images/default/clubs_society.webp'} width={221} height={163} className="img-fluid" alt={item?.title ?? 'clubs & society image'} loading="lazy" />
            </figure>
            <div className="media_txt">
  {item?.title && (
    <p>
      <Link href={`${BASE_URL}${parentSlug}/${currentSlug}/${item.slug}`}>
        {item.title}
      </Link>
    </p>
  )}

</div>
          </div>
        ))}
        
      </div>

      <PaginationWrapper
                    currentPage={data?.current_page || 1}
                    totalPages={data?.last_page || 1}
                />
    </>
  );
}