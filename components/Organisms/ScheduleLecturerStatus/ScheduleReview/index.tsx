import { Button } from "@/components/Atoms";
import { FilterScheduledForm } from "@/components/Molecules";
import { useCurrentUserContext } from "@/contexts/currentUserContext";
import { useTableSearch } from "@/hooks/useTableSearch";
import { ICouncilDef } from "@/interface/schedule";
import { getScheduleForLecturer } from "@/redux/reducer/schedule-def/api";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { FC, useState } from "react";

export interface IScheduleReviewProp {}

export const ScheduleReview: FC<IScheduleReviewProp> = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { currentUser } = useCurrentUserContext();
  const { data: scheduleForLecturer } = useQuery<ICouncilDef[]>({
    queryKey: ["schedule-lecturer", currentUser.id],
    queryFn: async () => {
      const action = await dispatch(getScheduleForLecturer(currentUser.id));
      return action.payload || [];
    },
    initialData: [],
  });
  const {
    filteredData: council_filteredData,
    handleSearch: council_handleSearch,
  } = useTableSearch(scheduleForLecturer);
  return (
    <>
      <div>
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
                    <div className="font-medium text-left">Role council</div>
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
                        .filter((item) => item?.id === currentUser.id)
                        .map((council) => (
                          <motion.tr
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key={council.id}
                          >
                            <td className="px-5 py-3 whitespace-nowrap">
                              <p className="text-left">{council?.email}</p>
                            </td>
                            <td className="px-5 py-3 whitespace-nowrap">
                              <p className="text-left">Instructor</p>
                            </td>
                            <td className="px-5 py-3 whitespace-nowrap">
                              <p className="text-left">
                                {
                                  schedule?.schedule?.timeSlots[0]?.timeSlot
                                    ?.date
                                }
                              </p>
                            </td>
                            <td className="px-5 py-3 whitespace-nowrap">
                              <p className="text-center">
                                {schedule?.schedule?.room?.name}
                              </p>
                            </td>
                            <td className="px-5 py-3 whitespace-nowrap">
                              <p className="text-center">
                                {
                                  schedule?.schedule?.timeSlots?.filter(
                                    (item) => item?.student?.id !== ""
                                  ).length
                                }{" "}
                                / {schedule?.schedule?.timeSlots?.length}
                              </p>
                            </td>
                            <td className="px-5 py-3 whitespace-nowrap">
                              <p className="text-center">7:00 - 17:30</p>
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
  );
};
