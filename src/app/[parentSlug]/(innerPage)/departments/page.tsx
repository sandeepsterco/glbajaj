import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import PageHeader from "@/src/components/layout/header/PageHeader";
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import Image from "next/image";
import Link from "next/link";
import "@/src/styles/inner.css";
import { getPageSEO } from "@/src/lib/seo";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";

export async function generateMetadata() {
  return await getPageSEO("departments");
}

export default async function DepartmentsPage({params}:{params:Promise<{parentSlug:string}>}) {
  const {parentSlug} = await params;
  const slug = "departments";
  const [cmsResult, seoData, departmentsResult] = await Promise.all([
    apiFetch(`cms/${slug}`),
    getPageSEO(slug),
    apiFetch(slug),
  ]);

  const { data: departmentData, error: departmentError } = departmentsResult;

  const pageData = cmsResult?.data?.data;

  const globalSchemaArgs = {
    canonicalUrl: seoData?.alternates?.canonical || BASE_URL || "",
    pageTitle: seoData?.title || "",
    metaDescription: seoData?.description || "",
    primaryImageUrl:'',
    datePublishedIso: pageData?.created_at || "",
    dateModifiedIso: pageData?.updated_at || "",
    languageTag: "en-IN",
    currentPageName: pageData?.page_title || "",
    currentPageSlug: `${BASE_URL}${parentSlug}/${pageData?.current_page_slug}`,
    parentMenus: [
      ...pageData?.parent_menus,
      {
        title: 'Academics',
        url: `academics`,
      },
      
    ],
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

      <main>
        {cmsResult?.data?.data && (
          <PageHeader
            data={cmsResult.data.data}
            slug={slug}
            pathname="/departments"
          />
        )}

        {globalSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
                    />
                )}

        {departmentError && (
          <ApiErrorFallback
            heading="Couldn't load Departments Page"
            message={departmentError}
          />
        )}

        <section className="dept_gridmain">
          <div className="container25">
            <div className="dept_maingrid">
              {departmentData?.data &&
                departmentData.data.map((item: any, idx: number) => (
                  <div key={idx} className="dept_gbox relative">
                    <figure>
                      <Image
                        src={item?.image ?? "/images/default/department-project.webp"}
                        className="img-fluid w-100"
                        alt={item.name}
                        height={600}
                        width={850}
                        loading="lazy"
                      />
                    </figure>
                    <h3 className="font24">{item.name}</h3>
                    <Link className="strech_link" href={`${BASE_URL}${parentSlug}/departments/${item.slug}`} />
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
