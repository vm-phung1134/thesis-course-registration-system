import React, { useState, useEffect } from "react";
import { Avatar, Button, SnipperRound } from "@/components/Atoms";
import { AdminTemplate } from "@/components/Templates";
import { FilterScheduledForm, ScheduleForm } from "@/components/Molecules";
import { useAppDispatch } from "@/redux/store";
import { createScheduleDef } from "@/redux/reducer/schedule-def/api";
import { IThesisDef } from "@/interface/schedule";
import { useQuery } from "@tanstack/react-query";

function DashboardPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { data: scheduled } = useQuery<IThesisDef>({
    queryKey: ["scheduled"],
    queryFn: async () => {
      const action = await dispatch(createScheduleDef());
      return action.payload || {};
    },
  });
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  }, []);
  return (
    <>
      <AdminTemplate title="Schedule time thesis defense | Thesis course registration system">
        {loading ? (
          <SnipperRound />
        ) : (
          <>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between mt-5">
                <h4 className="uppercase text-green-700 font-medium text-base">
                  Schedule time thesis defense
                </h4>
                <button className="border px-10 py-2 text-sm">
                  More Actions
                </button>
              </div>
              <ul className="flex gap-3 mt-2 border-b text-[15px] cursor-pointer">
                <li className="border-b-2 px-3 py-2 border-green-700">
                  Schedule time
                </li>
                <li className="px-3 py-2">Setting schedule</li>
                <li className="px-3 py-2">Calender</li>
              </ul>
              <div className="w-full mt-5 px-3">
                <ScheduleForm />
                <div className="flex gap-5 justify-between">
                  <div className="">
                    <p className="py-1 text-sm">Noted</p>
                    <ul className="font-thin text-xs">
                      <li>
                        {` The start time for thesis defense will be calculated from
                      7:00AM - 11:30AM (morning shift) and 13:30PM - 17:00PM
                      (afternoon shift).`}
                      </li>
                      <li>
                        {`Thesis defense days of the week from Monday to Saturday.`}
                      </li>
                      <li>
                        {`Each student has 30 minutes to defend their thesis and answer questions.`}
                      </li>
                      <li>
                        {`The time interval between students is 10 minutes.`}
                      </li>
                    </ul>
                  </div>
                  <div className="h-full w-60 shadow-xl py-3 px-5 cursor-pointer">
                    <h4 className="uppercase text-xs py-2 text-green-700">
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
                <h4 className="text-lg font-medium py-5">List of scheduled</h4>
                <div className="flex justify-between">
                  <div className="flex">
                    <Button
                      title="Recently date"
                      className="px-5 btn-sm bg-gray-800 text-white"
                    />
                    <Button title="Ascending order" className="px-5 btn-sm" />
                    <Button title="All" className="px-5 btn-sm" />
                  </div>
                  <div>
                    <FilterScheduledForm holderText="Filter schedule time ..." />
                  </div>
                </div>
                <div className="flex justify-end mt-3">
                  <ul className="flex gap-2 text-sm cursor-pointer">
                    <li className="text-green-700">Save to database</li>
                    <span className="text-gray-400">|</span>
                    <li className="text-red-700">Delete</li>
                    <span className="text-gray-400">|</span>
                    <li className="text-red-700">Clear all</li>
                  </ul>
                </div>
                <div className="mt-3">
                  <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                      <thead className="text-sm font-normal capitalize text-gray-200 bg-green-700">
                        <tr>
                          <th className="px-5 py-2 whitespace-nowrap">
                            <div className="font-normal text-left">
                              Full name
                            </div>
                          </th>
                          <th className="px-5 py-2 whitespace-nowrap">
                            <div className="font-normal text-left">Email</div>
                          </th>
                          <th className="px-5 py-2 whitespace-nowrap">
                            <div className="font-normal text-left">Date</div>
                          </th>
                          <th className="px-5 py-2 whitespace-nowrap">
                            <div className="font-normal text-center">Room</div>
                          </th>
                          <th className="px-5 py-2 whitespace-nowrap">
                            <div className="font-normal text-center">Shift</div>
                          </th>
                          <th className="px-5 py-2 whitespace-nowrap">
                            <div className="font-normal text-center">
                              {`Time ( 24 hours )`}
                            </div>
                          </th>
                          <th className="px-5 py-2 whitespace-nowrap">
                            <div className="font-normal text-end">Actions</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-gray-100">
                        {scheduled?.thesis.map((scheduled, index) => (
                          <React.Fragment key={index}>
                            {scheduled?.schedule.timeSlots.map(
                              (student, studentIndex) => (
                                <React.Fragment key={studentIndex}>
                                  {student.student.id && (
                                    <tr>
                                      <td className="px-5 py-2 whitespace-nowrap">
                                        <div className="flex items-center">
                                          <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                            <Avatar
                                              widthStr="50"
                                              srcImg={
                                                student.student.infor.photoSrc
                                              }
                                            />
                                          </div>
                                          <div className="font-medium text-gray-800">
                                            {student.student.infor.name}
                                          </div>
                                        </div>
                                      </td>
                                      <td className="px-5 py-2 whitespace-nowrap">
                                        <div className="text-left">
                                          {student.student.infor.email}
                                        </div>
                                      </td>
                                      <td className="px-5 py-2 whitespace-nowrap">
                                        <div className="text-left">
                                          {student.timeSlot.date}
                                        </div>
                                      </td>
                                      <td className="px-5 py-2 whitespace-nowrap">
                                        <div className="text-center">
                                          {scheduled.schedule.room.name}
                                        </div>
                                      </td>
                                      <td className="px-5 py-2 whitespace-nowrap">
                                        <div className="text-center">
                                          {student.timeSlot.shift}
                                        </div>
                                      </td>
                                      <td className="px-5 py-2 whitespace-nowrap">
                                        <div className="text-center">
                                          {student.timeSlot.time}
                                        </div>
                                      </td>
                                      <td className="px-5 py-2 whitespace-nowrap">
                                        <div className="justify-end flex gap-3">
                                          <button>Update</button>
                                          <button>Detail</button>
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </React.Fragment>
                              )
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </AdminTemplate>
    </>
  );
}

export default DashboardPage;
