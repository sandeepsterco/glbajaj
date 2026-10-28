import DepartmentClubsSlider, { type ClubItem } from "./Departmentclubsslider";

type Props = {
  params:{
    slug: string;
  };
  data?:any;
  pageName: string;
};

export default async function DepartmentHomeClubs({ params, data, pageName }: Props) {
  const clubs: ClubItem[] = data?.modular?.["clubs-and-society"] ?? [];

  if (!clubs.length) return null;

  return <DepartmentClubsSlider clubs={clubs} pageName={pageName} />;
}