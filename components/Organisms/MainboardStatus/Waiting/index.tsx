import { SelectBox, SnipperRound } from "@/components/Atoms";
import { FC, useEffect, useState } from "react";
import { IClassroomObject } from "@/interface/classroom";
import { FilterScheduledForm } from "@/components/Molecules";
import { ClassroomCard } from "../..";
import { useSubscribeStateContext } from "@/contexts/subscribeState";
import { IMemberObject } from "@/interface/member";
import { ICategoryObject } from "@/interface/category";
import { IOptionItem } from "@/interface/filter";
import { DATA_FILTER_COURSE, DATA_FILTER_TOPICS } from "../mock-data";

export interface IWaitingViewProps {
  classroom?: IClassroomObject;
}

export const WaitingView: FC<IWaitingViewProps> = ({ classroom }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const { subscribeState } = useSubscribeStateContext();
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
            <FilterScheduledForm holderText="Searching classroom ..." />
          </div>
          <div className="flex flex-wrap gap-5 mt-5">
            {subscribeState?.member?.map((item: IMemberObject) => {
              return (
                <ClassroomCard key={item.id} item={item.classroom} index={0} />
              );
            })}
          </div>
        </>
      )}
    </>
  );
};
