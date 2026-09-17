import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import PaginationWrapper from "@/src/components/common/pagination/PaginationWrapper";
import { apiFetch } from "@/src/lib/api";
import MediaGrid from "./Mediagrid";

export default async function MediaGridPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
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
                    {updatedData?.length > 0 && <MediaGrid items={updatedData} />}

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