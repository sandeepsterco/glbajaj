import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import PaginationWrapper from "@/src/components/common/pagination/PaginationWrapper";
import { apiFetch } from "@/src/lib/api";

export default async function NoticesAnnouncement({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;
    const { data, error } = await apiFetch(`media-coverage?page=${currentPage}`);

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
                        {updatedData.length > 0 && updatedData.map((item: any, idx: number) => (
                            <div key={idx} className="media_grid_Bx" data-src={item.image || ''} data-aos="fade-up" data-aos-delay="600">
                                <figure>
                                    <img src={item.image || ''} className="img-fluid" alt="media logo" />
                                </figure>
                                <div className="media_txt">
                                    {item?.date && (
                                        <h5>{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</h5>
                                    )}
                                    {item?.title && (
                                        <p dangerouslySetInnerHTML={{ __html: item.title }} />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                        {updatedData?.length > 0 && (
                            <PaginationWrapper
                                currentPage={data?.media_coverage?.current_page || 1}
                                totalPages={data?.media_coverage?.last_page || 1}
                            />
                        )}
                </div>
            </section>
        </>
    )
}