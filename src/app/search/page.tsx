import PageHeader from "@/src/components/layout/header/PageHeader";
import { apiFetch } from "@/src/lib/api";
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
  const [{ data }, seoData] = await Promise.all([
    apiFetch(`cms/search`),
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
        <PageHeader pathname={`/search`} data={data.data} slug="search" />
        <SearchPageListing searchQuery={q} />
      </main>
    </>
  );
}
