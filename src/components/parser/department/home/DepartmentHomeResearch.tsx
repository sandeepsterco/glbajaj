import DepartmentResearchSlider, { type ResearchItem } from "./Departmentresearchslider";

type Props = {
  data?: any;
  params?: { slug: string; parentSlug: string };
  pageName: string;
};

export default function DepartmentHomeResearch({ data, params, pageName }: Props) {
  const researchData: ResearchItem[] = data?.modular?.["research"] ?? [];

  if (!researchData.length) return null;

  const slug = params?.slug ?? "";
  const parentSlug = params?.parentSlug ?? "";

  return <DepartmentResearchSlider items={researchData} slug={slug} parentSlug={parentSlug} pageName={pageName} />;
}