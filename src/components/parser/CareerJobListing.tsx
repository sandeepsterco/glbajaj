"use client";

import { BASE_URL } from "@/src/config/config";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
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
              href={`${hrefPrefix}/${job.slug}/apply-now`}
            >
              Apply
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function CareerJobListing({data}: {data: any}) {
  const hrefPrefix = `${BASE_URL}careers`;

  const jobs: JobOpening[] = data?.job_openings?.data ?? [];

  if (!jobs.length) return null;

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
