import { Avatar } from "@/components/Atoms";
import { IAuthObject } from "@/components/Molecules/CardCourse/mock-data";
import { ClassroomTemplate } from "@/components/Templates";
import { DATA_CARD_STUDENT } from "./mock-data";
import { CardStudent } from "@/components/Molecules";

function MemberTab() {
  return (
    <ClassroomTemplate title="Members | Thesis course registration system">
      <div className="py-5">
        <div className="flex justify-between items-center">
          <h4 className="uppercase text-md py-5">List students</h4>
          <select className="select font-normal select-sm select-bordered rounded-none focus:outline-none max-w-xs">
            <option>Sort by name A-Z</option>
            <option>Large Apple</option>
            <option>Large Orange</option>
            <option>Large Tomato</option>
          </select>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {DATA_CARD_STUDENT.map((student) => {
            return <CardStudent key={student.id} student={student} />;
          })}
        </div>
      </div>
    </ClassroomTemplate>
  );
}

export default MemberTab;
