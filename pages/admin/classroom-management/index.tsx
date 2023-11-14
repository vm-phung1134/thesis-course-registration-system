/* eslint-disable @next/next/no-img-element */
import { Avatar, Breadcrumb, Button, SnipperRound } from "@/components/Atoms";
import { AdminTemplate } from "@/components/Templates";
import { BREADCRUMB_ADMIN_CLASSROOM_MANAGEMENT } from "./mock-data";
import { useState, useEffect } from "react";
import {
  CreateAccountTab,
  CreateClassroomTab,
} from "@/components/Organisms/Admin";

function ClassroomManagement() {
  type MenuItem = {
    id: number;
    label: string;
  };
  const menuItems: MenuItem[] = [
    { id: 1, label: "Create classroom" },
    { id: 2, label: "Account" },
    { id: 3, label: "Message" },
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
    <AdminTemplate title="Classroom management | Thesis course registration system">
      {loading ? (
        <SnipperRound />
      ) : (
        <>
          <div className="mt-5">
            <Breadcrumb
              dataBreadcrumb={BREADCRUMB_ADMIN_CLASSROOM_MANAGEMENT}
            />
            <div className="my-3 py-2 flex gap-2 items-center">
              <h4 className="text-xl capitalize text-green-700 font-medium ">
                Classroom <span className="text-green-700"> management</span>
              </h4>
              <div className="flex-grow h-[0.5px] bg-green-700"></div>
            </div>
            <ul className="flex gap-3 mt-2 border-b text-[15px] cursor-pointer">
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  className={`px-3 py-2 ${
                    selectedItem.id === item.id
                      ? "border-orange-600 border-b-2 text-orange-600"
                      : ""
                  }`}
                  onClick={() => handleClick(item)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
          {selectedItem.id === 1 && <CreateClassroomTab />}
          {selectedItem.id === 2 && <CreateAccountTab />}
        </>
      )}
    </AdminTemplate>
  );
}

export default ClassroomManagement;
