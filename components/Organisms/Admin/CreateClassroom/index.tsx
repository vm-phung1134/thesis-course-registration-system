/* eslint-disable @next/next/no-img-element */
import { Button, NormalAvatar } from "@/components/Atoms";
import {
  ACreateClassroomForm,
  FilterScheduledForm,
  ModalConfirm,
} from "@/components/Molecules";
import useCheckedBox from "@/hooks/useCheckedBox";
import { IAuthObject } from "@/interface/auth";
import { IClassroomObject } from "@/interface/classroom";
import { getAllAuths, getAllLecturers } from "@/redux/reducer/auth/api";
import {
  getAllClassrooms,
  updateClassroom,
} from "@/redux/reducer/classroom/api";
import { useAppDispatch } from "@/redux/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { FC, useState } from "react";
interface ICreateClassroomTab {}

export const CreateClassroomTab: FC<ICreateClassroomTab> = ({}) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  // HANLE ACCOUNT SERVICE
  // Render list
  const { data: lecturers } = useQuery<IAuthObject[]>({
    queryKey: ["lecturers"],
    queryFn: async () => {
      const action = await dispatch(getAllLecturers());
      return action.payload || [];
    },
    initialData: [],
  });
  // Check box account
  const {
    checkedItems: checkedAccounts,
    handleCheckAll: handleCheckAllAccount,
    handleCheckItem: handleCheckAccount,
  } = useCheckedBox<IAuthObject>(lecturers);

  // HANLE CLASSROOM SERVICE
  // Open modal
  const [openCreateClass, setOpenCreateClass] = useState<boolean>(false);
  const modalClassCreateClassroom = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openCreateClass,
  });
  // Open modal confirm lock classrooms
  const [openModalLock, setOpenModalLock] = useState<boolean>(false);
  const modalClassModalLock = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModalLock,
  });
  // Render list
  const { data: classrooms } = useQuery<IClassroomObject[]>({
    queryKey: ["classrooms-admin"],
    queryFn: async () => {
      const action = await dispatch(getAllClassrooms());
      return action.payload || [];
    },
    initialData: [],
  });
  // Check box classroom
  const {
    checkedItems: checkedClassrooms,
    handleCheckAll: handleCheckAllClassroom,
    handleCheckItem: handleCheckClassroom,
  } = useCheckedBox<IClassroomObject>(classrooms);
  // Handle lock all classrooms
  const handleOpenModalLock = () => {
    setOpenModalLock(!openModalLock);
  };

  const updateMutation = useMutation(
    (postData: IClassroomObject) => {
      return new Promise((resolve, reject) => {
        dispatch(updateClassroom(postData))
          .unwrap()
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["classrooms-admin"]);
      },
    }
  );
  const handleLockClassrooms = () => {
    checkedClassrooms.forEach(async (classroom: IClassroomObject) => {
      await updateMutation.mutate({
        ...classroom,
        status: "LOCK",
      });
    });
  };

  return (
    <div className="flex flex-col gap-5 mt-5">
      <div className="flex-grow">
        <div className="flex justify-between items-center my-2">
          <h4 className="pb-3 font-medium">All account lecturer</h4>
          {checkedAccounts.length > 0 ? (
            <Button
              className="bg-green-700 btn-sm hover:bg-green-800 px-8 text-white"
              title="Create classroom"
              toggle={openCreateClass}
              setToggle={setOpenCreateClass}
            />
          ) : (
            <Button
              className=" btn-sm px-8 text-gray-800"
              title="Create classroom"
            />
          )}
        </div>
        <div className="flex justify-end mb-2">
          <FilterScheduledForm holderText="Filter lecturer ..." />
        </div>
        {/* TABLE ACCOUNT LECTURERS */}
        <div className="w-full mx-auto">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden">
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
                                checkedAccounts.length === lecturers.length
                              }
                              onChange={handleCheckAllAccount}
                            />
                            <label htmlFor="checkbox-all" className="sr-only">
                              checkbox
                            </label>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-sm font-normal tracking-wider text-left text-gray-200  dark:text-green-400"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-sm font-normal tracking-wider text-left text-gray-200  dark:text-green-400"
                        >
                          Full Name
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-sm font-normal tracking-wider text-left text-gray-200  dark:text-green-400"
                        >
                          Department
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-sm font-normal tracking-wider text-left text-gray-200  dark:text-green-400"
                        >
                          Field
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-sm font-normal tracking-wider text-left text-gray-200  dark:text-green-400"
                        >
                          Manager
                        </th>
                        <th scope="col" className="p-4">
                          <span className="sr-only">Update</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      {lecturers?.map((lecturer) => (
                        <tr
                          key={lecturer?.id}
                          className="hover:bg-gray-100  cursor-pointer dark:hover:bg-gray-700"
                        >
                          <td className="p-4 w-4">
                            <div className="flex items-center">
                              <input
                                id="checkbox-table-2"
                                type="checkbox"
                                className="w-4 h-4 cursor-pointer"
                                checked={checkedAccounts.includes(lecturer)}
                                onChange={(event) =>
                                  handleCheckAccount(event, lecturer)
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
                            {lecturer?.email}
                          </td>
                          <td className="py-4 px-6 capitalize text-sm text-gray-900 whitespace-nowrap dark:text-white">
                            {lecturer?.name}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                            Information technology
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                            Network computer
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                            <NormalAvatar
                              photoSrc={lecturer?.photoSrc}
                              setSize="w-10"
                            />
                          </td>
                          <td className="py-4 px-6 text-sm text-right whitespace-nowrap">
                            <a
                              href="#"
                              className="text-blue-600 dark:text-blue-500"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-center my-2">
          <h4 className="pb-3 font-medium">Classrooms</h4>
          {checkedClassrooms.length > 0 ? (
            <>
              <ul className="flex gap-2 text-sm cursor-pointer">
                <li onClick={handleOpenModalLock} className="text-green-700">
                  Lock classrooms
                </li>
                <span className="text-gray-400">|</span>
                <li className="text-red-700">Delete</li>
                <span className="text-gray-400">|</span>
                <li className="text-red-700">Clear classrooms</li>
              </ul>
            </>
          ) : (
            <div>
              <ul className="flex gap-2 text-sm cursor-pointer">
                <li>Lock classrooms</li>
                <span className="text-gray-400">|</span>
                <li>Delete</li>
                <span className="text-gray-400">|</span>
                <li>Clear classrooms</li>
              </ul>
            </div>
          )}
        </div>
        <div className="flex justify-end mb-2">
          <FilterScheduledForm holderText="Filter classroom ..." />
        </div>
        {/* TABLE CLASSROOM */}
        <div className="w-full mx-auto">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden">
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
                                checkedClassrooms.length === lecturers.length
                              }
                              onChange={handleCheckAllClassroom}
                            />
                            <label htmlFor="checkbox-all" className="sr-only">
                              checkbox
                            </label>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-sm font-normal tracking-wider text-left text-gray-200  dark:text-green-400"
                        >
                          status
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-sm font-normal tracking-wider text-left text-gray-200  dark:text-green-400"
                        >
                          Name classroom
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-sm font-normal tracking-wider text-left text-gray-200  dark:text-green-400"
                        >
                          Lecturer
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-sm font-normal tracking-wider text-left text-gray-200  dark:text-green-400"
                        >
                          Course
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-sm font-normal tracking-wider text-left text-gray-200  dark:text-green-400"
                        >
                          Quantity
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-sm font-normal tracking-wider text-left text-gray-200  dark:text-green-400"
                        >
                          Manager
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-sm font-normal tracking-wider text-left text-gray-200  dark:text-green-400"
                        >
                          Created at
                        </th>
                        <th scope="col" className="p-4">
                          <span className="sr-only">Update</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      {classrooms?.map((classroom) => (
                        <tr
                          key={classroom?.id}
                          className="hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700"
                        >
                          <td className="p-4 w-4">
                            <div className="flex items-center">
                              <input
                                id="checkbox-table-2"
                                type="checkbox"
                                className="w-4 h-4 cursor-pointer"
                                checked={checkedClassrooms.includes(classroom)}
                                onChange={(event) =>
                                  handleCheckClassroom(event, classroom)
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
                          <td className="py-4 px-6 lowercase text-sm text-gray-900 whitespace-nowrap dark:text-white">
                            {classroom?.status}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                            {classroom?.lecturer?.email}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap capitalize dark:text-white">
                            {classroom?.lecturer?.name}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                            {classroom?.classCourse}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                            {classroom?.quantityStudent}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                            <NormalAvatar
                              setSize="w-10"
                              photoSrc={classroom?.lecturer?.photoSrc}
                            />
                          </td>
                          <td className="py-4 px-6 text-[13px] text-gray-900 whitespace-nowrap dark:text-white">
                            10/7/2023 - 15:00hrs
                          </td>
                          <td className="py-4 px-6 text-sm text-right whitespace-nowrap">
                            <a
                              href="#"
                              className="text-blue-600 dark:text-blue-500"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Open modal form to create all list account to classroom */}
      <dialog id="modal_admin_1" className={modalClassCreateClassroom}>
        <div className="w-5/12 bg-white h-fit shadow-2xl">
          <div className="bg-green-700 p-3 flex items-center gap-3">
            <h4 className="uppercase text-white text-sm">
              Create classroom form
            </h4>
            <div className="flex-grow h-[1px] bg-white"></div>
          </div>
          <div className="p-5">
            <ACreateClassroomForm
              setOpenCreateClass={setOpenCreateClass}
              openCreateClass={openCreateClass}
              listAccount={checkedAccounts}
            />
          </div>
        </div>
      </dialog>
      {/* Open confirm modal to confirm lock all classroom */}
      <ModalConfirm
        modalClass={modalClassModalLock}
        setOpenModal={setOpenModalLock}
        openModal={openModalLock}
        typeButton="subscribe"
        action={handleLockClassrooms}
        title="Message!!!"
        message="Do you want to lock these classrooms"
      />
    </div>
  );
};
