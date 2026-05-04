import PageHeader from "@/src/components/layout/header/PageHeader";
import ProgramList from "@/src/components/programs/ProgramList";
import { apiFetch } from "@/src/lib/api";
import { getSlug } from "@/src/lib/getSlug";

export default async function ProgramsOffered(){
    const slug = await getSlug();
    const {data, error} = await apiFetch(`cms/${slug}`, { cache:'no-store'});

    return(
        <main>
            <PageHeader data={data.data} slug={slug} showTabs={false} />
            <ProgramList />
        </main>
    )
}