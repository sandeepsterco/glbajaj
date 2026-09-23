import { apiFetch } from "@/src/lib/api"
import Link from "next/link";
import { BASE_URL } from "@/src/config/config";

interface Program {
    id: string | number;
    title: string;
    type: 'under-graduate' | 'post-graduate';
    duration?: string;
    affiliation?: string;
    approvals?: string;
}

const getDepartmentCourse = async (slug: string): Promise<Program[]> => {
    const { data, error } = await apiFetch(`programs-specific-department/${slug}`);
    if (error) throw new Error(error);
    return data?.data?.programs ?? [];
}


function CourseCard({ program }: any) {
    return (
        <div className="cse_course relative">
            <div className="cse_course_title">{program.name ?? ''}</div>
            <div className="cse_course_info">
                <div><strong>Duration</strong><br />{program.duration ? program.duration + ' years' : "—"}</div>
                <div><strong>Affiliation</strong><br />{program.affiliation ?? "—"}</div>
                <div><strong>Approvals</strong><br />{program.approvals ?? "—"}</div>
            </div>
            <Link className="strech_link" href={BASE_URL + 'program/' + program.slug} />
        </div>
    );
}

interface CourseSectionProps {
    label: string;
    programs: Program[];
}

function CourseSection({ label, programs }: CourseSectionProps) {

    return (
        <div className="cse_cou_list">
            <p>{label}</p>
            {!programs.length && <p>No courses available.</p>}
            {programs.map((program, idx:number) => (
                <CourseCard key={idx} program={program} />
            ))}
        </div>
    );
}

export default async function DepartmentHomeCourses({params}:{params:{slug:string}}) {
    const {slug} = params;

    const data = await getDepartmentCourse(slug);

    const underGraduateData = data?.filter((item) => item.type === 'under-graduate') ?? [];
    const postGraduateData = data?.filter((item) => item.type === 'post-graduate') ?? [];

    return (
        <div className="cou_off_box">
            <CourseSection label="Under Graduate Courses" programs={underGraduateData} />
            <CourseSection label="Post Graduate Courses" programs={postGraduateData} />
        </div>
    );
}