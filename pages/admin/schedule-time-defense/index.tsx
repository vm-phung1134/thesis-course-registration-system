import React, { useState, useEffect } from "react";
import { Breadcrumb, SnipperRound } from "@/components/Atoms";
import { AdminTemplate } from "@/components/Templates";
import {
  ManualTestingSchedule,
  SettingSchedule,
  TestingSchedule,
} from "@/components/Molecules";
import { useAppDispatch } from "@/redux/store";
import { getScheduleDef } from "@/redux/reducer/schedule-def/api";
import { IThesisDef } from "@/interface/schedule";
import { useQuery } from "@tanstack/react-query";
import { BREADCRUMB_SCHEDULE } from "./mock-data";
import { ScheduleTime } from "@/components/Organisms";

function DashboardPage() {
  type MenuItem = {
    id: number;
    label: string;
  };
  const menuItems: MenuItem[] = [
    { id: 1, label: "Schedule Time" },
    { id: 2, label: "Settings" },
    { id: 3, label: "Manual Testing" },
    { id: 4, label: "Mock Testing" },
    { id: 5, label: "Calender" },
  ];
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { data: scheduled } = useQuery<IThesisDef | null>({
    queryKey: ["admin-schedule-def"],
    queryFn: async () => {
      const action = await dispatch(getScheduleDef());
      return action.payload || null;
    },
    initialData: null,
  });
  const [selectedItem, setSelectedItem] = useState<MenuItem>(menuItems[0]);

  const handleClick = (item: MenuItem) => {
    setSelectedItem(item);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);
  return (
    <>
      <AdminTemplate title="Schedule time thesis defense | Thesis course registration system">
        {loading && scheduled == null ? (
          <SnipperRound />
        ) : (
          <>
            <Breadcrumb dataBreadcrumb={BREADCRUMB_SCHEDULE} />
            <div className="flex flex-col gap-3">
              <div className="flex justify-between mt-5">
                <div className="py-1 flex gap-2 items-center w-full">
                  <h4 className="text-xl capitalize text-green-700 font-medium ">
                    Schedule time
                    <span className="text-green-700"> thesis defense</span>
                  </h4>
                  <div className="flex-grow h-[0.5px] bg-green-700"></div>
                </div>
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
              {selectedItem.id === 1 && <ScheduleTime scheduled={scheduled} />}
              {selectedItem.id === 2 && <SettingSchedule />}
              {selectedItem.id === 3 && <ManualTestingSchedule />}
              {selectedItem.id === 4 && <TestingSchedule />}
            </div>
          </>
        )}
      </AdminTemplate>
    </>
  );
}

export default DashboardPage;
