import { SelectBox, SnipperRound } from "@/components/Atoms";
import { EmptySpace, FilterScheduledForm } from "@/components/Molecules";
import { ICategoryObject } from "@/interface/category";
import { IOptionItem } from "@/interface/filter";
import { FC, useState, useEffect } from "react";
import { DATA_FILTER_COURSE, DATA_FILTER_TOPICS } from "../mock-data";
import { ClassroomCard } from "../..";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { IClassroomObject } from "@/interface/classroom";
import { getAllClassrooms } from "@/redux/reducer/classroom/api";
import { useTableSearch } from "@/hooks/useTableSearch";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";

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
    queryKey: ["all-classrooms"],
    queryFn: async () => {
      const action = await dispatch(getAllClassrooms());
      return action.payload || [];
    },
    initialData: [],
  });
  const { filteredData: class_filteredData, handleSearch: class_handleSearch } =
    useTableSearch(classrooms);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
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
            <FilterScheduledForm
              handleSearch={class_handleSearch}
              holderText="Searching classroom ..."
            />
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-5 mt-5">
            {class_filteredData?.map((item, index) => {
              return <ClassroomCard index={index} key={item.id} item={item} />;
            })}
          </div>
          {classrooms?.length === 0 && (
            <EmptySpace text="There is no classroom currently" />
          )}
        </>
      )}
    </>
  );
};
