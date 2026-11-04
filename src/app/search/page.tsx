export const dynamic = "force-dynamic";

import PageHeader from "@/src/components/layout/header/PageHeader";
import { apiFetch } from "@/src/lib/api";
import "@/src/styles/inner.css";
import SearchPageListing from "./SearchPageListing";
import { getPageSEO } from "@/src/lib/seo";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
import { BASE_URL } from "@/src/config/config";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  return await getPageSEO(`search`);
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const params = await searchParams;
  const rawQ = Array.isArray(params.q) ? params.q[0] : params.q;
  const q = rawQ?.trim();

  const [{ data }, seoData] = await Promise.all([
    apiFetch(`cms/search`),
    getPageSEO(`search`),
  ]);

  const pageData = data?.data;

  const globalSchemaArgs = {
    canonicalUrl: seoData?.alternates?.canonical || BASE_URL || "",
    pageTitle: seoData?.title || "",
    metaDescription: seoData?.description || "",
    primaryImageUrl: "",
    datePublishedIso: pageData?.created_at || "",
    dateModifiedIso: pageData?.updated_at || "",
    languageTag: "en-IN",
    currentPageName: pageData?.page_title || "",
    currentPageSlug: `${BASE_URL}search`,
    parentMenus: [...(pageData?.parent_menus ?? [])],
  };

  const globalSchema = buildGlobalSchema(globalSchemaArgs);

  return (
    <>
      {seoData?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seoData.schema) }}
        />
      )}
      {globalSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      )}
      <main>
        <PageHeader pathname={`/search`} data={data?.data} slug="search" />
        {/* key forces a fresh render for every new query */}
        <SearchPageListing key={q} searchQuery={q ||''} />
      </main>
    </>
  );
}