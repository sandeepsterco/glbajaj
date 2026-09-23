import DepartmentClubsSlider, { type ClubItem } from "./Departmentclubsslider";

type Props = {
  params:{
    slug: string;
  };
  data?:any
};

export default async function DepartmentHomeClubs({ params, data }: Props) {
  const clubs: ClubItem[] = data?.modular?.["clubs-and-society"] ?? [];

  if (!clubs.length) return null;

  return <DepartmentClubsSlider clubs={clubs} />;
}