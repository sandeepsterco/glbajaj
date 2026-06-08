import { BASE_URL } from "@/src/config/config";
import Image from "next/image";
import Link from "next/link";
import PaginationWrapper from "../common/pagination/PaginationWrapper";

interface FacultyListProps {
  data: {
    data: any[];
    current_page: number;
    last_page: number;
  };
  currentPage: number;
  pageKey: string; // "grid_page"
}

export default function FacultyList({
  data,
  currentPage,
  pageKey,
}: FacultyListProps) {
  const items = data?.data ?? [];
  const totalPages = data?.last_page ?? 1;

  return (
    <>
      <div className="faculty_grid">
        {items.map((item: any, idx: number) => (
          <div key={idx} className="faculty_Bx">
            <figure class="flash-effect-2">
              <Image
                src={item?.image || "/images/default/faculty.webp"}
                width={255}
                height={287}
                className="img-fluid w-100"
                loading="lazy"
                alt={item.name || "faculty image"}
              />
            </figure>
            {item?.name && <h5>{item.name}</h5>}
            {item?.type && <p>{item.type}</p>}
            {/* {item?.slug && (
              <Link
                href={`${BASE_URL}faculty/${item.slug}`}
                className="strech_link"
              />
            )} */}
          </div>
        ))}
      </div>

      <PaginationWrapper
        currentPage={currentPage}
        totalPages={totalPages}
        pageKey={pageKey}
      />
    </>
  );
}