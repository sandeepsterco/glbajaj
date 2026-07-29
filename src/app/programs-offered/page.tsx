import PageHeader from "@/src/components/layout/header/PageHeader";
import ProgramList from "@/src/components/programs/ProgramList";
import { apiFetch } from "@/src/lib/api";
import { getSlug } from "@/src/lib/getSlug";
import PageLoader from "@/src/components/ui/pageLoader/PageLoader";
import { Suspense } from "react";
import "@/src/styles/inner.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";

export default async function ProgramsOffered(){
    const slug = await getSlug();
    const {data, error} = await apiFetch(`cms/${slug}`);

    return(
        <main>
            <PageHeader data={data?.data} slug={slug} />
            <Suspense fallback={<PageLoader variant="home" />}>
                <ProgramList />
            </Suspense>
        </main>
    )
} 