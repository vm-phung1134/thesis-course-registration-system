/* eslint-disable @next/next/no-img-element */
import { Breadcrumb, SnipperRound } from "@/components/Atoms";
import { AdminTemplate } from "@/components/Templates";
import { useState, useEffect } from "react";
import { BREADCRUMB_ADMIN_CLASSROOM_MANAGEMENT } from "../classroom-management/mock-data";
import { CouncilManagementTab } from "@/components/Organisms/Admin/CouncilManagement";
import { CreateRoomTab } from "@/components/Organisms/Admin/RoomManagement";
import { InstructorSchedule } from "@/components/Organisms";

function ThesisCommittee() {
  type MenuItem = {
    id: number;
    label: string;
  };
  const menuItems: MenuItem[] = [
    { id: 1, label: "Council" },
    { id: 2, label: "Room" },
    { id: 3, label: "Instructor schedule" },
  ];
  const [selectedItem, setSelectedItem] = useState<MenuItem>(menuItems[0]);

  const handleClick = (item: MenuItem) => {
    setSelectedItem(item);
  };
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <AdminTemplate title="Thesis committee | Thesis course registration system">
      {loading ? (
        <SnipperRound />
      ) : (
        <>
          <div className="mt-5">
            <Breadcrumb
              dataBreadcrumb={BREADCRUMB_ADMIN_CLASSROOM_MANAGEMENT}
            />
            <div className="py-1 flex gap-2 items-center w-full">
              <h4 className="text-xl capitalize text-green-700 font-medium ">
                Thesis committee
                <span className="text-green-700"></span>
              </h4>
              <div className="flex-grow h-[0.5px] bg-green-700"></div>
            </div>
            <ul className="flex gap-3 mt-2 border-b text-[15px] cursor-pointer">
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  className={`px-3 py-2 ${
                    selectedItem.id === item.id
                      ? "border-orange-600 text-orange-600 border-b-2 font-medium"
                      : ""
                  }`}
                  onClick={() => handleClick(item)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
          {selectedItem.id === 1 && <CouncilManagementTab />}
          {selectedItem.id === 2 && <CreateRoomTab />}
          {selectedItem.id === 3 && <InstructorSchedule />}
        </>
      )}
    </AdminTemplate>
  );
}

export default ThesisCommittee;
