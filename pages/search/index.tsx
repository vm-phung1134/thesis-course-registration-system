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

function SearchPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchClassroomResult, setSearchClassroomResult] = useState<
    IClassroomObject[]
  >([]);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
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

  useEffect(() => {
    if (classrooms && classrooms.length > 0) {
      setSearchClassroomResult(classrooms);
    }
    if (searchValue !== "") {
      const filterFunction = (entry: IClassroomObject) =>
        Object.values(entry).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(searchValue.toLowerCase())
        );

      setSearchClassroomResult(classrooms.filter(filterFunction));
    }
  }, [searchValue, classrooms]);
  return (
    <MainboardTemplate title="Search | Thesis course registration system">
      {loading ? (
        <SnipperRound />
      ) : (
        <>
          <Breadcrumb dataBreadcrumb={BREADCRUMB_SEARCH_PAGE} />
          <div className="my-5">
            <h4 className="uppercase text-green-700">
              The result match your search key work:{" "}
              <span className="capitalize text-red-700 ml-3">
                {searchValue}
              </span>
            </h4>
            <div className="mt-3 uppercase w-1/2 text-sm font-medium flex items-center gap-3">
              <p>Classroom</p>
              <div className="flex-grow h-[1px] bg-gray-300"></div>
            </div>
            <div className="flex flex-wrap gap-5 mt-5">
              {classrooms?.map((item, index) => {
                return <ClassroomCard key={item.id} item={item} />;
              })}
            </div>
            <div className="mt-3 uppercase text-sm font-medium flex items-center gap-3 w-1/2">
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
