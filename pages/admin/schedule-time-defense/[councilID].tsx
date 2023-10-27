import React, { useState, useEffect } from "react";
import {
  Avatar,
  Breadcrumb,
  Button,
  NormalAvatar,
  SnipperRound,
} from "@/components/Atoms";
import { AdminTemplate } from "@/components/Templates";
import { useAppDispatch } from "@/redux/store";
import { getOneCouncilInScheduleStudent } from "@/redux/reducer/schedule-def/api";
import { ICouncilDef } from "@/interface/schedule";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { BREADCRUMB_SCHEDULE_DEDTAIL } from "./mock-data";
import { FilterScheduledForm } from "@/components/Molecules";

function ScheduleDetailPage() {
  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const id = params.get("councilID") || "";
  const [loading, setLoading] = useState<boolean>(true);
  const [getInstructor, setInstructor] = useState<string>("");

  const { data: councilInSchedule } = useQuery<ICouncilDef>({
    queryKey: ["council-in-schedule-student", id],
    queryFn: async () => {
      const action = await dispatch(getOneCouncilInScheduleStudent(id));
      return action.payload || {};
    },
  });
  const getInstructorInCouncil = (id: string) => {
    setInstructor(id);
  };
  let currentDate = new Date(
    councilInSchedule?.schedule?.timeSlots[0]?.timeSlot?.date ?? "11 6, 2023"
  );
  const day = currentDate.getDate();
  const getDayInWeek = (numDay: number) => {
    const newDate = new Date(`11 ${day + numDay}, 2023`);
    const shortDate = newDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    return shortDate.slice(0, 3);
  };
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
            <Breadcrumb dataBreadcrumb={BREADCRUMB_SCHEDULE_DEDTAIL} />
            <div className="my-3 py-2 flex gap-2 items-center">
              <h4 className="text-xl capitalize text-green-700 font-medium ">
                Detail information Schedule
                <span className="text-orange-600"> thesis defense</span>
              </h4>
              <div className="flex-grow h-[0.5px] bg-green-700"></div>
            </div>
            <div className="my-5">
              <h5 className="font-medium tracking-wider my-2 text-black">
                Thesis committee member
              </h5>
              <div className="flex justify-between">
                <div className="flex gap-3 tracking-wider">
                  {councilInSchedule?.council?.map((council) => (
                    <div
                      key={council.id}
                      className="shadow-lg overflow-hidden relative w-fit rounded-xl px-5 py-4 flex flex-col justify-center"
                    >
                      <div className="top-0 -left-10 bottom-0 bg-slate-50 absolute w-full h-full -skew-x-[30deg]"></div>
                      <div className="absolute bottom-0 right-0">
                        <NormalAvatar
                          photoSrc={council.photoSrc}
                          setSize="w-8"
                        />
                      </div>
                      <div className="relative">
                        <p className="text-sm font-semibold">
                          <span className="capitalize font-bold">
                            {council.name} {" "}
                            <span className="text-red-500">
                              {council.id ===
                                councilInSchedule?.schedule?.timeSlots[0]
                                  ?.student?.instructor?.id && "- Instructor"}
                            </span>
                          </span>
                        </p>
                        <div className="text-sm">
                          <p>
                            <span className="text-gray-500">Email: </span>
                            {council.email}
                          </p>
                          <p>
                            <span className="text-gray-500">Field: </span>
                            {council.major}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col bg-white shadow-md rounded-lg mx-auto py-4 px-2">
                  <div className="flex justify-start md:justify-center ">
                    <div className="flex group hover:bg-red-500 hover:shadow-lg hover-dark-shadow rounded-lg mx-1 transition-al first-line:duration-300 cursor-pointer justify-center w-12">
                      <div className="flex items-center p-3">
                        <div className="text-center">
                          <p className="text-gray-900 group-hover:text-gray-100 text-sm transition-al duration-300">
                            {getDayInWeek(-3)}
                          </p>
                          <p className="text-gray-900 group-hover:text-gray-100 mt-1 group-hover:font-bold transition-all	duration-300">
                            {currentDate.getDate() - 3}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex group hover:bg-red-500 hover:shadow-lg hover-dark-shadow rounded-lg mx-1 transition-all duration-300 cursor-pointer justify-center  w-12">
                      <div className="flex items-center p-3">
                        <div className="text-center">
                          <p className="text-gray-900 group-hover:text-gray-100 text-sm transition-all only:duration-300">
                            {getDayInWeek(-2)}
                          </p>
                          <p className="text-gray-900 group-hover:text-gray-100 mt-1 group-hover:font-bold transition-all	duration-300">
                            {currentDate.getDate() - 2}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex group hover:bg-red-500 hover:shadow-lg hover-dark-shadow rounded-lg mx-1 transition-all	duration-300	 cursor-pointer justify-center  w-12">
                      <div className="flex items-center p-3">
                        <div className="text-center">
                          <p className="text-gray-900 group-hover:text-gray-100 text-sm transition-all	duration-300">
                            {getDayInWeek(-1)}
                          </p>
                          <p className="text-gray-900 group-hover:text-gray-100 mt-1 group-hover:font-bold transition-all	duration-300">
                            {currentDate.getDate() - 1}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex group bg-red-600 shadow-lg dark-shadow rounded-lg mx-1 cursor-pointer justify-center relative  w-12">
                      <span className="flex h-3 w-3 absolute -top-1 -right-1">
                        <span className="animate-ping absolute group-hover:opacity-75 opacity-0 inline-flex h-full w-full rounded-full"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-200"></span>
                      </span>
                      <div className="flex items-center p-3">
                        <div className="text-center">
                          <p className="text-gray-100 text-sm">
                            {getDayInWeek(0)}
                          </p>
                          <p className="text-gray-100  mt-1 font-bold">
                            {" "}
                            {day}{" "}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex group hover:bg-red-500 hover:shadow-lg hover-dark-shadow rounded-lg mx-1 transition-all	duration-300 cursor-pointer justify-center w-12">
                      <div className="flex items-center p-3">
                        <div className="text-center">
                          <p className="text-gray-900 group-hover:text-gray-100 text-sm transition-all	duration-300">
                            {getDayInWeek(1)}
                          </p>
                          <p className="text-gray-900 group-hover:text-gray-100 mt-1 group-hover:font-bold transition-all	duration-300">
                            {currentDate.getDate() + 1}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex group hover:bg-red-500 hover:shadow-lg hover-dark-shadow rounded-lg mx-1 transition-all	duration-300	 cursor-pointer justify-center  w-12">
                      <div className="flex items-center p-3">
                        <div className="text-center">
                          <p className="text-gray-900 group-hover:text-gray-100 text-sm transition-all	duration-300">
                            {getDayInWeek(2)}
                          </p>
                          <p className="text-gray-900 group-hover:text-gray-100 mt-1 group-hover:font-bold transition-all	duration-300">
                            {currentDate.getDate() + 2}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex group hover:bg-red-500 hover:shadow-lg hover-dark-shadow rounded-lg mx-1 transition-all	duration-300	 cursor-pointer justify-center w-12">
                      <div className="flex items-center p-3">
                        <div className="text-center">
                          <p className="text-gray-900 group-hover:text-gray-100 text-sm transition-all	duration-300">
                            {getDayInWeek(3)}
                          </p>
                          <p className="text-gray-900 group-hover:text-gray-100 mt-1 group-hover:font-bold transition-all	duration-300">
                            {currentDate.getDate() + 3}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-end font-medium tracking-wider">
                    November 2023
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="mb-3">
                <h4 className="font-medium">Schedule defense of students</h4>
                <p className="text-sm text-slate-500">Total 12 students</p>
              </div>
              <div className="flex justify-between">
                <div className="flex mb-3 rounded-none">
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
                  <FilterScheduledForm holderText="Search schedule time ..." />
                </div>
              </div>
              <div className="mt-5 shadow-xl rounded-2xl">
                <div className="overflow-x-auto rounded-2xl">
                  <table className="table-auto w-full">
                    <thead className="text-sm font-medium capitalize text-gray-200 bg-green-700">
                      <tr>
                        <th className="px-5 py-4 whitespace-nowrap">
                          <div className="font-medium text-left">Full name</div>
                        </th>
                        <th className="px-5 py-4 whitespace-nowrap">
                          <div className="font-medium text-left">Email</div>
                        </th>
                        <th className="px-5 py-4 whitespace-nowrap">
                          <div className="font-medium text-left">Date</div>
                        </th>
                        <th className="px-5 py-4 whitespace-nowrap">
                          <div className="font-medium text-center">Room</div>
                        </th>
                        <th className="px-5 py-4 whitespace-nowrap">
                          <div className="font-medium text-center">Shift</div>
                        </th>
                        <th className="px-5 py-4 whitespace-nowrap">
                          <div className="font-medium text-center">Time</div>
                        </th>
                        <th className="px-5 py-4 whitespace-nowrap">
                          <div className="font-medium text-end">Actions</div>
                        </th>
                      </tr>
                    </thead>
                    {
                      <tbody className="text-sm divide-y divide-gray-100">
                        {councilInSchedule?.schedule?.timeSlots
                          ?.filter((item) => item.timeSlot.shift === "Morning")
                          .map((student, index) => (
                            <React.Fragment key={index}>
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
                                      <div className="text-gray-800">
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
                                      {councilInSchedule.schedule.room.name}
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
                                      <button className="text-blue-500">
                                        Edit
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))}
                      </tbody>
                    }
                  </table>
                </div>
              </div>
              <div className="mt-5 shadow-xl rounded-2xl">
                <div className="overflow-x-auto rounded-2xl">
                  <table className="table-auto w-full">
                    <thead className="text-sm font-medium capitalize text-gray-200 bg-green-700">
                      <tr>
                        <th className="px-5 py-4 whitespace-nowrap">
                          <div className="font-medium text-left">Full name</div>
                        </th>
                        <th className="px-5 py-4 whitespace-nowrap">
                          <div className="font-medium text-left">Email</div>
                        </th>
                        <th className="px-5 py-4 whitespace-nowrap">
                          <div className="font-medium text-left">Date</div>
                        </th>
                        <th className="px-5 py-4 whitespace-nowrap">
                          <div className="font-medium text-center">Room</div>
                        </th>
                        <th className="px-5 py-4 whitespace-nowrap">
                          <div className="font-medium text-center">Shift</div>
                        </th>
                        <th className="px-5 py-4 whitespace-nowrap">
                          <div className="font-medium text-center">Time</div>
                        </th>
                        <th className="px-5 py-4 whitespace-nowrap">
                          <div className="font-medium text-end">Actions</div>
                        </th>
                      </tr>
                    </thead>
                    {
                      <tbody className="text-sm divide-y divide-gray-100">
                        {councilInSchedule?.schedule?.timeSlots
                          ?.filter(
                            (item) => item?.timeSlot?.shift === "Afternoon"
                          )
                          .map((student, index) => (
                            <React.Fragment key={index}>
                              {student.student.id && (
                                <tr>
                                  <td className="px-5 py-2 whitespace-nowrap">
                                    <div className="flex items-center">
                                      <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                        <Avatar
                                          widthStr="50"
                                          srcImg={
                                            student?.student?.infor?.photoSrc
                                          }
                                        />
                                      </div>
                                      <div className="font-medium text-gray-800">
                                        {student?.student?.infor?.name}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-5 py-2 whitespace-nowrap">
                                    <div className="text-left">
                                      {student?.student?.infor?.email}
                                    </div>
                                  </td>
                                  <td className="px-5 py-2 whitespace-nowrap">
                                    <div className="text-left">
                                      {student?.timeSlot.date}
                                    </div>
                                  </td>
                                  <td className="px-5 py-2 whitespace-nowrap">
                                    <div className="text-center">
                                      {councilInSchedule?.schedule?.room?.name}
                                    </div>
                                  </td>
                                  <td className="px-5 py-2 whitespace-nowrap">
                                    <div className="text-center">
                                      {student?.timeSlot?.shift}
                                    </div>
                                  </td>
                                  <td className="px-5 py-2 whitespace-nowrap">
                                    <div className="text-center">
                                      {student?.timeSlot?.time}
                                    </div>
                                  </td>
                                  <td className="px-5 py-2 whitespace-nowrap">
                                    <div className="justify-end flex gap-3">
                                      <button className="text-blue-500">
                                        Edit
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))}
                      </tbody>
                    }
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </AdminTemplate>
    </>
  );
}

export default ScheduleDetailPage;
