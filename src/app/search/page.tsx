import PageHeader from "@/src/components/layout/header/PageHeader";
import ProgramList from "@/src/components/programs/ProgramList";
import { apiFetch } from "@/src/lib/api";
import { getSlug } from "@/src/lib/getSlug";
import PageLoader from "@/src/components/ui/pageLoader/PageLoader";
import { Suspense } from "react";
import "@/src/styles/inner.css";
import SearchPageListing from "./SearchPageListing";

export default async function SearchPage({searchParams}: { searchParams: Promise<{ q?: string }> }){
    const { q } = await searchParams;
    const slug = await getSlug();
    const {data, error} = await apiFetch(`cms/${slug}`);

    return(
        <main>
            <PageHeader data={data.data} slug={slug} />
            <SearchPageListing searchQuery={q} />
        </main>
    )
} 