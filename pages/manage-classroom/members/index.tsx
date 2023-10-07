import { ClassroomTemplate } from "@/components/Templates";
import { DATA_CARD_STUDENT, DATA_FILTER_MEMBER } from "./mock-data";
import { SelectBox } from "@/components/Atoms";
import { ICategoryObject } from "@/interface/category";
import { IOptionItem } from "@/interface/filter";
import { useState } from "react";
import { CardMember } from "@/components/Molecules";
import classNames from "classnames";
import { InforMemberModal } from "@/components/Organisms";
import { useQuery } from "@tanstack/react-query";
import { IMemberObject } from "@/interface/member";
import {
  getAllMemberClassroom,
} from "@/redux/reducer/member/api";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getTopic } from "@/redux/reducer/topic/api";
import { useClassroomStateContext } from "@/contexts/classroomState";

function MemberTab() {
  const [selectedFilter, setSelectedFilter] = useState<
    IOptionItem | ICategoryObject
  >({
    label: "Filter list student",
    value: "",
  });
  const [openModalMemberDetail, setOpenModalMemberDetail] =
    useState<boolean>(false);
  const modalClass = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModalMemberDetail,
  });

  // HANDLE API MEMBER ARRAY
  const dispatch = useAppDispatch();
  const { authClassroomState } = useClassroomStateContext();
  const { topic } = useAppSelector((state) => state.topicReducer);
  const { data: members } = useQuery<IMemberObject[]>({
    queryKey: ["members"],
    queryFn: async () => {
      const action = await dispatch(
        getAllMemberClassroom(authClassroomState.classroom || authClassroomState)
      );
      return action.payload || [];
    },
    initialData: [],
  });
  const handleGetTopicMember = (member: IMemberObject) => {
    dispatch(getTopic(member?.member));
  };
  return (
    <ClassroomTemplate title="Members | Thesis course registration system">
      <div className="py-5">
        <div className="flex justify-between items-center">
          <h4 className="uppercase text-md py-5 text-green-700 font-medium">
            List students <span className="text-xs">{`( ${members.length | 0}/15 members )`}</span>
          </h4>
          <SelectBox
            options={DATA_FILTER_MEMBER}
            selected={selectedFilter}
            setSelected={setSelectedFilter}
          />
        </div>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {members?.map((member) => {
            return (
              <CardMember
                handleGetTopicMember={handleGetTopicMember}
                setOpenMemberModal={setOpenModalMemberDetail}
                openMemberModal={openModalMemberDetail}
                key={member.id}
                member={member}
              />
            );
          })}
        </div>
        <InforMemberModal
          topic={topic}
          modalClass={modalClass}
          setOpenMemberModal={setOpenModalMemberDetail}
          openMemberModal={openModalMemberDetail}
        />
      </div>
    </ClassroomTemplate>
  );
}

export default MemberTab;
