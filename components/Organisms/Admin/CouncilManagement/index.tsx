/* eslint-disable @next/next/no-img-element */
import { Button, NormalAvatar } from "@/components/Atoms";
import { FilterScheduledForm, ModalConfirm } from "@/components/Molecules";
import useCheckedBox from "@/hooks/useCheckedBox";
import { IAuthObject } from "@/interface/auth";
import { getAllLecturers } from "@/redux/reducer/auth/api";
import {
  createCouncilDef,
  getAllCouncilDefs,
} from "@/redux/reducer/council-def/api";
import { useAppDispatch } from "@/redux/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { FC, useState } from "react";
interface ICouncilManagementTab {}

export const CouncilManagementTab: FC<ICouncilManagementTab> = ({}) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  // HANLE LECTURER SERVICE
  // Render list
  const { data: lecturers } = useQuery<IAuthObject[]>({
    queryKey: ["lecturers"],
    queryFn: async () => {
      const action = await dispatch(getAllLecturers());
      return action.payload || [];
    },
    initialData: [],
  });
  // Check box lecturer
  const {
    checkedItems: checkedLecturers,
    handleCheckAll: handleCheckAllLecturer,
    handleCheckItem: handleCheckLecturer,
  } = useCheckedBox<IAuthObject>(lecturers);

  const addMutation = useMutation(
    (postData: IAuthObject) => {
      return new Promise((resolve, reject) => {
        dispatch(createCouncilDef(postData))
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
        queryClient.invalidateQueries(["council-defs"]);
      },
    }
  );
  const handleAddCouncilList = () => {
    checkedLecturers.forEach(async (lecturer: IAuthObject) => {
      await addMutation.mutate(lecturer);
    });
  };

  // const handleFakeDataCouncil = async () => {
  //   await addMutation.mutate({
  //     name: "truc anh dai",
  //     photoSrc:
  //       "https://images.pexels.com/photos/445109/pexels-photo-445109.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     email: "tadai@cit.ctu.edu.vn",
  //     phone: "0123456789",
  //     class: "IT1",
  //     major: "CNTT",
  //     role: "lecturer",
  //     id: "GV9",
  //   });
  // };

  // HANLE COUNCIL SERVICE
  // Open modal confirm lock councils
  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
  const modalClassModalCreate = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModalCreate,
  });
  // Render list
  const { data: councils } = useQuery<IAuthObject[]>({
    queryKey: ["council-defs"],
    queryFn: async () => {
      const action = await dispatch(getAllCouncilDefs());
      return action.payload || [];
    },
    initialData: [],
  });
  // Check box council
  const {
    checkedItems: checkedCouncils,
    handleCheckAll: handleCheckAllCouncil,
    handleCheckItem: handleCheckCouncil,
  } = useCheckedBox<IAuthObject>(councils);

  return (
    <div className="flex flex-col gap-5 mt-5">
      <div className="flex-grow">
        <div className="flex justify-between items-center my-2">
          <div className="mb-3">
            <h4 className="font-medium">Lecturers</h4>
            <p className="text-sm text-slate-500">Total 15 lecturers</p>
          </div>
          {checkedLecturers.length > 0 ? (
            <ul className="flex gap-2 text-sm cursor-pointer">
              <li
                onClick={() => setOpenModalCreate(!openModalCreate)}
                className="text-green-700"
              >
                Add to council list
              </li>
              <span className="text-gray-400">|</span>
              <li className="text-red-700">Delete</li>
              <span className="text-gray-400">|</span>
              <li className="text-red-700">Clear lecturers</li>
            </ul>
          ) : (
            <ul className="flex gap-2 text-sm cursor-pointer">
              <li>Add to council list</li>
              <span className="text-gray-400">|</span>
              <li>Delete</li>
              <span className="text-gray-400">|</span>
              <li>Clear lecturers</li>
            </ul>
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex mb-3">
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
            <FilterScheduledForm holderText="Filter schedule time ..." />
          </div>
        </div>
        {/* TABLE LECTURERS */}
        <div className="w-full mx-auto rounded-2xl shadow-xl">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden rounded-2xl">
                  <table className="min-w-full border divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                    <thead className="bg-green-700 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="p-4">
                          <div className="flex items-center">
                            <input
                              id="checkbox-all"
                              type="checkbox"
                              className="w-4 h-4 cursor-pointer"
                              checked={
                                checkedLecturers.length === lecturers.length
                              }
                              onChange={handleCheckAllLecturer}
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
                                checked={checkedLecturers.includes(lecturer)}
                                onChange={(event) =>
                                  handleCheckLecturer(event, lecturer)
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
                            {lecturer?.class || "None"}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                            {lecturer?.major || "None"}
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
          <div className="mb-3">
            <h4 className="font-medium">Council list has been established</h4>
            <p className="text-sm text-slate-500">Total 15 Councils</p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex mb-3 rounded-none">
            <Button
              title="Recently date"
              className="px-5 btn-sm bg-gray-800 text-white rounded-none"
            />
            <Button title="Ascending order" className="px-5 btn-sm rounded-none" />
            <Button title="All" className="px-5 btn-sm rounded-none" />
          </div>
          <div>
            <FilterScheduledForm holderText="Search schedule time ..." />
          </div>
        </div>
        {/* TABLE COUNCIL */}
        <div className="w-full mx-auto rounded-2xl shadow-xl">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden rounded-2xl">
                  <table className="min-w-full divide-y border divide-gray-200 table-fixed dark:divide-gray-700">
                    <thead className="bg-green-700 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="p-4">
                          <div className="flex items-center">
                            <input
                              id="checkbox-all"
                              type="checkbox"
                              className="w-4 h-4 cursor-pointer"
                              checked={
                                checkedCouncils.length === lecturers.length
                              }
                              onChange={handleCheckAllCouncil}
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
                          Manager
                        </th>
                        <th scope="col" className="p-4">
                          <span className="sr-only">Update</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      {councils?.map((council) => (
                        <tr
                          key={council?.id}
                          className="hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700"
                        >
                          <td className="p-4 w-4">
                            <div className="flex items-center">
                              <input
                                id="checkbox-table-2"
                                type="checkbox"
                                className="w-4 h-4 cursor-pointer"
                                checked={checkedCouncils.includes(council)}
                                onChange={(event) =>
                                  handleCheckCouncil(event, council)
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
                            {council?.email}
                          </td>
                          <td className="py-4 px-6 capitalize text-sm text-gray-900 whitespace-nowrap dark:text-white">
                            {council?.name}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap capitalize dark:text-white">
                            {council?.class || "None"}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                            {council?.major || "None"}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                            <NormalAvatar
                              setSize="w-10"
                              photoSrc={council?.photoSrc}
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
      {/* Open confirm modal to confirm create council*/}
      <ModalConfirm
        typeButton="subscribe"
        modalClass={modalClassModalCreate}
        setOpenModal={setOpenModalCreate}
        openModal={openModalCreate}
        action={handleAddCouncilList}
        title="Message!!!"
        message="Do you want to convert list of lecturer to council list and then to create councils"
        underMessage="You can also add the lecturers beside the department too"
      />
    </div>
  );
};
