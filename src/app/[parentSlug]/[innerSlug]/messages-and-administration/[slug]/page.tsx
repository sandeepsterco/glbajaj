import LeadershipDetail from "@/src/components/leadership/LeadershipDetail";
import { apiFetch } from "@/src/lib/api";
import { notFound } from "next/navigation";

export default async function FacultyDetailPage({
    params,
}: {
    params: Promise<{ parentSlug: string; slug: string }>;
}) {
    const { parentSlug, slug } = await params;

    const { data, error } = await apiFetch(`leadership/${slug}`);


    if (error) notFound();

    return (
        <LeadershipDetail data={data?.leadership_details} slug={slug} parentSlug={parentSlug} />
    )
}