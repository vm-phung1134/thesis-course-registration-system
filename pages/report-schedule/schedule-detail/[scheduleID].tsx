import {
  Breadcrumb,
  Button,
  NormalAvatar,
  SnipperRound,
} from "@/components/Atoms";
import { BREADCRUMB_MAINBOARD } from "@/components/Organisms/MainboardStatus/mock-data";
import { MainboardTemplate } from "@/components/Templates";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAppDispatch } from "@/redux/store";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ICouncilDef } from "@/interface/schedule";
import { getOneCouncilInScheduleLecturer } from "@/redux/reducer/schedule-def/api";
import { FilterScheduledForm } from "@/components/Molecules";
import { AnimatePresence, motion } from "framer-motion";
import { roleInCouncil } from "@/data";

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
    }, 1200);
  }, []);
  return (
    <>
      <MainboardTemplate title="Schedule detail | Thesis course registration system">
        {loading ? (
          <SnipperRound />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Breadcrumb dataBreadcrumb={BREADCRUMB_MAINBOARD} />
            <div className="grid grid-cols-12 gap-5 mt-5">
              <div className="col-span-4">
                <div className="p-5 bg-slate-50 shadow-lg rounded-xl">
                  <div
                    onClick={() => history.back()}
                    className="text-sm my-1 flex gap-2 items-center cursor-pointer"
                  >
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
                  <h4 className="text-green-700 my-3 font-bold text-xl">
                    Graduate thesis committee
                  </h4>
                  <p className="normal-case font-medium text-sm my-2">
                   Instructor{" "}
                    <span className="text-red-600 font-medium capitalize">
                      {
                        councilInSchedule?.schedule?.timeSlots[0]?.student
                          ?.instructor?.name
                      }
                    </span>
                  </p>
                  <p className="normal-case text-gray-400 text-xs italic">
                    Date of foundation of the council{" "}
                    <span className="text-red-600 font-medium">
                      {
                        councilInSchedule?.schedule?.timeSlots[0]?.timeSlot
                          ?.date
                      }
                    </span>
                  </p>
                  <div className="bg-green-700 h-[0.5px] w-full my-3"></div>
                  <div className="flex gap-3 flex-col-reverse tracking-wider">
                    {councilInSchedule?.council
                      ?.slice()
                      .reverse()
                      .map((council, index) => (
                        <div
                          key={council?.id}
                          className="shadow-lg overflow-hidden relative w-full rounded-xl px-5 py-4 flex flex-col justify-center"
                        >
                          <div className="top-0 -left-10 bottom-0 bg-white absolute w-full h-full -skew-x-[30deg]"></div>
                          <div className="absolute bottom-0 right-2">
                            <NormalAvatar
                              photoSrc={council?.photoSrc}
                              setSize="w-10"
                            />
                          </div>
                          <div className="relative flex flex-col gap-1">
                            <p className="text-sm font-semibold">
                              <span className="capitalize font-bold">
                                {council.name}
                              </span>
                            </p>
                            <div className="text-sm">
                              <p>
                                <span className="text-gray-500">
                                  Role in council:{" "}
                                </span>
                                <span className="font-medium capitalize">
                                  {roleInCouncil[index]}
                                </span>
                              </p>
                              <p>
                                <span className="text-gray-500">Email: </span>
                                {council?.email}
                              </p>
                              <p>
                                <span className="text-gray-500">
                                  Department:{" "}
                                </span>
                                {council?.major}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="col-span-8">
                <h4 className="font-medium">List student of defense session</h4>
                <p className="text-sm text-slate-500">
                  Total 12 schedule students
                </p>
                <div className="flex justify-between my-5">
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
                    <FilterScheduledForm holderText="Filter schedule time ..." />
                  </div>
                </div>
                <div>
                  <div className="overflow-x-auto shadow-lg">
                    <table className="table-auto w-full shadow-lg">
                      <thead className="text-sm font-medium capitalize text-gray-200 bg-green-700">
                        <tr>
                          <th className="pl-5 py-4 whitespace-nowrap">
                            <div className="font-medium text-left">No.</div>
                          </th>
                          <th className="px-5 py-4 whitespace-nowrap">
                            <div className="font-medium text-left">Email</div>
                          </th>
                          <th className="px-5 py-4 whitespace-nowrap">
                            <div className="font-medium text-left">
                              ID Student
                            </div>
                          </th>
                          <th className="px-5 py-4 whitespace-nowrap">
                            <div className="font-medium text-center">Time</div>
                          </th>
                          <th className="px-5 py-4 whitespace-nowrap">
                            <div className="font-medium text-end">Actions</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-gray-100">
                        <AnimatePresence>
                          {councilInSchedule?.schedule?.timeSlots?.map(
                            (student, index) => (
                              <motion.tr
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                key={student?.student?.id}
                                className="border-b"
                              >
                                <td className="pl-5 py-4 whitespace-nowrap">
                                  <div className="text-left">
                                    {(index += 1)}
                                  </div>
                                </td>
                                <td className="px-5 py-4 whitespace-nowrap">
                                  <div className="text-left">
                                    {student?.student?.infor?.email}
                                  </div>
                                </td>
                                <td className="px-5 py-4 whitespace-nowrap">
                                  <div className="text-left">
                                    {student?.student?.infor?.name}
                                  </div>
                                </td>
                                <td className="px-5 py-4 whitespace-nowrap">
                                  <div className="text-center">
                                    {student?.timeSlot?.time}
                                  </div>
                                </td>
                                <td className="px-5 py-4 whitespace-nowrap">
                                  <div className="justify-end flex gap-3">
                                    <Link
                                      href={`/report-schedule/schedule-detail/thesis-student/${student?.student?.infor?.id}`}
                                    >
                                      <button className="text-sky-700">
                                        Join
                                      </button>
                                    </Link>
                                  </div>
                                </td>
                              </motion.tr>
                            )
                          )}
                        </AnimatePresence>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </MainboardTemplate>
    </>
  );
}

export default ScheduleDetail;