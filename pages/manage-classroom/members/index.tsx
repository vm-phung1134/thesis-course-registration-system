import { ClassroomTemplate } from "@/components/Templates";
import { DATA_CARD_STUDENT, DATA_FILTER_MEMBER } from "./mock-data";
import { CardStudent } from "@/components/Molecules";
import { SelectBox } from "@/components/Atoms";
import { ICategoryObject } from "@/interface/category";
import { IOptionItem } from "@/interface/filter";
import { SetStateAction, useState } from "react";

function MemberTab() {
  const [selectedFilter, setSelectedFilter] = useState<
    IOptionItem | ICategoryObject
  >({
    label: "Filter list student",
    value: "",
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
            return <CardStudent key={student.id} student={student} />;
          })}
        </div>
      </div>
    </ClassroomTemplate>
  );
}

export default MemberTab;
