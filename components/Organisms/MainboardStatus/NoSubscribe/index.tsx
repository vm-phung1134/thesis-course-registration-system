import {
  Breadcrumb,
  Button,
  SelectBox,
  SnipperRound,
} from "@/components/Atoms";
import { Pagination } from "@/components/Molecules";
import { ICategoryObject } from "@/interface/category";
import { IOptionItem } from "@/interface/filter";
import { FC, useState, useEffect } from "react";
import {
  BREADCRUMB_MAINBOARD,
  DATA_FILTER_COURSE,
  DATA_FILTER_TOPICS,
} from "../mock-data";
import { ClassroomCard } from "../..";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { IClassroomObject } from "@/interface/classroom";
import { getAllClassrooms } from "@/redux/reducer/classroom/api";

export interface INoSubscribeViewProps {}

export const NoSubscribeView: FC<INoSubscribeViewProps> = () => {
  const [filterCourse, setFilterCourse] = useState<
    IOptionItem | ICategoryObject
  >({
    label: "Filter course",
    value: "",
  });
  const [filterTopic, setFilterTopic] = useState<IOptionItem | ICategoryObject>(
    {
      label: "Filter Topic",
      value: "",
    }
  );
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const { data: classrooms } = useQuery<IClassroomObject[]>({
    queryKey: ["classrooms"],
    queryFn: async () => {
      const action = await dispatch(getAllClassrooms());
      return action.payload || [];
    },
    initialData: [],
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages] = useState<number>(10);
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  }, []);
  return (
    <>
      {loading ? (
        <SnipperRound />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div className="mt-3 flex gap-3 w-1/3">
              <div className="flex-grow">
                <SelectBox
                  setSelected={setFilterCourse}
                  selected={filterCourse}
                  options={DATA_FILTER_COURSE}
                  setPadding="lg"
                />
              </div>
              <div className="flex-grow">
                <SelectBox
                  setSelected={setFilterTopic}
                  selected={filterTopic}
                  options={DATA_FILTER_TOPICS}
                  setPadding="lg"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-5 mt-5">
            {classrooms?.map((item, index) => {
              return <ClassroomCard key={item.id} item={item} />;
            })}
          </div>
          <div className="flex justify-center mt-10">
            <Pagination
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
              totalPages={totalPages}
              currentPage={currentPage}
            />
          </div>
        </>
      )}
    </>
  );
};
