import ProgramCareer from "@/src/components/programs/Career";
import ProgramCurriculum from "@/src/components/programs/Curriculum";
import DepartmentTraining from "@/src/components/programs/DepartmentTraining";
import DepartmentFeeStructure from "@/src/components/programs/FeeStructure";
import Objectives from "@/src/components/programs/Objectives";
import ProgramOverview from "@/src/components/programs/Overview";

export default function ProgramDetail() {
    return (
        <>
            <ProgramOverview />
            <ProgramCurriculum />
            <ProgramCareer />
            <Objectives />
            <DepartmentFeeStructure />
            <DepartmentTraining />
        </>
    )
}