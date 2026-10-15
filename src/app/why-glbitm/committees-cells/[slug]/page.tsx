import { apiFetch } from "@/src/lib/api";
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import { getPageSEO } from "@/src/lib/seo";
import PageHeader from "@/src/components/layout/header/PageHeader";
import { notFound } from "next/navigation";
import ComingSoon from "@/src/components/common/comingSoon/ComingSoon";
import { BASE_URL } from "@/src/config/config";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return await getPageSEO(`why-glbitm/committees-cells/${slug}`);
}

export default async function DynamicSlugPage({
  params,
  searchParams,
}: {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: any;
}) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const [{ data, error }, seoData] = await Promise.all([
    apiFetch(`cms/${slug}`),
    getPageSEO(`why-glbitm/committees-cells/${slug}`),
  ]);

  if (error || !data?.status) {
    notFound();
  }

  const combinedHtml = Object.values(data?.data?.sections ?? {}).join("");

  const pageData = data?.data;
  const pageHeaderData = {
    ...pageData,
    parent_menus: pageData?.parent_menus?.length
      ? pageData.parent_menus
      : [
          {
            title: "Why GLBITM",
            url: "why-glbitm",
          },
          {
            title: "Committees Cells",
            url: "committees-cells",
          },
        ],
  };

  const globalSchemaArgs = {
    canonicalUrl: seoData?.alternates?.canonical || BASE_URL || "",
    pageTitle: seoData?.title || "",
    metaDescription: seoData?.description || "",
    primaryImageUrl: "",
    datePublishedIso: pageData?.created_at || "",
    dateModifiedIso: pageData?.updated_at || "",
    languageTag: "en-IN",
    currentPageName: pageData?.page_title || "",
    currentPageSlug: `${BASE_URL}why-glbitm/committees-cells/${slug}`,
    // parentMenus:pageData?.parent_menus || [],
    parentMenus: [
      {
        title: "Why GLBITM",
        url: "why-glbitm",
      },
      {
        title: "Committees Cells",
        url: "committees-cells",
      },
    ],
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
      <div className="happenings_page">
        <PageHeader
          pathname={`/why-glbitm/committees-cells/${slug}`}
          data={pageHeaderData}
          slug={slug}
        />
        {data.data.sections.length == 0 ? (
          <ComingSoon />
        ) : (
          <ReactParserDynamic
            html={combinedHtml}
            params={params}
            searchParams={resolvedSearchParams}
          />
        )}
      </div>
    </>
  );
}
