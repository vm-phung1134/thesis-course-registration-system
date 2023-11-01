/* eslint-disable @next/next/no-img-element */
import { Button, IconButton, NormalAvatar } from "@/components/Atoms";
import {
  ACreateClassroomForm,
  AEditClassroomForm,
  FilterScheduledForm,
  ModalConfirm,
} from "@/components/Molecules";
import useCheckedBox from "@/hooks/useCheckedBox";
import { useTableSearch } from "@/hooks/useTableSearch";
import { IAuthObject } from "@/interface/auth";
import { IClassroomObject } from "@/interface/classroom";
import { getAllLecturers } from "@/redux/reducer/auth/api";
import {
  deleteClassroom,
  getAllClassrooms,
  getClassroom,
  updateClassroom,
} from "@/redux/reducer/classroom/api";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  const { filteredData: lec_filteredData, handleSearch: lec_handleSearch } =
    useTableSearch(lecturers);

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
    queryKey: ["classrooms"],
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
  const {
    filteredData: classroom_filteredData,
    handleSearch: classroom_handleSearch,
  } = useTableSearch(classrooms);

  // Handle lock all classrooms
  const handleOpenModalLock = () => {
    setOpenModalLock(!openModalLock);
  };

  // Handle clear classrooms
  const deleteMutation = useMutation(
    (postData: IClassroomObject) => {
      return new Promise((resolve, reject) => {
        dispatch(deleteClassroom(postData))
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
        queryClient.invalidateQueries(["classrooms"]);
      },
    }
  );
  const [openModalClearClass, setOpenModalClearClass] =
    useState<boolean>(false);
  const modalClassModalClearClass = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModalClearClass,
  });
  const handleClearClassrooms = () => {
    checkedClassrooms.forEach((classroom: IClassroomObject) => {
      deleteMutation.mutate(classroom);
    });
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

  const [openModalEditClassForm, setOpenModalEditClassForm] =
    useState<boolean>(false);
  const modalClassModalEditClassForm = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModalEditClassForm,
  });

  const { classroom } = useAppSelector((state) => state.classroomReducer);
  const handleUpdateClassroomForm = (lecturer: IAuthObject) => {
    setOpenModalEditClassForm(!openModalEditClassForm);
    dispatch(getClassroom(lecturer));
  };

  return (
    <div className="flex flex-col gap-5 mt-5">
      <div className="flex-grow">
        <div className="flex justify-between items-center my-2">
          <div className="mb-3">
            <h4 className="font-medium">Account lecturers</h4>
            <p className="text-sm text-slate-500">
              Total {lecturers.length} lecturer accounts
            </p>
          </div>
          {checkedAccounts.length > 0 ? (
            <IconButton
              setToggleForm={setOpenCreateClass}
              toggleForm={openCreateClass}
              className="btn-sm rounded-none px-5 border-none bg-green-700 text-white"
              title="Generate Classroom"
              classNameIcon={"w-5"}
              srcIcon={
                "https://cdn-icons-png.flaticon.com/128/5482/5482806.png"
              }
            />
          ) : (
            <IconButton
              className="btn-sm px-5 text-gray-800 rounded-none"
              title="Generate Classroom"
              classNameIcon={"w-5"}
              srcIcon={
                "https://cdn-icons-png.flaticon.com/128/5482/5482806.png"
              }
            />
          )}
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
          <FilterScheduledForm
            handleSearch={lec_handleSearch}
            holderText="Search lecturer ..."
          />
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
                        <th
                          scope="col"
                          className="py-3 px-6 text-sm font-medium tracking-wider text-left text-gray-200  dark:text-green-400"
                        >
                          Department
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-sm font-medium tracking-wider text-left text-gray-200  dark:text-green-400"
                        >
                          Field
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-sm font-medium tracking-wider text-left text-gray-200  dark:text-green-400"
                        >
                          Lecturer
                        </th>
                        <th scope="col" className="p-4">
                          <span className="sr-only">Update</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      <AnimatePresence>
                        {lec_filteredData?.map((lecturer) => (
                          <motion.tr
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
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
      <div className="flex-grow">
        <div className="flex justify-between items-center my-2">
          <div className="mb-3">
            <h4 className="font-medium">Classrooms</h4>
            <p className="text-sm text-slate-500">Total 3 classrooms</p>
          </div>
          <div className="flex gap-3">
            {checkedClassrooms.length > 0 ? (
              <IconButton
                className="btn-sm rounded-none px-5 border-none text-blue-500"
                title="Lock Classroom"
                classNameIcon={"w-5"}
                srcIcon={
                  "https://cdn-icons-png.flaticon.com/128/3817/3817037.png"
                }
              />
            ) : (
              <IconButton
                className="btn-sm px-5 text-blue-500 rounded-none"
                title="Lock Classroom"
                classNameIcon={"w-5"}
                srcIcon={
                  "https://cdn-icons-png.flaticon.com/128/3817/3817037.png"
                }
              />
            )}
            <IconButton
              toggleForm={openModalClearClass}
              setToggleForm={setOpenModalClearClass}
              className="bg-red-100 btn-sm rounded-none px-5 border-none text-red-500"
              title="Clear Classroom"
              classNameIcon={"w-5"}
              srcIcon={
                "https://cdn-icons-png.flaticon.com/128/9068/9068885.png"
              }
            />
          </div>
        </div>
        <div className="flex justify-between mb-2">
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
          <FilterScheduledForm
            handleSearch={classroom_handleSearch}
            holderText="Search classroom ..."
          />
        </div>
        {/* TABLE CLASSROOM */}
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
                          className="py-3 px-6 text-sm font-medium tracking-wider text-left text-gray-200  dark:text-green-400"
                        >
                          Name classroom
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-sm font-medium tracking-wider text-left text-gray-200  dark:text-green-400"
                        >
                          Lecturer
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-sm font-medium tracking-wider text-left text-gray-200  dark:text-green-400"
                        >
                          Course
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-sm font-medium tracking-wider text-left text-gray-200  dark:text-green-400"
                        >
                          Q. Student
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-sm font-medium capitalize tracking-wider text-left text-gray-200  dark:text-green-400"
                        >
                          status
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-sm font-medium tracking-wider text-left text-gray-200  dark:text-green-400"
                        >
                          Instructor
                        </th>
                        <th scope="col" className="p-4">
                          <span className="sr-only">Update</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      <AnimatePresence>
                        {classroom_filteredData?.map((classroom) => (
                          <motion.tr
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key={classroom?.id}
                            className="hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700"
                          >
                            <td className="p-4 w-4">
                              <div className="flex items-center">
                                <input
                                  id="checkbox-table-2"
                                  type="checkbox"
                                  className="w-4 h-4 cursor-pointer"
                                  checked={checkedClassrooms.includes(
                                    classroom
                                  )}
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
                            <td className="py-4 px-6 lowercase text-sm text-gray-900 whitespace-nowrap dark:text-white">
                              {classroom?.status}
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                              <NormalAvatar
                                setSize="w-10"
                                photoSrc={classroom?.lecturer?.photoSrc}
                              />
                            </td>
                            <td className="py-4 px-6 text-sm text-right whitespace-nowrap">
                              <button
                                onClick={() =>
                                  handleUpdateClassroomForm(classroom?.lecturer)
                                }
                                className="text-blue-600 dark:text-blue-500"
                              >
                                Edit
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
      {/* Open modal form to create all list account to classroom */}
      <dialog id="modal_admin_1" className={modalClassCreateClassroom}>
        <div className="w-5/12 bg-white h-fit shadow-2xl p-5 rounded-xl">
          <h4 className="text-xl font-bold mb-5 capitalize">
            Create classroom form
          </h4>
          <div className="p-5">
            <ACreateClassroomForm
              setOpenModal={setOpenCreateClass}
              openModal={openCreateClass}
              listAccount={checkedAccounts}
            />
          </div>
        </div>
      </dialog>
      <dialog
        id="modal_admin_edit_classroom"
        className={modalClassModalEditClassForm}
      >
        <div className="w-5/12 bg-white h-fit shadow-2xl rounded-xl p-5">
          <h4 className="text-xl font-bold mb-5 capitalize">
            Edit classroom form
          </h4>
          <div className="my-5">
            <AEditClassroomForm
              openModal={openModalEditClassForm}
              setOpenModal={setOpenModalEditClassForm}
              classroom={classroom}
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
      <ModalConfirm
        modalClass={modalClassModalClearClass}
        setOpenModal={setOpenModalClearClass}
        openModal={openModalClearClass}
        typeButton="subscribe"
        action={handleClearClassrooms}
        underMessage="Once you delete this classrooms if will be gone forever"
        title="Message!!!"
        message="Are you sure do you want to delete this classrooms"
      />
    </div>
  );
};
