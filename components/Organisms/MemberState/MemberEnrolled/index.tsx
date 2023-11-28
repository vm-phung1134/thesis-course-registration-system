import { Button, IconButton, NormalAvatar } from "@/components/Atoms";
import { FilterScheduledForm, ModalConfirm } from "@/components/Molecules";
import { useClassroomStateContext } from "@/contexts/classroomState";
import useCheckedBox from "@/hooks/useCheckedBox";
import { useTableSearch } from "@/hooks/useTableSearch";
import { IMemberObject } from "@/interface/member";
import { IStudentDefObject } from "@/interface/studef";
import { getAllMemberClassroom } from "@/redux/reducer/member/api";
import { createStudentDef } from "@/redux/reducer/student-def/api";
import { useAppDispatch } from "@/redux/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { convertDateTimeFromString } from "@/utils/covertDate";
import { useMutationQueryAPI } from "@/hooks/useMutationAPI";

interface IMemberEnrolledProps {}

export const MemberEnrolled: FC<IMemberEnrolledProps> = ({}) => {
  const dispatch = useAppDispatch();
  const { authClassroomState } = useClassroomStateContext();
  const { data: members } = useQuery<IMemberObject[]>({
    queryKey: ["members-enrolled", authClassroomState],
    queryFn: async () => {
      const action = await dispatch(getAllMemberClassroom(authClassroomState));
      return action.payload || [];
    },
    initialData: [],
  });
  const {
    checkedItems: checkedMembers,
    handleCheckAll: handleCheckAllMember,
    handleCheckItem: handleCheckMember,
  } = useCheckedBox<IMemberObject>(members);
  const filterMemberEnrolled = (arr: IMemberObject[]): IMemberObject[] => {
    return arr.filter((item) => item.registerDefense === true);
  };

  // Add student to student registered list and send to admin
  const addMutation = useMutationQueryAPI({
    action: createStudentDef,
    queryKeyLog: [""],
    successMsg: "Successfully send a list of student attend thesis defense!",
    errorMsg: "Fail to send list of student!",
  });

  const [openCreateConfirm, setOpenCreateConfirm] = useState<boolean>(false);
  const modalClassCreateConfirm = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openCreateConfirm,
  });
  const {
    filteredData: member_filteredData,
    handleSearch: member_handleSearch,
  } = useTableSearch(members);

  const handleAddToStudentDef = () => {
    checkedMembers.forEach(async (member: IMemberObject) => {
      await addMutation.mutate({
        infor: member.member,
        instructor: authClassroomState?.lecturer,
      } as IStudentDefObject);
    });
  };
  return (
    <div className="px-3 my-5">
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
        <div className="flex justify-end py-2 gap-3">
          <IconButton
            setToggleForm={setOpenCreateConfirm}
            toggleForm={openCreateConfirm}
            className="btn-sm rounded-none px-5 border-none bg-green-700 text-white hover:text-black"
            title="Submit to council"
            classNameIcon={"w-4"}
            srcIcon={"https://cdn-icons-png.flaticon.com/128/9698/9698073.png"}
          />
          <FilterScheduledForm
            handleSearch={member_handleSearch}
            holderText="Search students ..."
          />
        </div>
      </div>
      <div className="w-full mx-auto my-5 min-h-[50vh]">
        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead className="bg-green-700 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="p-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-all"
                            type="checkbox"
                            className="w-4 h-4"
                            checked={checkedMembers.length === members.length}
                            onChange={handleCheckAllMember}
                          />
                          <label htmlFor="checkbox-all" className="sr-only">
                            checkbox
                          </label>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-sm font-normal tracking-wider text-left text-gray-200 dark:text-green-400"
                      >
                        Avatar
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-sm font-normal tracking-wider text-left text-gray-200 dark:text-green-400"
                      >
                        Full Name
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-sm font-normal tracking-wider text-left text-gray-200 dark:text-green-400"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-sm font-normal tracking-wider text-left text-gray-200 dark:text-green-400"
                      >
                        Register date
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-sm font-normal tracking-wider text-left text-gray-200 dark:text-green-400"
                      >
                        Status
                      </th>

                      <th scope="col" className="p-4">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    <AnimatePresence>
                      {filterMemberEnrolled(member_filteredData).map(
                        (member) => (
                          <motion.tr
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key={member.id}
                            className="hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700"
                          >
                            <td className="p-4 w-4">
                              <div className="flex items-center">
                                <input
                                  id="checkbox-table-2"
                                  type="checkbox"
                                  className="w-4 h-4 "
                                  checked={checkedMembers.includes(member)}
                                  onChange={(event) =>
                                    handleCheckMember(event, member)
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
                              <NormalAvatar
                                photoSrc={member?.member?.photoSrc}
                                setSize="w-10"
                              />
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                              {member?.member?.name}
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                              {member?.member?.email}
                            </td>
                            <td className="py-4 px-6 text-sm capitalize text-gray-900 whitespace-nowrap dark:text-white">
                              {convertDateTimeFromString("")}
                            </td>
                            <td className="py-4 px-6 text-sm capitalize text-gray-900 whitespace-nowrap dark:text-white">
                              {member?.registerDefense
                                ? "Enrolled"
                                : "Unregistered"}
                            </td>
                            <td className="py-4 px-6 text-sm text-right whitespace-nowrap">
                              <a
                                href="#"
                                className="text-blue-600 dark:text-blue-500"
                              >
                                Detail
                              </a>
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
      </div>
      <ToastContainer
        toastStyle={{
          color: "black",
          fontSize: "14px",
          fontFamily: "Red Hat Text",
        }}
      />
      <ModalConfirm
        modalClass={modalClassCreateConfirm}
        setOpenModal={setOpenCreateConfirm}
        openModal={openCreateConfirm}
        action={handleAddToStudentDef}
        typeButton="subscribe"
        underMessage="No message!!"
        title="Message!!!"
        message="Do you want to submit these students to committee thesis"
      />
    </div>
  );
};
