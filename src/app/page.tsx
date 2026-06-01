import FullImageBanner from "../components/common/fullImageBanner/FullImageBanner";
import { getPageSEO } from "../lib/seo";
import { apiFetch } from "../lib/api";
import ReactParser from "../components/common/reactParser/ReactParser";
import { cache } from "react";

const HERO_POSTER =
  "https://res.cloudinary.com/dbgrco4jr/video/upload/so_0,q_auto,f_auto,w_1920/v1779179213/home-page-video_uo6due.jpg";

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

  if(!homeData?.modular && !homeData?.cms){
    return <div className="min-h-[100vh] flex items-center justify-center">
      <h1 className="text-[5rem] font-bold">Something wrong...</h1>
    </div>
  }

  return (
    <>
      <link rel="preload" as="image" href={HERO_POSTER} fetchPriority="high" />
      {seoData.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoData.schema),
          }}
        />
      )}
      <main>
        {homeData?.modular?.banner && homeData.modular.banner.length > 0 && (
          <FullImageBanner data={homeData.modular.banner} />
        )}

       

        {/* <NotificationBar /> */}

        {Object.keys(homeData?.cms).map((key) => {
          return <ReactParser key={key} html={homeData.cms[key]} />;
        })}

        {/* <RankingAward />
        <Placements /> */}
      </main>
    </>
  );
}
