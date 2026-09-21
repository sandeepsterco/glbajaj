import NoData from "../../../ui/NoData";
import DepartmentPlacementsSlider, { type PlacementItem } from "./Departmentplacementsslider";

type Props = {
  data?:any
};

export default async function DepartmentHomePlacements({ data }: Props) {

  const placements: PlacementItem[] = data?.modular?.["intern-placement"] ?? [];

  if (!placements.length) {
    return (
      <div className="home_placement_students deparment_page_placemen">
        <NoData />
      </div>
    );
  }

  return <DepartmentPlacementsSlider placements={placements} />;
}