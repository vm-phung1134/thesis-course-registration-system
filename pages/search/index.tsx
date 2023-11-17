import { Breadcrumb, SnipperRound } from "@/components/Atoms";
import { MainboardTemplate } from "@/components/Templates";
import { BREADCRUMB_SEARCH_PAGE } from "./mock-data";
import { ClassroomCard } from "@/components/Organisms";
import { useEffect, useState } from "react";
import { IClassroomObject } from "@/interface/classroom";
import { useSearchContext } from "@/contexts/useSearchContext";
import { getAllClassrooms } from "@/redux/reducer/classroom/api";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";

function SearchPage() {
  const [loading, setLoading] = useState<boolean>(true);
  // HANDLE SEARCH RESULT
  const { searchValue } = useSearchContext();
  const dispatch = useAppDispatch();
  const { data: classrooms } = useQuery<IClassroomObject[]>({
    queryKey: ["classrooms"],
    queryFn: async () => {
      const action = await dispatch(getAllClassrooms());
      return action.payload || [];
    },
    initialData: [],
  });
  const debouncedSearchTerm = useDebounce(searchValue, 1000);
  const [filteredData, setFilteredData] =
    useState<IClassroomObject[]>(classrooms);
  useEffect(() => {
    const searchInObject = (obj: any): boolean => {
      for (const key in obj) {
        const value = obj[key];
        if (
          typeof value === "string" &&
          value.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        ) {
          return true;
        }
        if (typeof value === "object" && searchInObject(value)) {
          return true;
        }
      }
      return false;
    };

    const filtered = classrooms?.filter((entry) => searchInObject(entry));
    setFilteredData(filtered || []);
  }, [debouncedSearchTerm, classrooms]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);
  return (
    <MainboardTemplate title="Search | Thesis course registration system">
      {loading ? (
        <SnipperRound />
      ) : (
        <>
          <Breadcrumb dataBreadcrumb={BREADCRUMB_SEARCH_PAGE} />
          <div className="my-5">
            <h4 className="text-green-700 font-medium text-lg">
              The result match your search key work:{" "}
              <span className="capitalize text-red-700 ml-3 font-normal">
                {searchValue}
              </span>
            </h4>
            <div className="mt-3 w-1/2 text-base font-medium flex items-center gap-3">
              <p>All the classrooms</p>
              <div className="flex-grow h-[1px] bg-gray-300"></div>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-5 mt-5">
              {filteredData?.map((item, index) => {
                return (
                  <ClassroomCard index={index} key={item.id} item={item} />
                );
              })}
            </div>
            <div className="mt-3 text-base font-medium flex items-center gap-3 w-1/2">
              <p>Post and Exercise</p>
              <div className="flex-grow h-[1px] bg-gray-300"></div>
            </div>
          </div>
        </>
      )}
    </MainboardTemplate>
  );
}

export default SearchPage;
