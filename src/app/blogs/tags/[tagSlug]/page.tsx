import { apiFetch } from "@/src/lib/api";

import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";

import BlogListingClient from "@/src/components/blogs/BlogListingClient";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";
import { notFound } from "next/navigation";
import { getPageSEO } from "@/src/lib/seo";
import { BASE_URL } from "@/src/config/config";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";

interface SearchParams {
  page?: string;
  search?: string;
  category?: string;
  year?: string;
  month?: string;
}

function buildBlogsQuery(params: {
  page: number;
  search: string;
  // category: string;
  // year: string;
  // month: string;
}) {
  const parts = [`page=${params.page}`];

  if (params.search) parts.push(`search=${encodeURIComponent(params.search)}`);

  return parts.join("&");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tagSlug: string }>;
}) {
  const { tagSlug } = await params;
  return getPageSEO(`blogs/tags/${tagSlug}`);
}

export default async function BlogsTagsPage({
  searchParams,
  params,
}: {
  searchParams: Promise<SearchParams>;
  params: Promise<{ tagSlug: string }>;
}) {
  const SearchParam = await searchParams;
  const currentPage = Number(SearchParam.page) || 1;
  const search = SearchParam.search || "";
  const { tagSlug } = await params;

  const hasFilters = Boolean(search);

  const query = buildBlogsQuery({
    page: currentPage,
    search,
  });

  const fetchOptions = hasFilters ? { cache: "no-store" as const } : undefined;

  const [{ data: blogsData, error }, seoData] = await Promise.all([
    apiFetch(`blogs/tags/${tagSlug}?${query}`, fetchOptions),
    getPageSEO(`blogs/tags/${tagSlug}`),
  ]);

  if (error) notFound();

  const pageData = blogsData?.blogs;

  const globalSchemaArgs = {
    canonicalUrl: seoData?.alternates?.canonical || BASE_URL || "",
    pageTitle: seoData?.title || "",
    metaDescription: seoData?.description || "",
    primaryImageUrl: "",
    datePublishedIso: pageData?.created_at || "",
    dateModifiedIso: pageData?.updated_at || "",
    languageTag: "en-IN",
    currentPageSlug: `${BASE_URL}blogs/tags/${tagSlug}`,
    currentPageName: "Blogs",
    // parentMenus:[
    //   {
    //     title:'alumni',
    //     url:"alumni"
    //   },
    // ],
  };

  const globalSchema = buildGlobalSchema(globalSchemaArgs);

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
      {globalSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      )}
      <InnerPageLayoutWrapper
        pathname={`/blogs/tags/${tagSlug}`}
        slug={'blogs'}
        tabs={null}
        mainClass="happenings_page"
        showTabs={true}
      >
        <BlogListingClient
          initialBlogsData={blogsData}
          initialFilters={{ search }}
          initialPage={currentPage}
          tagSlug={tagSlug}
        />
      </InnerPageLayoutWrapper>
    </>
  );
}
