import DepartmentLaboratoriesSlider, {
  type LabItem,
} from "./Departmentlaboratoriesslider";

type Props = {
  params: {
    slug: string;
  };
  data?:any
};

export default async function DepartmentHomeLaboratories({ params, data }: Props) {

  const labs: LabItem[] = data?.modular?.laboratories ?? [];

  if (!labs.length) return null;

  return <DepartmentLaboratoriesSlider labs={labs} />;
}
