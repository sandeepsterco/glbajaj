import { BASE_URL } from "@/src/config/config";
import Image from "next/image";
import Link from "next/link";
import PaginationWrapper from "../common/pagination/PaginationWrapper"; // adjust import path

export default function GalleryList({data, currentPage='gallery'}:{data:any, currentPage?:string}){
    const pagination = data; // current_page, last_page are at data level (data.others)

    return(
        <section className="gallery_list_section">
            <div className="container25">
                <div className="gallery_list">
                    {data?.data.map((item:any, idx:number)=>(
                        <div key={idx} className="gallery_list_bx">
                            <figure className="flash-effect-2"> 
                                <Image src={item.banner_image || '/images/default/gallery-list.webp'} width={392} height={261} loading="lazy" className="img-fluid" alt="alt" />
                                {(item.images > 0 || item.videos > 0) && (
                                    <span>
                                        {item.images > 0 && (
                                            <figcaption>
                                                <img src="/images/icons/gallery.svg" alt="image icon" className="img-fluid" />
                                                {item.images}
                                            </figcaption>
                                        )}
                                        {item.videos > 0 && (
                                            <figcaption>
                                                <img src="/images/icons/video.svg" alt="video icon" className="img-fluid" />
                                                {item.videos}
                                            </figcaption>
                                        )}
                                    </span>
                                )}
                            </figure>
                            {item?.title && (
                                <p>{item.title}</p>
                            )}
                            {item?.slug && (
                                <Link href={`${BASE_URL}${currentPage}/${item.slug}`} className="strech_link" />
                            )}
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <PaginationWrapper
                    currentPage={pagination?.current_page || 1}
                    totalPages={pagination?.last_page || 1}
                />
            </div>
        </section>
    )
}