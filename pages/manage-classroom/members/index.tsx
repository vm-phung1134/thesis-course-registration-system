import { ClassroomTemplate } from "@/components/Templates";
import { DATA_CARD_STUDENT, DATA_FILTER_MEMBER } from "./mock-data";
import { SelectBox } from "@/components/Atoms";
import { ICategoryObject } from "@/interface/category";
import { IOptionItem } from "@/interface/filter";
import { useState } from "react";
import { CardMember } from "@/components/Molecules";
import { useQuery } from "@tanstack/react-query";
import { IMemberObject } from "@/interface/member";
import { getAllMemberClassroom } from "@/redux/reducer/member/api";
import { useAppDispatch } from "@/redux/store";
import { useClassroomStateContext } from "@/contexts/classroomState";
import {
  DATA_FILTER_COURSE,
  DATA_FILTER_TOPICS,
} from "@/components/Organisms/MainboardStatus/mock-data";

function MemberTab() {
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
  // HANDLE API MEMBER ARRAY
  const dispatch = useAppDispatch();
  const { authClassroomState } = useClassroomStateContext();
  const { data: members } = useQuery<IMemberObject[]>({
    queryKey: ["members", authClassroomState],
    queryFn: async () => {
      const action = await dispatch(getAllMemberClassroom(authClassroomState));
      return action.payload || [];
    },
    initialData: [],
  });
  return (
    <ClassroomTemplate title="Members | Thesis course registration system">
      <>
        <div className="flex flex-col">
          <h4 className="text-base py-5 text-green-700 font-medium">
            List students{" "}
            <span className="text-xs">{`( ${
              members.length | 0
            }/15 Members )`}</span>
          </h4>
          <div>
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
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {members?.map((member) => {
            return <CardMember key={member.id} member={member} index={0} />;
          })}
        </div>
      </>
    </ClassroomTemplate>
  );
}

export default MemberTab;
