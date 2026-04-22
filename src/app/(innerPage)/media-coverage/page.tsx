import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import { apiFetch } from "@/src/lib/api";
import Link from "next/link";

export default async function NoticesAnnouncement() {
    const { data, error } = await apiFetch(`media-coverage`);

    if (error) {
        return (
            <ApiErrorFallback heading="Couldn't load news" message={error} />
        )
    }

    const updatedData = data?.media_coverage?.data;

    return (
        <>
            <section className="media_coverage">
                <div className="container25">
                    <div className="media_grid">
                        {updatedData.length > 0 && updatedData.map((item:any, idx:number)=>(
                            <div key={idx} className="media_grid_Bx" data-src={item.image || ''}>
                                <figure>
                                    <img src={item.image || ''} className="img-fluid" alt="media logo" />
                                </figure>
                                <div className="media_txt">
                                    {item?.date && (
                                        <h5>{new Date(item.date).toLocaleDateString('en-US', {year:'numeric', month:'long', day:'numeric'})}</h5>
                                    )}
                                    {item?.title && (
                                        <p dangerouslySetInnerHTML={{__html:item.title}} />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}