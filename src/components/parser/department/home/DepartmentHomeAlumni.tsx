import NoData from "../../../ui/NoData";
import DepartmentAlumniSlider, { type AlumniItem } from "./Departmentalumnislider";

export default async function DepartmentHomeAlumni({params, data}:{params:{slug:string; parentSlug:string}; data?:any}) {
  const alumni: AlumniItem[] = data?.modular?.testimonials ?? [];

  if (!alumni.length) return <NoData />;

  return <DepartmentAlumniSlider alumni={alumni} />;
}