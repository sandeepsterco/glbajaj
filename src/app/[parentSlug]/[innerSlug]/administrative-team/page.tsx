import LeadershipList from "@/src/components/leadership/LeadershipList";
import { apiFetch } from "@/src/lib/api"
import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper"
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";
import { notFound } from "next/navigation";

export default async function MessagesAdministrationPage({
    params, 
}: {
    params: Promise<{ parentSlug: string }>;
}) {
    const { parentSlug } = await params;
    const { data, error } = await apiFetch(`leadership`);

    if (error) notFound();

    return (
        <>
            <InnerPageLayoutWrapper slug={'administrative-team'}
                pathname={`/${parentSlug}/messages-and-administration`}  tabs={null} mainClass="happenings_page" showTabs={true}>
                <LeadershipList data={data} />
            </InnerPageLayoutWrapper>
        </>
    )
}