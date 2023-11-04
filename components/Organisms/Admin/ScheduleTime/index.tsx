import { Button } from "@/components/Atoms";
import { FilterScheduledForm, ScheduleForm } from "@/components/Molecules";
import { IThesisDef } from "@/interface/schedule";
import Link from "next/link";
import React, { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useToastifyMessage from "@/hooks/useToastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useTableSearch } from "@/hooks/useTableSearch";

export interface IScheduleTimeProps {
  setCreateScheduled: React.Dispatch<any>;
  createScheduled: any;
  scheduled: IThesisDef | null;
}

export const ScheduleTime: FC<IScheduleTimeProps> = ({
  setCreateScheduled,
  createScheduled,
  scheduled,
}) => {
  const {
    filteredData: schedule_filteredData,
    handleSearch: schedule_handleSearch,
  } = useTableSearch(scheduled?.thesis as any);
  return (
    <>
      <div className="w-full mt-5 px-3">
        <ScheduleForm
          setCreateScheduled={setCreateScheduled}
          createScheduled={createScheduled}
        />
        <div className="flex gap-5 justify-between">
          <div className="">
            <p className="py-1 text-sm">Noted</p>
            <ul className="font-thin text-xs">
              <li>
                {` The start time for thesis defense will be calculated from
                      7:00AM - 11:30AM (morning shift) and 13:30PM - 17:30PM
                      (afternoon shift).`}
              </li>
              <li>
                {`Thesis defense days of the week from Monday to Saturday.`}
              </li>
              <li>
                {`Each student has 40 minutes to defend their thesis and answer questions.`}
              </li>
            </ul>
          </div>
          <div className="h-full w-60 shadow-xl bg-slate-50 rounded-xl py-4 px-5 cursor-pointer">
            <h4 className="text-sm font-bold py-2 text-green-700">
              Related Shortcut
            </h4>
            <ul className="text-sm flex flex-col gap-2">
              <li>Faculty List Management</li>
              <li>Manage student lists</li>
              <li>Manage room lists</li>
            </ul>
          </div>
        </div>
      </div>
      {/* LIST AFTER SCHEDULED */}
      <div className="px-3">
        <div className="flex justify-between items-center">
          <div className="mb-3">
            <h4 className="font-medium">Progress scheduled</h4>
            <p className="text-sm text-slate-500">
              Total {schedule_filteredData.length} schedules
            </p>
          </div>
          <div className="flex justify-end my-3">
            <ul className="flex gap-2 text-sm cursor-pointer">
              <li className="text-green-700">Save to database</li>
              <span className="text-gray-400">|</span>
              <li className="text-red-700">Delete</li>
              <span className="text-gray-400">|</span>
              <li className="text-red-700">Clear all</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex">
            <Button
              title="Recently date"
              className="px-5 btn-sm bg-gray-800 text-white rounded-none"
            />
            <Button
              title="Ascending order"
              className="px-5 btn-sm rounded-none"
            />
            <Button title="All" className="px-5 btn-sm rounded-none" />
          </div>
          <div>
            <FilterScheduledForm
              handleSearch={schedule_handleSearch}
              holderText="Filter schedule time ..."
            />
          </div>
        </div>
        <div className="mt-3 min-h-[80vh] w-full">
          <div className="overflow-x-auto border shadow-xl">
            <table className="table-auto w-full">
              <thead className="text-sm font-medium capitalize text-gray-200 bg-green-700">
                <tr>
                  <th
                    scope="col"
                    className="py-3 pl-3 text-sm text-start font-medium tracking-wider text-gray-200  dark:text-green-400"
                  >
                    No.
                  </th>
                  <th className="px-5 py-4 whitespace-nowrap">
                    <div className="font-medium text-left">Name council</div>
                  </th>
                  <th className="px-5 py-4 whitespace-nowrap">
                    <div className="font-medium text-left">Room</div>
                  </th>
                  <th className="px-5 py-4 whitespace-nowrap">
                    <div className="font-medium text-left">Date</div>
                  </th>
                  <th className="px-5 py-4 whitespace-nowrap">
                    <div className="font-medium text-center">
                      Q. member council
                    </div>
                  </th>
                  <th className="px-5 py-4 whitespace-nowrap">
                    <div className="font-medium text-center">
                      Q. student defense
                    </div>
                  </th>
                  <th className="px-5 py-4 whitespace-nowrap">
                    <div className="font-medium text-center">Create at</div>
                  </th>
                  <th className="px-5 py-4 whitespace-nowrap">
                    <div className="font-medium text-end">Actions</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                <AnimatePresence>
                  {(schedule_filteredData || []).map(
                    (scheduled: any, index: number) => (
                      <React.Fragment key={index}>
                        <motion.tr
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <td className="px-5 py-2 whitespace-nowrap">
                            <div className="text-left">{(index += 1)}</div>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <div className="text-left">
                              Council {`${(index += 1)}`}
                            </div>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <div className="text-left">
                              {scheduled.schedule.room.name}
                            </div>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <div className="text-left">
                              {scheduled.schedule.timeSlots[0].timeSlot.date}
                            </div>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <div className="text-center">
                              {scheduled.council.length}
                            </div>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <div className="text-center">
                              {
                                scheduled.schedule.timeSlots.filter(
                                  (item: any) => item.student.infor.id !== ""
                                ).length
                              }
                            </div>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <div className="text-center">
                              Thurday, 27-12-2023
                            </div>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <div className="justify-end flex gap-3">
                              <Link
                                href={`/admin/schedule-time-defense/${scheduled.id}`}
                              >
                                <button className="text-blue-500">View</button>
                              </Link>
                            </div>
                          </td>
                        </motion.tr>
                      </React.Fragment>
                    )
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
