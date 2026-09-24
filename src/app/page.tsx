import FullImageBanner from "../components/common/fullImageBanner/FullImageBanner";
import { getPageSEO } from "../lib/seo";
import { apiFetch } from "../lib/api";
import { cache, Suspense } from "react";
// import { SkeletonGroup } from "../components/ui/Skeleton";
import HomeContent from "./HomeContent";
import NotificationBar from "../components/ui/notificationBar/NotificationBar";
import { buildHomepageSchema } from "../lib/schema/homepageSchema";
import getValue from "../lib/getValue";
import { BASE_URL } from "../config/config";
import { buildGlobalSchema } from "../lib/schema/globalSchema";

const getHomeData = cache(async () => {
  const [seoData, homeRes, infoRes] = await Promise.all([
    getPageSEO('home'),
    apiFetch("modular/home"),
    apiFetch("info"),
  ]);
  return { seoData, homeData: homeRes?.data?.data, infoRes:infoRes?.data };
});
    
export async function generateMetadata() {
  const { seoData } = await getHomeData();
  return seoData;
}

export default async function Home() {
  const { seoData, homeData, infoRes } = await getHomeData();
  
  if (!homeData?.modular && !homeData?.cms) {
    return <div className="min-h-[100vh] flex items-center justify-center">
      <h1 className="md:!text-[5rem] !text-[2rem] md:!font-bold !font-normal">Something wrong...</h1>
    </div>
  }

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

  const globalSchemaArgs = {
    canonicalUrl:seoData?.alternates?.canonical || BASE_URL || '',
    pageTitle:seoData?.title || '',
    metaDescription:seoData?.description || '',
    primaryImageUrl:"https://project-demo.in/glbitm/assets/img/modules/1/module_1789649006_6aabe06e9b5be.webp",
    datePublishedIso:homeData?.created_at || '',
    dateModifiedIso:homeData?.updated_at || '',
    languageTag:'en-IN',
    currentPageName:homeData?.page_title || ''
  };

  const pageSchema = buildHomepageSchema(schemaArgs);
  const globalSchema = buildGlobalSchema(globalSchemaArgs);

  return (
    <>
      {seoData.schema && (
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
      {pageSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
        />
      )}
      <main>
        <FullImageBanner data={homeData?.modular?.banner ?? []} />
        <NotificationBar />
          <HomeContent data={homeData} />

      </main>
    </>
  );
}
