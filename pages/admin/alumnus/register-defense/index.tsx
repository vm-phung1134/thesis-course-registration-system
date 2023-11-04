/* eslint-disable @next/next/no-img-element */
import {
  Breadcrumb,
  Button,
  NormalAvatar,
  SnipperRound,
} from "@/components/Atoms";
import { AdminTemplate } from "@/components/Templates";
import { useState, useEffect } from "react";
import { BREADCRUMB_REGISTER_DEFENSE_ADMIN } from "./mock-data";
import useCheckedBox from "@/hooks/useCheckedBox";
import { IStudentDefObject } from "@/interface/studef";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useQueryClient } from "@tanstack/react-query";
import { FilterScheduledForm, Pagination } from "@/components/Molecules";
import { InforMemberModal } from "@/components/Organisms";
import { getTopic } from "@/redux/reducer/topic/api";
import classNames from "classnames";
import { usePagination } from "@/hooks/usePagination";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useTableSearch } from "@/hooks/useTableSearch";

function RegisterDefensePageAdmin() {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { currentUser } = useCurrentUser();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages] = useState<number>(10);
  const [openModalStudefDetail, setOpenModalStudefDetail] =
    useState<boolean>(false);
  const modalClass = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModalStudefDetail,
  });
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const { topic } = useAppSelector((state) => state.topicReducer);
  const { data: studentDef } = usePagination({
    page: currentPage,
    limit: 10,
    uid: currentUser.id,
  });
  const {
    checkedItems: checkedStudents,
    handleCheckAll: handleCheckAllStudent,
    handleCheckItem: handleCheckStudent,
  } = useCheckedBox<IStudentDefObject>(studentDef);
  const { filteredData: stuf_filteredData, handleSearch: stuf_handleSearch } =
  useTableSearch(studentDef);
  const handleGetTopicMember = (studef: IStudentDefObject) => {
    dispatch(getTopic(studef?.infor));
    setOpenModalStudefDetail(!openModalStudefDetail);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <AdminTemplate title="Alumnus | Thesis course registration system">
      {loading ? (
        <SnipperRound />
      ) : (
        <>
          <div className="mt-5">
            <Breadcrumb dataBreadcrumb={BREADCRUMB_REGISTER_DEFENSE_ADMIN} />
            <div className="my-3 py-2 flex gap-2 items-center">
              <h4 className="text-xl capitalize text-green-700 font-medium ">
                Register <span className="text-green-700"> Defense</span>
              </h4>
              <div className="flex-grow h-[0.5px] bg-green-700"></div>
            </div>
            <div className="flex justify-between items-center my-2">
              <div className="mb-3">
                <h4 className="font-medium">List of student thesis defense</h4>
                <p className="text-sm text-slate-500">
                  Total {studentDef.length} students
                </p>
              </div>
              <Button
                className="bg-green-700 rounded-none btn-sm hover:bg-green-800 px-8 text-white"
                title="Send to chairman council"
              />
            </div>
            <div className="flex justify-between mb-2">
              <div className="flex">
                <Button
                  title="Recently date"
                  className="px-5 btn-sm bg-gray-800 text-white rounded-none hover:bg-gray-700"
                />
                <Button
                  title="Ascending order"
                  className="px-5 btn-sm rounded-none"
                />
                <Button title="All" className="px-5 btn-sm rounded-none" />
              </div>
              <FilterScheduledForm handleSearch={stuf_handleSearch} holderText="Search student ..." />
            </div>
            {/*---------------------------TABLE----------------------------- */}
            <div className="w-full mx-auto shadow-xl min-h-[70vh]">
              <div className="flex flex-col">
                <div className="overflow-x-auto">
                  <div className="inline-block min-w-full align-middle">
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
                                  checked={
                                    checkedStudents.length === studentDef.length
                                  }
                                  onChange={handleCheckAllStudent}
                                />
                                <label
                                  htmlFor="checkbox-all"
                                  className="sr-only"
                                >
                                  checkbox
                                </label>
                              </div>
                            </th>
                            <th
                              scope="col"
                              className="py-3 pl-3 text-sm text-center font-medium tracking-wider text-gray-200  dark:text-green-400"
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
                              ID Student
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-6 text-sm font-medium tracking-wider text-left text-gray-200  dark:text-green-400"
                            >
                              Major
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-6 text-sm font-medium tracking-wider text-left text-gray-200  dark:text-green-400"
                            >
                              Instructor
                            </th>
                            <th scope="col" className="p-4">
                              <span className="sr-only">Approve</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                          <AnimatePresence>
                            {stuf_filteredData?.map((stu, index) => (
                              <motion.tr
                                layout
                                initial={{ opacity: 0,  y:200 }}
                                animate={{ opacity: 1, y:0 }}
                 
                                key={stu.id}
                                className="hover:bg-gray-100  cursor-pointer dark:hover:bg-gray-700"
                              >
                                <td className="p-4 w-4">
                                  <div className="flex items-center">
                                    <input
                                      id="checkbox-table-2"
                                      type="checkbox"
                                      className="w-4 h-4 cursor-pointer"
                                      checked={checkedStudents.includes(stu)}
                                      onChange={(event) =>
                                        handleCheckStudent(event, stu)
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
                                <td className="py-4 pl-3 text-center text-sm text-gray-900 whitespace-nowrap dark:text-white">
                                  {(index += 1)}
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                                  {stu?.infor?.email}
                                </td>
                                <td className="py-4 px-6 capitalize text-sm text-gray-900 whitespace-nowrap dark:text-white">
                                  {stu?.infor?.name}
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                                  {stu?.infor?.major}
                                </td>
                                <td className="py-4 px-6 text-sm capitalize text-gray-900 whitespace-nowrap dark:text-white">
                                  {stu?.instructor?.name}
                                </td>
                                <td className="py-4 px-6 flex gap-3 text-sm text-right whitespace-nowrap">
                                  <p
                                    className="text-blue-600 dark:text-blue-500"
                                    onClick={() => handleGetTopicMember(stu)}
                                  >
                                    Detail
                                  </p>
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
            <div className="flex justify-center mt-10">
              <Pagination
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                totalPages={totalPages}
                currentPage={currentPage}
              />
            </div>
          </div>
          <InforMemberModal
            topic={topic}
            modalClass={modalClass}
            setOpenMemberModal={setOpenModalStudefDetail}
            openMemberModal={openModalStudefDetail}
          />
        </>
      )}
    </AdminTemplate>
  );
}

export default RegisterDefensePageAdmin;
