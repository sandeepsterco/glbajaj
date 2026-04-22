import Link from "next/link";

export default function NewsListing({data}:{data:any}) {
    return (
        <section className="news_listing">
            <div className="container25">
                {data.map((item:any, idx:number)=>(
                    <div key={idx} className="news_list">
                        <figure>
                            <img src={item.image || 'images/default/news-list.webp'} alt={item.heading || 'news'} className="img-fluid" />
                        </figure>
                        <div className="news_list_right">
                            {item?.date && <p className="date">{new Date(item.date).toLocaleDateString('en-US', {year:'numeric', month:'long', day:'numeric'})}</p>}

                            {item?.subtitle && (
                                <h3>{item.subtitle}</h3>
                            )}

                            {item?.description && (
                                <p>{item.description}</p>
                            )}

                            {item?.slug && (
                                <span> <img src="/images/icons/arrow-right.svg" alt="arrow" className="img-fluid" />
                                </span>
                            )}
                            
                        </div>
                        {item?.slug && (
                            <Link href={item.slug} className="strech_link" />
                        )}
                    </div>
                ))}
                
            </div>
        </section>
    )
}