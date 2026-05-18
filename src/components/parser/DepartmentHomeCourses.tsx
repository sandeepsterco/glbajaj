"use client"

import { apiFetch } from "@/src/lib/api"
import { useQuery } from "@tanstack/react-query"
import { SkeletonGroup } from "../ui/Skeleton";
import { usePathname } from "next/navigation";
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

interface CourseCardProps {
    program: Program;
}

function CourseCard({ program }: any) {
    return (
        <div className="cse_course relative">
            <div className="cse_course_title">{program.name ?? ''}</div>
            <div className="cse_course_info">
                <div><strong>Duration</strong><br />{program.duration ?? "—"}</div>
                <div><strong>Affiliation</strong><br />{program.affiliation ?? "—"}</div>
                <div><strong>Approvals</strong><br />{program.approvals ?? "—"}</div>
            </div>
            <Link className="strech_link" href={BASE_URL + 'courses/' + program.slug} />
        </div>
    );
}

interface CourseSectionProps {
    label: string;
    programs: Program[];
}

function CourseSection({ label, programs }: CourseSectionProps) {
    if (!programs.length) return null;

    return (
        <div className="cse_cou_list">
            <p>{label}</p>
            {programs.map((program, idx:number) => (
                <CourseCard key={idx} program={program} />
            ))}
        </div>
    );
}

export default function DepartmentHomeCourses() {
    const pathname = usePathname();
    const slug = pathname.split('/').filter(Boolean).pop() ?? '';

    const { data, isLoading, isError } = useQuery({
        queryKey: ["department-home-courses", slug], // ✅ slug included so it refetches on route change
        queryFn: () => getDepartmentCourse(slug),
        enabled: !!slug,
    });

    const underGraduateData = data?.filter((item) => item.type === 'under-graduate') ?? [];
    const postGraduateData = data?.filter((item) => item.type === 'post-graduate') ?? [];

    if (isLoading) {
        return (
            <SkeletonGroup
                wrapperClassName="flex mt-[7.7rem] gap-[4rem]"
                count={1}
                className="bg-gray-300 h-[51.1rem] w-full"
            />
        );
    }

    if (isError) {
        return <p className="text-red-500">Failed to load courses. Please try again.</p>;
    }

    if (!underGraduateData.length && !postGraduateData.length) {
        return <p>No courses available for this department.</p>;
    }

    return (
        <div className="cou_off_box">
            <CourseSection label="Under Graduate Courses" programs={underGraduateData} />
            <CourseSection label="Post Graduate Courses" programs={postGraduateData} />
        </div>
    );
}