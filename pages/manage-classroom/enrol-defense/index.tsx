import { ClassroomTemplate } from "@/components/Templates";
import { useState } from "react";
import { MemberEnrolled, MemberUnregister } from "@/components/Organisms";

function EnrollTab() {
  type MenuItem = {
    id: number;
    label: string;
  };
  const menuItems: MenuItem[] = [
    { id: 1, label: "Member enrolled" },
    { id: 2, label: "Member unregistered" },
  ];
  const [selectedItem, setSelectedItem] = useState<MenuItem>(menuItems[0]);
  const handleClick = (item: MenuItem) => {
    setSelectedItem(item);
  };
  return (
    <ClassroomTemplate title="Enroll | Thesis course registration system">
      <div className="py-5">
        <ul className="flex gap-3 mt-2 border-b text-[15px] cursor-pointer">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`px-3 py-2 ${
                selectedItem.id === item.id
                  ? "border-green-700 text-green-700 border-b-2 font-medium"
                  : ""
              }`}
              onClick={() => handleClick(item)}
            >
              {item.label}
            </li>
          ))}
        </ul>
        {selectedItem.id === 1 && <MemberEnrolled />}
        {selectedItem.id === 2 && <MemberUnregister />}
      </div>
    </ClassroomTemplate>
  );
}

export default EnrollTab;
