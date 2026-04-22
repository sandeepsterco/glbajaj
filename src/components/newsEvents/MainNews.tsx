import Image from "next/image";
import Link from "next/link";

export default function MainNews({data}:{data:any}){
    return <section className="news_section">
    <div className="container">
        <div className="col-xl-11">
            <div className="front_news">
                <div className="news_left">
                    <figure>
                        <Image src={data.image || '/images/default/main-news.webp' } alt="GL Bajaj" className="img-fluid" width={850} height={519} />
                    </figure>
                </div>
                <div className="news_right">
                    <div className="news_head">
                    <select className="form-select" aria-label="Default select example">
                            <option selected>Select Department</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
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
                            <Link href={data.slug}>
                                <img src="/images/icons/arrow-right.svg" alt="arrow" className="img-fluid" />
                            </Link>
                        )}
                        
                        
                    </div>                      
                </div>
            </div>
        </div>               
    </div>
</section>
}