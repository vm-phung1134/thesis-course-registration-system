/* eslint-disable @next/next/no-img-element */
import { Avatar, Breadcrumb, Button, SnipperRound } from "@/components/Atoms";
import { AdminTemplate } from "@/components/Templates";
import { useState, useEffect } from "react";
import { BREADCRUMB_ADMIN_CLASSROOM_MANAGEMENT } from "../classroom-management/mock-data";
import { CouncilManagementTab } from "@/components/Organisms/Admin/CouncilManagement";
import { CreateRoomTab } from "@/components/Organisms/Admin/RoomManagement";

function ThesisCommittee() {
  type MenuItem = {
    id: number;
    label: string;
  };
  const menuItems: MenuItem[] = [
    { id: 1, label: "Council" },
    { id: 2, label: "Room" },
    { id: 3, label: "Document" },
  ];
  const [selectedItem, setSelectedItem] = useState<MenuItem>(menuItems[0]);

  const handleClick = (item: MenuItem) => {
    setSelectedItem(item);
  };
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1300);
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
            <h4 className="text-base uppercase text-green-700 font-medium mt-3">
              Thesis committee
            </h4>
            <ul className="flex gap-3 mt-2 border-b text-[15px] cursor-pointer">
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  className={`px-3 py-2 ${
                    selectedItem.id === item.id
                      ? "border-green-700 border-b-2 font-medium"
                      : ""
                  }`}
                  onClick={() => handleClick(item)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
          {selectedItem.id === 1 && <CouncilManagementTab/>}
          {selectedItem.id === 2 && <CreateRoomTab/>}
        </>
      )}
    </AdminTemplate>
  );
}

export default ThesisCommittee;
