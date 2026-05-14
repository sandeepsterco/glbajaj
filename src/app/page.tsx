import FullImageBanner from "../components/common/fullImageBanner/FullImageBanner";
import RankingAward from "../components/RankingAward";
import Placements from "../components/Placements";
import { getPageSEO } from "../lib/seo";
import { apiFetch } from "../lib/api";
import ReactParser from "../components/common/reactParser/ReactParser";
import NotificationBar from "../components/ui/notificationBar/NotificationBar";

export const dynamic = "force-dynamic";



export async function generateMetadata() {
  return await getPageSEO();
}

export default async function Home() {
  const seoData = await getPageSEO();

  const { data: homeData, error: homeError } = await apiFetch("modular/home");

  console.log('homeData',homeData);

  if(!homeData?.modular && !homeData?.cms){
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
