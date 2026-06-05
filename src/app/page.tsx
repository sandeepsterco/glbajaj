import FullImageBanner from "../components/common/fullImageBanner/FullImageBanner";
import { getPageSEO } from "../lib/seo";
import { apiFetch } from "../lib/api";
import { cache } from "react";
import ReactParserDynamic from "../components/common/reactParser/ReactParserDynamic";

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

       
      {homeData?.cms && (
         Object.keys(homeData?.cms).map((key) => {
          return <ReactParserDynamic key={key} html={homeData.cms[key]} />;
        })
      )}
       
      </main>
    </>
  );
}
