import { ClassroomTemplate } from "@/components/Templates";
import { DATA_CARD_STUDENT, DATA_FILTER_MEMBER } from "./mock-data";
import { SelectBox } from "@/components/Atoms";
import { ICategoryObject } from "@/interface/category";
import { IOptionItem } from "@/interface/filter";
import { useState } from "react";
import { CardMember } from "@/components/Molecules";
import classNames from "classnames";
import { InforMemberModal } from "@/components/Organisms";

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
  return (
    <ClassroomTemplate title="Members | Thesis course registration system">
      <div className="py-5">
        <div className="flex justify-between items-center">
          <h4 className="uppercase text-md py-5 text-green-700 font-medium">
            List students <span className="text-xs">{`( 13/15 members )`}</span>
          </h4>
          <SelectBox
            options={DATA_FILTER_MEMBER}
            selected={selectedFilter}
            setSelected={setSelectedFilter}
          />
        </div>
        <div className="grid grid-cols-4 gap-3 mt-5">
          {DATA_CARD_STUDENT.map((student) => {
            return (
              <CardMember
                setOpenMemberModal={setOpenModalMemberDetail}
                openMemberModal={openModalMemberDetail}
                key={student.id}
                student={student}
              />
            );
          })}
        </div>
        <InforMemberModal
          member={DATA_CARD_STUDENT[1]}
          modalClass={modalClass}
          setOpenMemberModal={setOpenModalMemberDetail}
          openMemberModal={openModalMemberDetail}
        />
      </div>
    </ClassroomTemplate>
  );
}

export default MemberTab;
