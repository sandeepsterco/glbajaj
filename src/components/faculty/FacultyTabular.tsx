import Link from "next/link";
import PaginationWrapper from "../common/pagination/PaginationWrapper";
import { BASE_URL } from "@/src/config/config";

interface FacultyTabularProps {
  data: {
    data: any[];
    current_page: number;
    last_page: number;
  };
  currentPage: number;
  pageKey: string; // "table_page"
}

export default function FacultyTabular({
  data,
  currentPage,
  pageKey,
}: FacultyTabularProps) {
  const tableData = data?.data ?? [];
  const totalPages = data?.last_page ?? 1;

  return (
    <>
      <div className="tabular-list">
        <div className="table-wrapper ">
          <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Designation</th>
                <th>Qualification</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item: any, idx: number) => (
                <tr key={idx} className="relative">
                  <td data-label="Name">{item?.name}</td>
                  <td data-label="Designation">
                    {item?.designation ?? "__"}
                  </td>
                  <td data-label="Qualification">
                    {item?.degree ?? "__"}
                  </td>
                  {/* {item?.slug && (
                    <Link
                        href={`${BASE_URL}faculty/${item.slug}`}
                        className="strech_link"
                    />
                    )} */}
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          
        </div>
      </div>

      <PaginationWrapper
        currentPage={currentPage}
        totalPages={totalPages}
        pageKey={pageKey}
      />
    </>
  );
}