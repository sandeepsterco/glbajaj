import AchievementsListing from "@/src/components/achievement/AchievementsListing";
import { getPageSEO } from "@/src/lib/seo";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  return await getPageSEO("why-glbitm/achievements");
}

export default async function DynamicSlugPage({ searchParams }: { searchParams?: any }) {
  const sp = (await searchParams) ?? {};

  // old links like ?page=3 -> /achievements/3
  const legacyPage = Number(sp.page);
  if (legacyPage > 1) redirect(`/why-glbitm/achievements/${legacyPage}`);

  return <AchievementsListing page={1} searchParams={sp} />;
}