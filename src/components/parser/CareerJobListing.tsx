"use client";

import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { SkeletonGroup } from "../ui/Skeleton";
import PaginationWrapper from "../common/pagination/PaginationWrapper";

type JobOpening = {
  title: string;
  experience: string;
  type: string;
  slug: string;
  id: number;
  departments: string[];
};

const JOB_TYPES = ["Under Graduate", "Post Graduate"] as const;

const fetchJobListing = async (page: number) => {
  const { data, error } = await apiFetch(`job-openings?page=${page}`);
  if (error) throw new Error(error);
  return data?.job_openings ?? {};
};

function JobItem({
  job,
  hrefPrefix,
}: {
  job: JobOpening;
  hrefPrefix: string;
}) {
  return (
    <div className="cr-item">
      <div className="cr-left">
        <h5 className="cr-post">{job.title}</h5>
        <div className="dep-left">
          {job.departments?.map((dept) => (
            <h6 key={dept}>{dept}</h6>
          ))}
          {job.experience && (
            <p className="cr-exp">Experience : {job.experience}</p>
          )}
        </div>
      </div>
      <div className="cr-right">
        {job.slug && (
          <>
            <Link className="apply_btn view" href={`${hrefPrefix}/${job.slug}`}>
              View
            </Link>
            <Link
              className="apply_btn apply"
              href={`${hrefPrefix}/${job.slug}#apply`}
            >
              Apply
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function CareerJobListing() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("job_listing_page")) || 1;
  const parentSlug = pathname.split("/").filter(Boolean).pop();
  const hrefPrefix = `${BASE_URL}${parentSlug}`;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["job_listing", page],
    queryFn: () => fetchJobListing(page),
  });

  const jobs: JobOpening[] = data?.data ?? [];

  if (isLoading) {
    return (
      <SkeletonGroup
        wrapperClassName="!mt-[3rem] !block"
        count={1}
        className="bg-gray-300 h-[50rem] w-full"
      />
    );
  }

  if (isError || !jobs.length) return null;

  const jobsByType = JOB_TYPES.map((type) => ({
    type,
    jobs: jobs.filter((job) => job.type === type),
  })).filter((group) => group.jobs.length > 0);

  return (
    <>
      {jobsByType.map((group, index) => (
        <div
          key={group.type}
          className={`cr-list${index === 0 ? " ug_list" : ""}`}
        >
          <h3 className="cr-title font24">{group.type}</h3>
          {group.jobs.map((job) => (
            <JobItem key={job.id} job={job} hrefPrefix={hrefPrefix} />
          ))}
        </div>
      ))}

      {(data?.last_page ?? 1) > 1 && (
        <PaginationWrapper
          currentPage={data?.current_page || 1}
          totalPages={data?.last_page || 1}
          pageKey="job_listing_page"
        />
      )}
    </>
  );
}
