import DepartmentResearchSlider, { type ResearchItem } from "./Departmentresearchslider";

type Props = {
  data?: any;
  params?: { slug: string; parentSlug: string };
};

export default function DepartmentHomeResearch({ data, params }: Props) {
  const researchData: ResearchItem[] = data?.modular?.["research"] ?? [];

  if (!researchData.length) return null;

  const slug = params?.slug ?? "";
  const parentSlug = params?.parentSlug ?? "";

  return <DepartmentResearchSlider items={researchData} slug={slug} parentSlug={parentSlug} />;
}