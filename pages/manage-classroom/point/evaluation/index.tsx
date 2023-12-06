import { ClassroomTemplate } from "@/components/Templates";
import { getAllPointDefs } from "@/redux/reducer/point-def/api";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { IPointDefObject } from "@/interface/pointDef";
import { FilterScheduledForm } from "@/components/Molecules";
import { AnimatePresence, motion } from "framer-motion";
import useCheckedBox from "@/hooks/useCheckedBox";
import { useTableSearch } from "@/hooks/useTableSearch";
import { useCurrentUserContext } from "@/contexts/currentUserContext";
import { calculatorGPA, calculatorLetterPoint } from "@/utils/calculatorPoint";

function EvaluationTab() {
  const dispatch = useAppDispatch();
  const { currentUser } = useCurrentUserContext();
  const { data: studPoints } = useQuery<IPointDefObject[]>({
    queryKey: ["point-students", currentUser],
    queryFn: async () => {
      const action = await dispatch(getAllPointDefs(currentUser));
      return action.payload || [];
    },
    initialData: [],
  });

  const {
    checkedItems: checkedPoints,
    handleCheckAll: handleCheckAllPoint,
    handleCheckItem: handleCheckPoint,
  } = useCheckedBox<any>(studPoints);
  const { filteredData: point_filteredData, handleSearch: point_handleSearch } =
    useTableSearch(studPoints);
  return (
    <ClassroomTemplate title="Point thesis defense | Thesis course registration system">
      <div className="flex justify-between items-center">
        <div className="py-5">
          <h4 className=" text-green-700 font-medium">Thesis defense point</h4>
          <p className="text-sm text-slate-500">
            Total {studPoints?.length} members
          </p>
        </div>
        <FilterScheduledForm
          handleSearch={point_handleSearch}
          holderText="Search member ..."
        />
      </div>
      <div className="w-full mx-auto min-h-[50vh] max-h-fit">
        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-xl">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full border divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead className="bg-green-700 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="p-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-all"
                            type="checkbox"
                            className="w-4 h-4 cursor-pointer"
                            checked={checkedPoints.length === studPoints.length}
                            onChange={handleCheckAllPoint}
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
                        className="py-3 px-6 text-sm font-normal tracking-wider text-left text-gray-200  dark:text-green-400"
                      >
                        ID Student
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-sm font-normal tracking-wider text-left text-gray-200  dark:text-green-400"
                      >
                        Committeee 1
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-sm font-normal tracking-wider text-left text-gray-200  dark:text-green-400"
                      >
                        Committeee 2
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-sm font-normal tracking-wider text-left text-gray-200  dark:text-green-400"
                      >
                        Committeee 3
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-sm font-normal tracking-wider text-left text-gray-200  dark:text-green-400"
                      >
                        GPA
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-sm font-normal tracking-wider text-left text-gray-200  dark:text-green-400"
                      >
                        Letter point
                      </th>
                      <th scope="col" className="p-4">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    <AnimatePresence>
                      {point_filteredData?.map((point, index) => (
                        <motion.tr
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          key={point?.id}
                          className="hover:bg-gray-100  cursor-pointer dark:hover:bg-gray-700"
                        >
                          <td className="p-4 w-4">
                            <div className="flex items-center">
                              <input
                                id="checkbox-table-2"
                                type="checkbox"
                                className="w-4 h-4 cursor-pointer"
                                checked={checkedPoints.includes(point)}
                                onChange={(event) =>
                                  handleCheckPoint(event, point)
                                }
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
                          <td className="py-4 px-6 font-medium text-sm text-gray-900 whitespace-nowrap dark:text-white">
                            {point?.student?.name}
                          </td>
                          {point?.assesses?.map((pt) => (
                            <td
                              key={pt?.id}
                              className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {pt?.point}
                            </td>
                          ))}
                          <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                            {calculatorGPA(point?.assesses)}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                            {calculatorLetterPoint(
                              parseFloat(calculatorGPA(point?.assesses))
                            )}
                          </td>
                          <td className="py-4 px-6 text-sm text-right whitespace-nowrap">
                            <button className="text-blue-600 dark:text-blue-500">
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
    </ClassroomTemplate>
  );
}

export default EvaluationTab;
