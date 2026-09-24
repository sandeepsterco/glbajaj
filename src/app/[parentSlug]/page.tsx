import { apiFetch } from "@/src/lib/api";
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import { getPageSEO } from "@/src/lib/seo";
import { notFound } from "next/navigation";
import PageHeader from "@/src/components/layout/header/PageHeader";
import ComingSoon from "@/src/components/common/comingSoon/ComingSoon";
import { buildHomepageSchema } from "@/src/lib/schema/homepageSchema";
import getValue from "@/src/lib/getValue";
import { BASE_URL } from "@/src/config/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ parentSlug: string }>;
}) {
  const { parentSlug } = await params;
  return await getPageSEO(parentSlug);
}

export default async function DynamicSlugPage({
  params,
}: {
  params: Promise<{ parentSlug: string }>;
}) {
  const { parentSlug } = await params;
  const [{data, error}, seoData, {data:infoRes}] = await Promise.all([
    apiFetch(`cms/${parentSlug}`),
    getPageSEO(parentSlug),
    apiFetch("info"),
  ]);

  if (error || !data?.status || !data?.data) {
    notFound();
  }

  const combinedHtml = Object.values(data?.data?.sections ?? {}).join("");

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
    representativeCampusImageUrl:``,
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
      {parentSlug == 'about-us' && pageSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
        />
      )}
      <PageHeader pathname={`/${parentSlug}`} data={data?.data} slug={parentSlug} />
      {data?.data?.sections?.length == 0 ? <ComingSoon /> : <ReactParserDynamic html={combinedHtml} />}
      
    </>
  );
}
