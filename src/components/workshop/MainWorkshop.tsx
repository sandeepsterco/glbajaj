import { BASE_URL } from "@/src/config/config";
import Image from "next/image";
import Link from "next/link";
import DepartmentFilter from "../newsEvents/DepartmentFilter";
import NoData from "../ui/NoData";

export default function MainWorkshop({data, slug, departments, currentDepartment}:{data:any, slug:string, departments:any, currentDepartment:any}){
    if (!data) {
        return (
            <section className="news_section">
                <div className="container">
                    <div className="col-xl-11">
                        <div className="news_head mb-4">
                            <DepartmentFilter
                                departments={departments}
                                currentDepartment={currentDepartment}
                            />
                        </div>
                        <NoData heading="No workshops found" />
                    </div>
                </div>
            </section>
        );
    }

    return <section className="news_section">
    <div className="container">
        <div className="col-xl-11">
            <div className="front_news">
                <div className="news_left">
                    <figure>
                        <Image src={data?.image || '/images/default/main-news.webp' } alt="GL Bajaj" className="img-fluid" width={850} height={519} />
                    </figure>
                </div>
                <div className="news_right">
                    <div className="news_head">
                        <DepartmentFilter
                            departments={departments}
                            currentDepartment={currentDepartment}
                        />
                    </div>  
                    <div className="news_cnt">
                        {data?.date && <p className="date">{new Date(data.date).toLocaleDateString('en-US', {year:'numeric', month:'long', day:'numeric'})}</p>}

                        {data?.heading && (
                            <h3>{data.heading}</h3>
                        )}

                        {data?.description && (
                            <p>{data.description}</p>
                        )}

                        {data?.slug && (
                            <Link href={BASE_URL + slug + "/" + data.slug}>
                                <img src="/images/home/slide_arrow_right.svg" alt="arrow" className="img-fluid" />
                            </Link>
                        )}
                        
                        
                    </div>                      
                </div>
            </div>
        </div>               
    </div>
</section>
}