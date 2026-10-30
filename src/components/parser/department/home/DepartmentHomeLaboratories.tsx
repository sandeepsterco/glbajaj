import DepartmentLaboratoriesSlider, {
  type LabItem,
} from "./Departmentlaboratoriesslider";

type Props = {
  params: {
    slug: string;
  };
  data?:any;
  pageName: string;
};

export default async function DepartmentHomeLaboratories({ params, data, pageName }: Props) {

  const labs: LabItem[] = data?.modular?.laboratories ?? [];

  if (!labs.length) return null;

  return <DepartmentLaboratoriesSlider labs={labs} pageName={pageName} />;
}
