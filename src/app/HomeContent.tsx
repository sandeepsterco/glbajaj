import { cache } from "react";
import { getPageSEO } from "../lib/seo";
import { apiFetch } from "../lib/api";
import ReactParserDynamic from "../components/common/reactParser/ReactParserDynamic";

const getHomeData = cache(async () => {
  const [seoData, homeRes] = await Promise.all([
    getPageSEO(),
    apiFetch("modular/home", { revalidate: 300 }),
  ]);
  return { seoData, homeData: homeRes.data };
});

export default async function HomeContent() {
  const { homeData } = await getHomeData();

  if (!homeData?.modular && !homeData?.cms) {
    return (
      <div className="min-h-[100vh] flex items-center justify-center">
        <h1 className="text-[5rem] font-bold">Something wrong...</h1>
      </div>
    );
  }

  const combinedHtml = homeData?.cms
    ? Object.values(homeData.cms).join("")
    : "";

  return (
    <>
      <ReactParserDynamic html={combinedHtml} />
    </>
  );
}