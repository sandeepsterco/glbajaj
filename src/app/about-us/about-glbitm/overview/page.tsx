import { apiFetch } from "@/src/lib/api";
import ComingSoon from "@/src/components/common/comingSoon/ComingSoon";
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import { getPageSEO } from "@/src/lib/seo";
import PageHeader from "@/src/components/layout/header/PageHeader";
import { notFound } from "next/navigation";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
import { BASE_URL } from "@/src/config/config";
import { buildHomepageSchema } from "@/src/lib/schema/homepageSchema";
import getValue from "@/src/lib/getValue";

export async function generateMetadata() {
  return await getPageSEO(`about-us/about-glbitm/overview`);
}

export default async function AboutOverviewPage({
  params,
  searchParams
}: {
  params: Promise<{ parentSlug: string, innerSlug:string }>;
  searchParams?:any
}) {
  const {parentSlug, innerSlug } = await params;
  const resolvedSearchParams = await searchParams;
  const [{data, error}, seoData, infoRes] = await Promise.all([
    apiFetch(`cms/overview`),
    getPageSEO(`about-us/about-glbitm/overview`),
    apiFetch("info"),
  ]);

  if (error || !data?.status) {
    notFound();
  }

  const pageData = data?.data;

  const globalSchemaArgs = {
    canonicalUrl:seoData?.alternates?.canonical || BASE_URL || '',
    pageTitle:seoData?.title || '',
    metaDescription:seoData?.description || '',
    primaryImageUrl:"",
    datePublishedIso:pageData?.created_at || '',
    dateModifiedIso:pageData?.updated_at || '',
    languageTag:'en-IN',
    currentPageName:pageData?.page_title || '',
    currentPageSlug:`about-us/about-glbitm/overview`,
    parentMenus: [
      {
        title: "About Us",
        url: 'about-us',
      },
      {
        title: "About GLBITM",
        url: 'about-glbitm',
      },
    ],
  };

  const combinedHtml = Object.values(data?.data?.sections ?? {}).join("");

  const globalSchema = buildGlobalSchema(globalSchemaArgs);

  let eventSchema;


  const schemaArgs = {
    officialFacebookUrl:getValue(infoRes, 'facebook')?.value,
    officialInstagramUrl:getValue(infoRes, 'instagram')?.value,
    officialLinkedinUrl:getValue(infoRes, 'linkedin')?.value,
    officialYoutubeUrl:getValue(infoRes, 'youtube')?.value,
    officialXUrl:getValue(infoRes, 'twitter')?.value,
    officialInstitutionName:getValue(infoRes, 'institute_name')?.value,
    commonNameOrAcronym:getValue(infoRes, 'institute_name')?.value,
    legalName:getValue(infoRes, 'institute_name')?.value,
    approvedInstitutionDescription:seoData.description || '',
    logoUrl:`${BASE_URL}images/logo/logo.png`,
    logoWidthPx:415,
    logoHeightPx:112,
    representativeCampusImageUrl:'',
    streetAddress:getValue(infoRes, 'street_address')?.value,
    cityLocality:getValue(infoRes, 'locality_address')?.value,
    state:getValue(infoRes, 'region_address')?.value,
    pinCode:getValue(infoRes, 'postal_code')?.value,
    latitude:getValue(infoRes, 'latitude')?.value,
    longitude:getValue(infoRes, 'longitude')?.value,
    primaryPhoneWithCountryCode:getValue(infoRes, 'phone')?.value,
    primaryEmail:getValue(infoRes, 'email')?.value,
    admissionsPhone:getValue(infoRes, 'admission_helpline')?.value,
    admissionsEmail:getValue(infoRes, 'email')?.value,
    generalPhone:getValue(infoRes, 'phone')?.value,
    generalEmail:getValue(infoRes, 'email')?.value,
    foundingDateOrYear:'',
    identifierAuthority:"",
    identifierValue:"",
    websiteName:"GL Bajaj",
    websiteAlternateName:"GL Bajaj",
    defaultLanguage:"en",
  }

  const pageSchema = buildHomepageSchema(schemaArgs);

  const customTabs = {
      tabs:[
        {
          "title": "About Us",
          "slug": "about-us"
        },
        {
          "title": "About GLBITM",
          "slug": "about-glbitm"
        }
      ]
    }

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
      {pageSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
        />
      )}
      {eventSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
      )}
      {globalSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      )}
      <PageHeader pathname={`/${parentSlug}/${innerSlug}`} data={data?.data} slug={innerSlug} customTabs={customTabs} />
      {data?.data?.sections?.length == 0 ? <ComingSoon /> : <ReactParserDynamic html={combinedHtml} params={params} searchParams={resolvedSearchParams} pageName={seoData.title} />}
    </>
  );
}
