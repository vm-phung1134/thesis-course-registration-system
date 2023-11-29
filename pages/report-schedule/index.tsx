import { Avatar, Breadcrumb, Button, SnipperRound } from "@/components/Atoms";
import { FilterScheduledForm } from "@/components/Molecules";
import { BREADCRUMB_MAINBOARD } from "@/components/Organisms/MainboardStatus/mock-data";
import { MainboardTemplate } from "@/components/Templates";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { useTableSearch } from "@/hooks/useTableSearch";
import { ICouncilDef } from "@/interface/schedule";
import { getScheduleForLecturer } from "@/redux/reducer/schedule-def/api";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCurrentUserContext } from "@/contexts/currentUserContext";
import {
  PersonalSchedule,
  ScheduleReview,
} from "@/components/Organisms/ScheduleLecturerStatus";

type MenuItem = {
  id: number;
  label: string;
};
const menuItems: MenuItem[] = [
  { id: 1, label: "Schedule Review" },
  { id: 2, label: "Schedule Personally" },
];

function ScheduleThesisDefensePage() {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const [selectedItem, setSelectedItem] = useState<MenuItem>(menuItems[0]);
  const { currentUser } = useCurrentUserContext();
  const { data: scheduleForLecturer } = useQuery<ICouncilDef[]>({
    queryKey: ["schedule-lecturer", currentUser.id],
    queryFn: async () => {
      const action = await dispatch(getScheduleForLecturer(currentUser.id));
      return action.payload || [];
    },
    initialData: [],
  });

  const handleClick = (item: MenuItem) => {
    setSelectedItem(item);
  };

  const renderMenuItems = () => {
    return (
      <ul className="flex gap-3 my-2 border-b text-[15px] cursor-pointer">
        {menuItems?.map((item) => (
          <li
            key={item.id}
            className={`px-3 py-2 tracking-wider ${
              selectedItem?.id === item?.id
                ? "border-orange-600 border-b-2 text-orange-600"
                : ""
            }`}
            onClick={() => handleClick(item)}
          >
            {item?.label}
          </li>
        ))}
      </ul>
    );
  };

  const renderScheduleView = () => {
    switch (selectedItem?.id) {
      case 1:
        return <ScheduleReview />;
      case 2:
        return <PersonalSchedule />;
      default:
        return null;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);
  return (
    <MainboardTemplate title="Schedule report | Thesis course registration system">
      {loading ? (
        <SnipperRound />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Breadcrumb dataBreadcrumb={BREADCRUMB_MAINBOARD} />
          <div className="py-2 my-3 flex gap-2 items-center">
            <h4 className="text-xl capitalize text-green-700 font-medium ">
              Schedule <span className="text-green-700"> instructor</span>
            </h4>
            <div className="flex-grow h-[0.5px] bg-green-700"></div>
          </div>
          {renderMenuItems()}
          {renderScheduleView()}
        </motion.div>
      )}
    </MainboardTemplate>
  );
}

export default ScheduleThesisDefensePage;
