import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import LeadershipDetail from "@/src/components/leadership/LeadershipDetail";
import { apiFetch } from "@/src/lib/api";

export default async function FacultyDetailPage({
    params,
}: {
    params: Promise<{ parentSlug: string; slug: string }>;
}) {
    const { parentSlug, slug } = await params;

    const { data, error } = await apiFetch(`leadership/${slug}`);


    if (error) {
        return (
            <ApiErrorFallback heading="Couldn't load Faculty Detail Page" message={error} />
        )
    }

    return (
        <LeadershipDetail data={data?.leadership_details} slug={slug} parentSlug={parentSlug} />
    )
}