import { apiFetch } from "@/src/lib/api";
import RelatedStories from "../newsEvents/RelatedStories";

const fetchHappeningsData = async (slug: string) => {
  const { data, error } = await apiFetch(`department/${slug}/home`);

  if (error) throw new Error(error);
  return data?.data;
}

export default async function DepartmentHomeHappenings({params}:{params:{slug:string; parentSlug:string}}) {
  const slug = params.slug;
  const data = await fetchHappeningsData(slug);

  const happeningsData = data?.modular?.["news-events"];

  return (
    <>
      {happeningsData?.length > 0 && (
        <RelatedStories data={happeningsData} />
      )}
    </>
  );
}
