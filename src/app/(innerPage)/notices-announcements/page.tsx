import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import { apiFetch } from "@/src/lib/api";
import Link from "next/link";

export default async function NoticesAnnouncement() {
    const { data, error } = await apiFetch(`notice-and-announcements`);

    if (error) {
        return (
            <ApiErrorFallback heading="Couldn't load news" message={error} />
        )
    }

    const updatedData = data?.notice_and_announcements?.data;

    return (
        <>
          <section className="notice_announcement">
            <div className="container25">
                <div className="notice_grid">
                    {updatedData && updatedData?.map((item:any, idx:number)=>(
                        <div key={idx} className="notice_list">
                            {item?.date && (
                                <h4>{new Date(item.date).toLocaleDateString('en-US', {year:'numeric', month:'long', day:'numeric'})}</h4>
                            )}
                            {item?.title && (
                                <p dangerouslySetInnerHTML={{__html:item.title}} />
                            )}
                            {item?.slug && (
                                <Link href={item.slug} className="strech_link" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>      
        </>
    )
}