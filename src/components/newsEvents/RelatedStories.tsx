import { BASE_URL } from "@/src/config/config";
import Link from "next/link";

export default function RelatedStories({data}:{data:any}){
    return(
        <section className="related_stories">
            <div className="container25">
                <h2>Related Stories</h2>
                <div className="related_story_grid">
                    {data.map((item:any, idx:number)=>(
                        <div key={idx} className="related_stroty_Bx">
                            <figure>
                                <img src={item.image || '/images/default/related-news.webp'} className="img-fluid" alt={item.heading || 'news'} />
                            </figure>
                            <figcaption>
                                {item?.date && (
                                    <p className="date">{new Date(item.date).toLocaleDateString('en-US', {year:'numeric', month:'long', day:'numeric'})}</p>
                                )}
                                {item?.heading && (
                                    <p>{item.heading}</p>
                                )}
                            </figcaption>
                            {item?.slug && (
                                <Link href={BASE_URL + 'news-events/'+ item.slug} className="strech_link"></Link>
                            )}
                        </div>
                    ))}
                    
                </div>
            </div>
        </section>
    )
}