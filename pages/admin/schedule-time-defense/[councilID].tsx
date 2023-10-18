import React, { useState, useEffect } from "react";
import { Avatar, Breadcrumb, Button, SnipperRound } from "@/components/Atoms";
import { AdminTemplate } from "@/components/Templates";
import { FilterScheduledForm, ScheduleForm } from "@/components/Molecules";
import { useAppDispatch } from "@/redux/store";
import {
  getOneCouncilInSchedule,
  getScheduleDef,
} from "@/redux/reducer/schedule-def/api";
import { ICouncilDef, IThesisDef } from "@/interface/schedule";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BREADCRUMB_SCHEDULE_DEDTAIL } from "./mock-data";

function DashboardPage() {
  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const id = params.get("councilID") || "";
  const [loading, setLoading] = useState<boolean>(true);
  const { data: councilInSchedule } = useQuery<ICouncilDef>({
    queryKey: ["council-in-schedule"],
    queryFn: async () => {
      const action = await dispatch(getOneCouncilInSchedule(id));
      return action.payload || {};
    },
  });
  let currentDate = new Date(
    councilInSchedule?.schedule.timeSlots[0].timeSlot.date || ""
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
            <h4 className="uppercase text-green-700 font-medium py-2">
              Detail information schedule thesis defense
            </h4>
            <div className="my-5">
              <h5 className="font-medium text-sm tracking-wider my-2 text-gray-600 font-mono uppercase">
                Thesis committee member
              </h5>
              <div className="flex justify-between">
                <div className="flex gap-3 tracking-wider">
                  {councilInSchedule?.council.map((council) => (
                    <div key={council.id} className="shadow-md w-fit px-5 py-3 flex flex-col justify-center">
                      <p>
                        Examinator:
                        <span className="capitalize text-sm font-medium">
                          {council.name}
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
                  <p className="text-sm text-end font-medium tracking-wider">November 2023</p>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-medium text-sm tracking-wider my-2 text-gray-600 font-mono uppercase">
                Schedule defense of students
              </h5>
              <div className="mt-5">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead className="text-sm font-normal capitalize text-gray-200 bg-green-700">
                      <tr>
                        <th className="px-5 py-3 whitespace-nowrap">
                          <div className="font-normal text-left">Full name</div>
                        </th>
                        <th className="px-5 py-3 whitespace-nowrap">
                          <div className="font-normal text-left">Email</div>
                        </th>
                        <th className="px-5 py-3 whitespace-nowrap">
                          <div className="font-normal text-left">Date</div>
                        </th>
                        <th className="px-5 py-3 whitespace-nowrap">
                          <div className="font-normal text-center">Room</div>
                        </th>
                        <th className="px-5 py-3 whitespace-nowrap">
                          <div className="font-normal text-center">Shift</div>
                        </th>
                        <th className="px-5 py-3 whitespace-nowrap">
                          <div className="font-normal text-center">Time</div>
                        </th>
                        <th className="px-5 py-3 whitespace-nowrap">
                          <div className="font-normal text-end">Actions</div>
                        </th>
                      </tr>
                    </thead>
                    {
                      <tbody className="text-sm divide-y divide-gray-100">
                        {councilInSchedule?.schedule.timeSlots
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
              <div className="mt-5">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead className="text-sm font-normal capitalize text-gray-200 bg-green-700">
                      <tr>
                        <th className="px-5 py-3 whitespace-nowrap">
                          <div className="font-normal text-left">Full name</div>
                        </th>
                        <th className="px-5 py-3 whitespace-nowrap">
                          <div className="font-normal text-left">Email</div>
                        </th>
                        <th className="px-5 py-3 whitespace-nowrap">
                          <div className="font-normal text-left">Date</div>
                        </th>
                        <th className="px-5 py-3 whitespace-nowrap">
                          <div className="font-normal text-center">Room</div>
                        </th>
                        <th className="px-5 py-3 whitespace-nowrap">
                          <div className="font-normal text-center">Shift</div>
                        </th>
                        <th className="px-5 py-3 whitespace-nowrap">
                          <div className="font-normal text-center">Time</div>
                        </th>
                        <th className="px-5 py-3 whitespace-nowrap">
                          <div className="font-normal text-end">Actions</div>
                        </th>
                      </tr>
                    </thead>
                    {
                      <tbody className="text-sm divide-y divide-gray-100">
                        {councilInSchedule?.schedule.timeSlots
                          ?.filter(
                            (item) => item.timeSlot.shift === "Afternoon"
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
            </div>
          </>
        )}
      </AdminTemplate>
    </>
  );
}

export default DashboardPage;

{
  /* <tbody className="text-sm divide-y divide-gray-100">
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
                      </tbody> */
}
