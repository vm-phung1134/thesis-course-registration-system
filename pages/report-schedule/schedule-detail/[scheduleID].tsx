import { Breadcrumb, SnipperRound } from "@/components/Atoms";
import { BREADCRUMB_MAINBOARD } from "@/components/Organisms/MainboardStatus/mock-data";
import { MainboardTemplate } from "@/components/Templates";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAppDispatch } from "@/redux/store";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ICouncilDef } from "@/interface/schedule";
import { getOneCouncilInScheduleLecturer } from "@/redux/reducer/schedule-def/api";

function ScheduleDetail() {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const id = params.get("scheduleID") || "";
  const { data: councilInSchedule } = useQuery<ICouncilDef>({
    queryKey: ["council-in-schedule-lecturer", id],
    queryFn: async () => {
      const action = await dispatch(getOneCouncilInScheduleLecturer(id));
      return action.payload || {};
    },
  });
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      <MainboardTemplate title="Schedule detail | Thesis course registration system">
        {loading ? (
          <SnipperRound />
        ) : (
          <>
            <Breadcrumb dataBreadcrumb={BREADCRUMB_MAINBOARD} />
            <div className="grid grid-cols-12 gap-3 mt-5">
              <div className="col-span-4">
                <div className="p-5 border">
                  <div className="text-sm my-1 flex gap-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3 h-3"
                    >
                      <path d="M19 12H6M12 5l-7 7 7 7" />
                    </svg>{" "}
                    <p> Back to schedule</p>
                  </div>
                  <h5 className="text-green-700 text-sm my-2 font-medium uppercase">
                    The Crown Prosecution Service
                  </h5>
                  <p className="normal-case text-gray-400 text-xs italic">
                    Date of foundation of the council 14/11/2023
                  </p>
                  <div className="bg-green-700 h-[1px] w-full my-3"></div>
                  <ul className="text-sm flex flex-col gap-2">
                    <li className="flex gap-2">
                      <p>Chairman of the Council: </p>
                      <p className="capitalize font-medium">Tran cong an</p>
                    </li>
                    <li className="flex gap-2">
                      <p>The clerk to the council: </p>
                      <p className="capitalize font-medium">
                        Tran Thi thuy trang
                      </p>
                    </li>
                  </ul>
                  <div className="bg-green-700 h-[0.5px] w-full my-3"></div>
                  <ul className="text-sm flex flex-col gap-2">
                    {councilInSchedule?.council.map((lecturer, index) => (
                      <li key={lecturer.id} className="flex gap-2">
                        <p>Examner {`${(index += 1)}`}: </p>
                        <p className="capitalize font-medium">
                          {lecturer.name}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-span-8">
                <h5 className="text-green-700 text-sm my-2 font-medium uppercase">
                  List student of defense session
                </h5>
                <div>
                  <div className="overflow-x-auto">
                    <table className="table-auto w-full border">
                      <thead className="text-sm font-normal capitalize text-gray-200 bg-green-700">
                        <tr>
                          <th className="px-5 py-3 whitespace-nowrap">
                            <div className="font-normal text-left">Email</div>
                          </th>
                          <th className="px-5 py-3 whitespace-nowrap">
                            <div className="font-normal text-left">Name</div>
                          </th>
                          <th className="px-5 py-3 whitespace-nowrap">
                            <div className="font-normal text-left">
                              ID Student
                            </div>
                          </th>
                          <th className="px-5 py-3 whitespace-nowrap">
                            <div className="font-normal text-center">
                              {`Time ( 24 hours )`}
                            </div>
                          </th>
                          <th className="px-5 py-3 whitespace-nowrap">
                            <div className="font-normal text-end">Actions</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-gray-100">
                        {councilInSchedule?.schedule.timeSlots
                          .filter((item) => item.timeSlot.shift === "Morning")
                          .map((student, index) => (
                            <tr key={student.student.id} className="border-b">
                              <td className="px-5 py-3 whitespace-nowrap">
                                <div className="text-left">
                                  {student.student.infor.email}
                                </div>
                              </td>
                              <td className="px-5 py-3 whitespace-nowrap">
                                <div className="text-left">
                                  {student.student.infor.name}
                                </div>
                              </td>
                              <td className="px-5 py-3 whitespace-nowrap">
                                <div className="text-left">B1910282</div>
                              </td>
                              <td className="px-5 py-3 whitespace-nowrap">
                                <div className="text-center">
                                  {student.timeSlot.time}
                                </div>
                              </td>
                              <td className="px-5 py-3 whitespace-nowrap">
                                <div className="justify-end flex gap-3">
                                  <Link
                                    href={`/report-schedule/schedule-detail/thesis-student/${student.student.infor.id}`}
                                  >
                                    <button className="text-sky-700">
                                      View
                                    </button>
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="overflow-x-auto my-5">
                    <table className="table-auto w-full border">
                      <thead className="text-sm font-normal capitalize text-gray-200 bg-green-700">
                        <tr>
                          <th className="px-5 py-3 whitespace-nowrap">
                            <div className="font-normal text-left">Email</div>
                          </th>
                          <th className="px-5 py-3 whitespace-nowrap">
                            <div className="font-normal text-left">Name</div>
                          </th>
                          <th className="px-5 py-3 whitespace-nowrap">
                            <div className="font-normal text-left">
                              ID Student
                            </div>
                          </th>
                          <th className="px-5 py-3 whitespace-nowrap">
                            <div className="font-normal text-center">
                              {`Time ( 24 hours )`}
                            </div>
                          </th>
                          <th className="px-5 py-3 whitespace-nowrap">
                            <div className="font-normal text-end">Actions</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-gray-100">
                        {councilInSchedule?.schedule.timeSlots
                          .filter((item) => item.timeSlot.shift === "Afternoon")
                          .map((student, index) => (
                            <tr key={student.student.id} className="border-b">
                              <td className="px-5 py-3 whitespace-nowrap">
                                <div className="text-left">
                                  {student.student.infor.email}
                                </div>
                              </td>
                              <td className="px-5 py-3 whitespace-nowrap">
                                <div className="text-left">
                                  {student.student.infor.name}
                                </div>
                              </td>
                              <td className="px-5 py-3 whitespace-nowrap">
                                <div className="text-left">B1910282</div>
                              </td>
                              <td className="px-5 py-3 whitespace-nowrap">
                                <div className="text-center">
                                  {student.timeSlot.time}
                                </div>
                              </td>
                              <td className="px-5 py-3 whitespace-nowrap">
                                <div className="justify-end flex gap-3">
                                  <Link
                                    href={`/report-schedule/schedule-detail/thesis-student/${student.student.infor.id}`}
                                  >
                                    <button className="text-sky-700">
                                      View
                                    </button>
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </MainboardTemplate>
    </>
  );
}

export default ScheduleDetail;
