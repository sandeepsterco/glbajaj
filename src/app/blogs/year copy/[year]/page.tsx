import { apiFetch } from "@/src/lib/api";

import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";

import BlogListingClient from "@/src/components/blogs/BlogListingClient";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";
import { notFound, redirect } from "next/navigation";
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

  // if (params.category)
  //   parts.push(`category=${encodeURIComponent(params.category)}`);

  // if (params.year) parts.push(`year=${encodeURIComponent(params.year)}`);

  // if (params.month) parts.push(`month=${encodeURIComponent(params.month)}`);

  return parts.join("&");
}

export async function generateMetadata() {
  return await getPageSEO(`blogs`);
}

export default async function BlogsYearPage({
  searchParams,
  params: yearParams,
}: {
  searchParams: Promise<SearchParams>;
  params: Promise<{ year: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const search = params.search || "";
  // const category = params.category || "";
  // const year = params.year || "";
  // const month = params.month || "";
  const { year } = await yearParams;

  // if (category || year || month) redirect("/blogs");
  const hasFilters = Boolean(search);

  const query = buildBlogsQuery({
    page: currentPage,
    search,
    // category,
    // year,
    // month,
  });

  const fetchOptions = hasFilters ? { cache: "no-store" as const } : undefined;

  const [{ data: blogsData, error }, seoData] = await Promise.all([
    apiFetch(`blogs?year=${year}&${params}`, fetchOptions),
    getPageSEO(`blogs`),
  ]);

  if (error) notFound();

  const pageData = blogsData?.blogs;
  const slug = "blogs";

  const globalSchemaArgs = {
    canonicalUrl: seoData?.alternates?.canonical || BASE_URL || "",
    pageTitle: seoData?.title || "",
    metaDescription: seoData?.description || "",
    primaryImageUrl: "",
    datePublishedIso: pageData?.created_at || "",
    dateModifiedIso: pageData?.updated_at || "",
    languageTag: "en-IN",
    currentPageSlug: `${BASE_URL}blogs`,
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
        pathname={`/${slug}`}
        slug={slug}
        tabs={null}
        mainClass="happenings_page"
        showTabs={true}
      >
        <BlogListingClient
          initialBlogsData={blogsData}
          initialFilters={{ search, year }}
        />
      </InnerPageLayoutWrapper>
    </>
  );
}
