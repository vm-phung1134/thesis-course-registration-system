import { Button } from "@/components/Atoms";
import {
  FilterScheduledForm,
  ModalConfirm,
  UnavailableForm,
} from "@/components/Molecules";
import { useCurrentUserContext } from "@/contexts/currentUserContext";
import { INITIATE_UNAVAIABLE_SCHEDULE } from "@/data";
import {
  deleteUnavaiableDate,
  getAllUnavaiableDates,
} from "@/redux/reducer/unavailable-date/api";
import { UndateParams } from "@/redux/reducer/unavailable-date/type";
import { useAppDispatch } from "@/redux/store";
import { convertDateTimeSecond } from "@/utils/covertDate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import React, { FC, useState } from "react";
import useToastifyMessage from "@/hooks/useToastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import classNames from "classnames";
import { IUnavailableDate } from "@/interface/unavailableDate";
import { useMutationQueryAPI } from "@/hooks/useMutationAPI";

export interface IPersonalSchedule {}

export const PersonalSchedule: FC<IPersonalSchedule> = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useCurrentUserContext();
  const { data: unDateLectuter } = useQuery<IUnavailableDate>({
    queryKey: ["unavailable-date", currentUser],
    queryFn: async () => {
      const action = await dispatch(getAllUnavaiableDates(currentUser));
      return action.payload || INITIATE_UNAVAIABLE_SCHEDULE;
    },
    initialData: INITIATE_UNAVAIABLE_SCHEDULE,
  });
  const deleteMutation = useMutationQueryAPI({
    action: deleteUnavaiableDate,
    queryKeyLog: ["unavailable-date"],
    successMsg: "You delete your schedule busy successfully!",
    errorMsg: "Fail to delete the schedule!",
  });
  const [valueUndate, setValueUndate] = useState<UndateParams>({
    idAuth: "",
    idUndate: "",
  });
  const [openDelUnDate, setOpenDelUnDate] = useState<boolean>(false);
  const modalClassDelUnDate = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openDelUnDate,
  });
  const handleOpenModalDelDate = (postData: UndateParams) => {
    setOpenDelUnDate(!openDelUnDate);
    setValueUndate(postData);
  };
  const handleDeleteUnavailableDate = () => {
    deleteMutation.mutate(valueUndate);
  };
  useToastifyMessage(
    deleteMutation,
    "Delete unavailable date was successfully"
  );
  return (
    <>
      <div className="grid grid-cols-3 gap-10 h-[50vh] mt-8">
        <div>
          <div className="py-3 bg-slate-50 rounded-xl p-5 shadow-lg">
            <UnavailableForm />
          </div>
          <p className="text-sm mt-10 font-thin">
            In case the instructor has a meeting or work schedule, please fill
            in the information and send it to the department secretary before
            the date of the official decision from the thesis committee.
          </p>
        </div>

        <div className="col-span-2">
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
            <FilterScheduledForm holderText="Search date ..." />
          </div>
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
                                className="w-4 h-4 "
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
                            className="py-3 px-4 text-sm font-medium tracking-wider text-left text-gray-200 dark:text-green-400"
                          >
                            Date
                          </th>
                          <th
                            scope="col"
                            className="py-3 pr-6 text-sm font-medium tracking-wider text-left text-gray-200 dark:text-green-400"
                          >
                            Reason
                          </th>
                          <th scope="col" className="p-4">
                            <span className="sr-only">Update</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        <AnimatePresence>
                          {unDateLectuter?.schedules?.map((unDate, index) => (
                            <motion.tr
                              key={unDate.id}
                              className="hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700"
                            >
                              <td className="p-4 w-4">
                                <div className="flex items-center">
                                  <input
                                    id="checkbox-table-2"
                                    type="checkbox"
                                    className="w-4 h-4 "
                                  />
                                  <label
                                    htmlFor="checkbox-table-2"
                                    className="sr-only"
                                  >
                                    checkbox
                                  </label>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                                {(index += 1)}
                              </td>
                              <td className="py-4 px-4 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                                {convertDateTimeSecond(unDate.date)}
                              </td>
                              <td className="py-4 pr-6 text-sm capitalize text-gray-500 whitespace-nowrap dark:text-white">
                                {unDate.reason}
                              </td>
                              <td className="py-4 px-6 text-sm text-right whitespace-nowrap">
                                <button
                                  onClick={() =>
                                    handleOpenModalDelDate({
                                      idAuth: currentUser.id,
                                      idUndate: unDate.id,
                                    })
                                  }
                                  className="text-blue-600 dark:text-blue-500"
                                >
                                  Delete
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
      <ToastContainer
        toastStyle={{
          color: "black",
          fontSize: "14px",
          fontFamily: "Red Hat Text",
        }}
      />
      <ModalConfirm
        modalClass={modalClassDelUnDate}
        setOpenModal={setOpenDelUnDate}
        openModal={openDelUnDate}
        action={handleDeleteUnavailableDate}
        typeButton="subscribe"
        underMessage="Once you delete this date if will be gone forever"
        title="Message!!!"
        message="Are you sure that you want to delete this date?"
      />
    </>
  );
};
