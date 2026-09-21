import DepartmentMouTabs, { type MouItem } from "./Departmentmoutabs";

type Props = {
  params:{
    slug: string;
  };
  data?:any
};

export default async function DepartmentHomeMou({params, data}: Props) {
  const {slug} = params;
  const mouData: MouItem[] = data?.modular?.["collaboration-mou"] ?? [];

  if (!mouData.length) return null;

  // key={slug} resets the tab state if the user moves to another department
  return <DepartmentMouTabs key={slug} items={mouData} />;
}