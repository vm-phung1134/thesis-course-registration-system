import { FilterScheduledForm } from "@/components/Molecules";
import { IUnavailableDate } from "@/interface/unavailableDate";
import { getAllUnavaiableDate } from "@/redux/reducer/unavailable-date/api";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useState } from "react";
interface IInstructorScheduleProp {}

export const InstructorSchedule: FC<IInstructorScheduleProp> = ({}) => {
  const dispatch = useAppDispatch();
  const { data: invalidDate } = useQuery<IUnavailableDate[]>({
    queryKey: ["invalid-date"],
    queryFn: async () => {
      const action = await dispatch(getAllUnavaiableDate());
      return action.payload || [];
    },
    initialData: [],
  });
  const [valueLecturer, setValueLecturer] = useState<IUnavailableDate>(
    invalidDate[0]
  );
  const getOneLecturerSchedule = (lecturer: IUnavailableDate) => {
    setValueLecturer(lecturer);
  };
  return (
    <div className="grid-cols-2 grid gap-8 mt-5">
      <div className="">
        <div className="flex-grow">
          <div className="flex justify-between items-center my-2">
            <div className="mb-3">
              <h4 className="font-medium">Instructor schedule</h4>
              <p className="text-sm text-slate-500">
                Total {invalidDate.length} schedule
              </p>
            </div>
            <FilterScheduledForm holderText="Search lecturer ..." />
          </div>
          {/* TABLE ACCOUNT LECTURERS */}
          <div className="w-full mx-auto">
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle min-h-[50vh]">
                  <div className="overflow-hidden border">
                    <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                      <thead className="bg-green-700 dark:bg-gray-700">
                        <tr>
                          <th scope="col" className="p-4">
                            <div className="flex items-center">
                              <input
                                id="checkbox-all"
                                type="checkbox"
                                className="w-4 h-4 cursor-pointer"
                              />
                              <label htmlFor="checkbox-all" className="sr-only">
                                checkbox
                              </label>
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="py-3 pl-3 text-sm text-start font-medium tracking-wider text-gray-200  dark:text-green-400"
                          >
                            No.
                          </th>
                          <th
                            scope="col"
                            className="py-3 px-6 text-sm font-medium tracking-wider text-left text-gray-200  dark:text-green-400"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="py-3 px-6 text-sm font-medium tracking-wider text-left text-gray-200  dark:text-green-400"
                          >
                            Full Name
                          </th>
                          <th scope="col" className="p-4">
                            <span className="sr-only">View</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        <AnimatePresence>
                          {invalidDate?.map((date, index) => (
                            <motion.tr
                              layout
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              key={date.id}
                              className="hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700"
                            >
                              <td className="p-4 w-4">
                                <div className="flex items-center">
                                  <input
                                    id="checkbox-table-2"
                                    type="checkbox"
                                    className="w-4 h-4 cursor-pointer"
                                  />
                                  <label
                                    htmlFor="checkbox-table-2"
                                    className="sr-only"
                                  >
                                    checkbox
                                  </label>
                                </div>
                              </td>
                              <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                                {(index += 1)}
                              </td>
                              <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                                {date.lecturer.email}
                              </td>
                              <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap capitalize dark:text-white">
                                {date.lecturer.name}
                              </td>
                              <td className="py-4 px-6 text-sm text-right whitespace-nowrap">
                                <button
                                  onClick={() => getOneLecturerSchedule(date)}
                                  className="text-blue-600 dark:text-blue-500"
                                >
                                  View
                                </button>
                              </td>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h4 className="font-medium text-green-700 my-2">
          Detailed schedule information
        </h4>
        <h5 className="font-medium my-2 text-sm">Personal information</h5>
        <div className="px-3 py-2 border w-full text-sm">
          <ul className="flex gap-x-10 gap-y-5 flex-wrap">
            <li className="flex flex-col">
              <p className="text-gray-500">Name</p>
              <p className="text-black capitalize">
                {valueLecturer?.lecturer?.name}
              </p>
            </li>
            <li className="flex flex-col">
              <p className="text-gray-500">Email</p>
              <p className="text-black">{valueLecturer?.lecturer?.email}</p>
            </li>
            <li className="flex flex-col">
              <p className="text-gray-500">Department</p>
              <p className="text-black">{valueLecturer?.lecturer?.class}</p>
            </li>
            <li className="flex flex-col">
              <p className="text-gray-500">Major</p>
              <p className="text-black">{valueLecturer?.lecturer?.major}</p>
            </li>
            <li className="flex flex-col">
              <p className="text-gray-500">Phone</p>
              <p className="text-black">{valueLecturer?.lecturer?.phone}</p>
            </li>
          </ul>
        </div>
        <h5 className="font-medium my-3 text-sm">Busy schedule</h5>
        <div className="text-sm">
          <div className="flex gap-10">
            {valueLecturer?.schedules.map((schedule, index) => {
              return (
                <ul
                  key={schedule.id}
                  className="flex gap-10 px-5 py-2 border w-full"
                >
                  <li>
                    <p className="text-gray-500">Date</p>
                    <p className="text-black">{schedule?.date}</p>
                  </li>
                  <li>
                    <p className="text-gray-500">Reason</p>
                    <p className="text-black">{schedule?.reason}</p>
                  </li>
                </ul>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
