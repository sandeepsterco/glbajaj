import { BASE_URL } from "@/src/config/config";
import Link from "next/link";

export default function GalleryList({data}:{data:any}){
    return(
        <section className="gallery_list_section">
            <div className="container25">
                <div className="gallery_list">
                    {data?.data.map((item:any, idx:number)=>(
                        <div key={idx} className="gallery_list_bx">
                            <figure>
                                <img src={item.banner_image || '/images/default/gallery-list.webp'} className="img-fluid" alt="alt" />
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
                                <Link href={`${BASE_URL}gallery/${item.slug}`} className="strech_link" />
                            )}
                        </div>
                    ))}
            
                </div>
            </div>
        </section>
    )
}