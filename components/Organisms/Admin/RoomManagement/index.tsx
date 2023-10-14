/* eslint-disable @next/next/no-img-element */
import { Button, NormalAvatar } from "@/components/Atoms";
import {
  CreateRoomForm,
  FilterScheduledForm,
  ModalConfirm,
} from "@/components/Molecules";
import { useAuthContext } from "@/contexts/authContext";
import useCheckedBox from "@/hooks/useCheckedBox";
import { IAuthObject } from "@/interface/auth";
import { IRoomDefObject } from "@/interface/room";
import { DATA_LECTURER_CIT } from "@/pages/admin/classroom-management/mock-data";
import { getAllLecturers } from "@/redux/reducer/auth/api";
import { getAllRoomDefs } from "@/redux/reducer/room-def/api";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { FC, SetStateAction, useState } from "react";

interface ICreateRoomTab {}

export const CreateRoomTab: FC<ICreateRoomTab> = ({}) => {
  // ROOM SERVICE
  // Open modal
  const [openCreateRoom, setOpenCreateRoom] = useState<boolean>(false);
  const modalClassCreateRoom = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openCreateRoom,
  });

  // Get all accounts have been created
  const dispatch = useAppDispatch();
  const { data: rooms } = useQuery<IRoomDefObject[]>({
    queryKey: ["room-defs"],
    queryFn: async () => {
      const action = await dispatch(getAllRoomDefs());
      return action.payload || [];
    },
    initialData: [],
  });

  const {
    checkedItems: checkedRooms,
    handleCheckAll: handleCheckAllRoom,
    handleCheckItem: handleCheckRoom,
  } = useCheckedBox<IRoomDefObject>(rooms);
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-5 p-5 mt-5 border shadow-md">
        <CreateRoomForm />
      </div>
      <div className="col-span-7 mt-5">
        <div className="flex justify-between">
          <div className="flex mb-3">
            <Button
              title="Recently date"
              className="px-5 btn-sm bg-gray-800 text-white"
            />
            <Button title="Ascending order" className="px-5 btn-sm" />
            <Button title="All" className="px-5 btn-sm" />
          </div>
          <div>
            <FilterScheduledForm holderText="Filter schedule time ..." />
          </div>
        </div>
        <div className="w-full mx-auto">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
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
                              checked={checkedRooms.length === rooms.length}
                              onChange={handleCheckAllRoom}
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
                          Name
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-sm font-normal tracking-wider text-left text-gray-200  dark:text-green-400"
                        >
                          Type
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
                          Description
                        </th>
                        <th scope="col" className="p-4">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      {rooms?.map((room) => (
                        <tr
                          key={room?.id}
                          className="hover:bg-gray-100  cursor-pointer dark:hover:bg-gray-700"
                        >
                          <td className="p-4 w-4">
                            <div className="flex items-center">
                              <input
                                id="checkbox-table-2"
                                type="checkbox"
                                className="w-4 h-4 cursor-pointer"
                                checked={checkedRooms.includes(room)}
                                onChange={(event) =>
                                  handleCheckRoom(event, room)
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
                            {room?.name}
                          </td>
                          <td className="py-4 px-6 capitalize text-sm text-gray-900 whitespace-nowrap dark:text-white">
                            {room?.type}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                            {room?.school}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                            {room?.description || "Not updated information"}
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
    </div>
  );
};
