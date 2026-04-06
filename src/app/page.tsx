import FullImageBanner from "../components/common/fullImageBanner/FullImageBanner";
import RankingAward from "../components/RankingAward";
import Placements from "../components/Placements";
import { getPageSEO } from "../lib/seo";
import { apiFetch } from "../lib/api";
import NotificationBar from "../components/ui/NotificationBar";
import dynamic from "next/dynamic";

const ReactParser = dynamic(
  () => import("../components/common/reactParser/ReactParser"),
  {
    loading: () => <div>Loading...</div>,
  },
);

export async function generateMetadata() {
  return await getPageSEO();
}

export default async function Home() {
  const seoData = await getPageSEO();

  const { data: homeData, error: homeError } = await apiFetch("modular/home", {
    revalidate: 300,
  });

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
        {homeData?.sections?.banner && homeData.sections.banner.length > 0 && (
          <FullImageBanner data={homeData.sections.banner} />
        )}

        <NotificationBar />

        {homeData?.sections &&
          Object.keys(homeData.sections).map((key) => {
            return <ReactParser key={key} html={homeData.sections[key]} />;
          })}
        <RankingAward />
        <Placements />
      </main>
    </>
  );
}
