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

function ScheduleThesisDefensePage() {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { currentUser } = useCurrentUser();
  const { data: scheduleForLecturer } = useQuery<ICouncilDef[]>({
    queryKey: ["schedule-lecturer", currentUser.id],
    queryFn: async () => {
      const action = await dispatch(getScheduleForLecturer(currentUser.id));
      return action.payload || [];
    },
    initialData: [],
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  const {
    filteredData: council_filteredData,
    handleSearch: council_handleSearch,
  } = useTableSearch(scheduleForLecturer);
  return (
    <MainboardTemplate title="Schedule report | Thesis course registration system">
      {loading ? (
        <SnipperRound />
      ) : (
        <>
          <Breadcrumb dataBreadcrumb={BREADCRUMB_MAINBOARD} />
          <div>
            <div className="my-3 py-2 flex gap-2 items-center">
              <h4 className="text-xl capitalize text-green-700 font-medium ">
                Thesis defense{" "}
                <span className="text-orange-600"> review schedule</span>
              </h4>
              <div className="flex-grow h-[0.5px] bg-green-700"></div>
            </div>
            <h4 className="font-medium">Your schedule arrange</h4>
            <p className="text-sm text-slate-500">
              Total {scheduleForLecturer.length} schedule time slots
            </p>
            <div className="flex justify-between mt-5">
              <div className="flex">
                <Button
                  title="Recently date"
                  className="px-5 bg-gray-700 text-white btn-sm rounded-none"
                />
                <Button
                  title="Ascending order"
                  className="px-5 btn-sm rounded-none"
                />
                <Button title="All" className="px-5 btn-sm rounded-none" />
              </div>
              <div>
                <FilterScheduledForm
                  handleSearch={council_handleSearch}
                  holderText="Filter schedule time ..."
                />
              </div>
            </div>
            <div className="mt-8">
              <div className="overflow-x-auto min-h-[50vh]">
                <table className="table-auto w-full border shadow-lg">
                  <thead className="text-sm font-medium capitalize text-gray-200 bg-green-700">
                    <tr>
                      <th className="px-5 py-4 whitespace-nowrap">
                        <div className="font-medium text-left">Email</div>
                      </th>
                      <th className="px-5 py-4 whitespace-nowrap">
                        <div className="font-medium text-left">
                          Role council
                        </div>
                      </th>
                      <th className="px-5 py-4 whitespace-nowrap">
                        <div className="font-medium text-left">Date</div>
                      </th>
                      <th className="px-5 py-4 whitespace-nowrap">
                        <div className="font-medium text-center">Room</div>
                      </th>
                      <th className="px-5 py-4 whitespace-nowrap">
                        <div className="font-medium text-center">
                          Quantity student
                        </div>
                      </th>
                      <th className="px-5 py-4 whitespace-nowrap">
                        <div className="font-medium text-center">
                          {`Time ( 24 hours )`}
                        </div>
                      </th>
                      <th className="px-5 py-4 whitespace-nowrap">
                        <div className="font-medium text-end">Actions</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    <AnimatePresence>
                      {council_filteredData?.map((schedule, index) => (
                        <React.Fragment key={index}>
                          {schedule?.council
                            .filter((item) => item?.id === "GV5")
                            .map((council) => (
                              <motion.tr
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                key={council.id}
                              >
                                <td className="px-5 py-3 whitespace-nowrap">
                                  <div className="text-left">
                                    {council?.email}
                                  </div>
                                </td>
                                <td className="px-5 py-3 whitespace-nowrap">
                                  <div className="text-left">Instructor</div>
                                </td>
                                <td className="px-5 py-3 whitespace-nowrap">
                                  <div className="text-left">
                                    {
                                      schedule?.schedule?.timeSlots[0]?.timeSlot
                                        ?.date
                                    }
                                  </div>
                                </td>
                                <td className="px-5 py-3 whitespace-nowrap">
                                  <div className="text-center">
                                    {schedule?.schedule?.room?.name}
                                  </div>
                                </td>
                                <td className="px-5 py-3 whitespace-nowrap">
                                  <div className="text-center">
                                    {
                                      schedule?.schedule?.timeSlots?.filter(
                                        (item) => item?.student?.id !== ""
                                      ).length
                                    }{" "}
                                    / {schedule?.schedule?.timeSlots?.length}
                                  </div>
                                </td>
                                <td className="px-5 py-3 whitespace-nowrap">
                                  <div className="text-center">
                                    7:00 - 17:30
                                  </div>
                                </td>
                                <td className="px-5 py-3 whitespace-nowrap">
                                  <div className="justify-end flex gap-3">
                                    <Link
                                      href={`/report-schedule/schedule-detail/${schedule?.id}`}
                                    >
                                      <button className="text-sky-700">
                                        Join room
                                      </button>
                                    </Link>
                                  </div>
                                </td>
                              </motion.tr>
                            ))}
                        </React.Fragment>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </MainboardTemplate>
  );
}

export default ScheduleThesisDefensePage;
