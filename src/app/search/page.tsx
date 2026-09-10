import PageHeader from "@/src/components/layout/header/PageHeader";
import ProgramList from "@/src/components/programs/ProgramList";
import { apiFetch } from "@/src/lib/api";
import { getSlug } from "@/src/lib/getSlug";
import PageLoader from "@/src/components/ui/pageLoader/PageLoader";
import "@/src/styles/inner.css";
import SearchPageListing from "./SearchPageListing";
import { getPageSEO } from "@/src/lib/seo";

export async function generateMetadata() {
  return await getPageSEO(`search`);
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const slug = await getSlug();
  const [{ data }, seoData] = await Promise.all([
    apiFetch(`cms/${slug}`),
    getPageSEO(`search`),
  ]);

  return (
    <>
      {seoData?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoData.schema),
          }}
        />
      )}
      <main>
        <PageHeader data={data.data} slug={slug} />
        <SearchPageListing searchQuery={q} />
      </main>
    </>
  );
}
