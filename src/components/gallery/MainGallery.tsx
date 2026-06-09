import { BASE_URL } from "@/src/config/config";
import Image from "next/image";
import Link from "next/link";

export default function MainGallery({data}:{data:any}){
    return(
        <section className="media_gallery">
            <div className="container25">
                <div className="gallery_grid">
                    {data?.map((item:any, idx:number)=>(
                        <div key={idx} className="gallery_grid_Bx">
                            <figure className="flash-effect-2">
                                <Image src={item.banner_image || '/images/default/gallery-main.webp'}  width={585} height={448} loading="lazy" className="img-fluid" alt={item.title || 'gallery'} />
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
                                <h5>{item.title}</h5>
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