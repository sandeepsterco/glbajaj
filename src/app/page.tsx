import FullImageBanner from "../components/common/fullImageBanner/FullImageBanner";
import { getPageSEO } from "../lib/seo";
import { apiFetch } from "../lib/api";
import { cache, Suspense } from "react";
import { SkeletonGroup } from "../components/ui/Skeleton";
import HomeContent from "./HomeContent";

const getHomeData = cache(async () => {
  const [seoData, homeRes] = await Promise.all([
    getPageSEO(),
    apiFetch("modular/home", { revalidate: 300 }),
  ]);
  return { seoData, homeData: homeRes.data };
});

export async function generateMetadata() {
  const { seoData } = await getHomeData();
  return seoData;
}

export default async function Home() {
  const { seoData, homeData } = await getHomeData();

  if (!homeData?.modular && !homeData?.cms) {
    return <div className="min-h-[100vh] flex items-center justify-center">
      <h1 className="text-[5rem] font-bold">Something wrong...</h1>
    </div>
  }

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
      <main>
        <FullImageBanner data={homeData?.modular?.banner ?? []} />

        <Suspense
          fallback={
            <SkeletonGroup
              count={6}
              wrapperClassName="grid gap-[3rem]"
              className="w-full h-[50rem]"
            />
          }
        >
            <HomeContent />
        </Suspense>

      </main>
    </>
  );
}
