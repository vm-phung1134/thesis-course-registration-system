/* eslint-disable @next/next/no-img-element */
import { Button, IconButton } from "@/components/Atoms";
import {
  CreateRoomForm,
  EditRoomForm,
  FilterScheduledForm,
  ModalConfirm,
} from "@/components/Molecules";
import useCheckedBox from "@/hooks/useCheckedBox";
import { useTableSearch } from "@/hooks/useTableSearch";
import { IRoomDefObject } from "@/interface/room";
import {
  deleteRoomDef,
  getAllRoomDefs,
  getOneRoomDef,
} from "@/redux/reducer/room-def/api";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useToastifyMessage from "@/hooks/useToastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

interface ICreateRoomTab {}

export const CreateRoomTab: FC<ICreateRoomTab> = ({}) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  // ROOM SERVICE
  // Open edit room modal
  const [openEditRoom, setOpenEditRoom] = useState<boolean>(false);
  const modalClassEditRoom = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openEditRoom,
  });

  // Get all accounts have been created
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
  const { filteredData: room_filteredData, handleSearch: room_handleSearch } =
    useTableSearch(rooms);
  const { room } = useAppSelector((state) => state.roomDefReducer);
  const handleUpdateRoomForm = async (room: IRoomDefObject) => {
    setOpenEditRoom(!openEditRoom);
    await dispatch(getOneRoomDef(room));
  };
  const deleteMutation = useMutation(
    (postData: IRoomDefObject) => {
      return new Promise((resolve, reject) => {
        dispatch(deleteRoomDef(postData))
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
        queryClient.invalidateQueries(["room-defs"]);
      },
    }
  );
  const handleClearRoom = () => {
    checkedRooms.forEach((room: IRoomDefObject) => {
      deleteMutation.mutate(room);
    });
  };
  const [openModalClearRoom, setOpenModalClearRoom] = useState<boolean>(false);
  const modalClassModalClearRoom = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModalClearRoom,
  });
  useToastifyMessage(deleteMutation, "Room has been deleted successfully");
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-5 p-5 mt-5 border shadow-md">
        <CreateRoomForm />
      </div>
      <div className="col-span-7 mt-5">
        <div className="flex justify-between items-center">
          <div className="mb-3">
            <h4 className="font-medium">Room council</h4>
            <p className="text-sm text-slate-500">Total {rooms.length} rooms</p>
          </div>
          <IconButton
            className="bg-red-100 btn-sm rounded-none px-5 border-none text-red-500"
            title="Clear Council"
            toggleForm={openModalClearRoom}
            setToggleForm={setOpenModalClearRoom}
            classNameIcon={"w-5"}
            srcIcon={"https://cdn-icons-png.flaticon.com/128/9068/9068885.png"}
          />
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
            <FilterScheduledForm
              handleSearch={room_handleSearch}
              holderText="Search schedule time ..."
            />
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
                          className="py-3 pl-3 text-sm text-start font-medium tracking-wider text-gray-200  dark:text-green-400"
                        >
                          No.
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
                      <AnimatePresence>
                        {room_filteredData?.map((room, index) => (
                          <motion.tr
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
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
                              {(index += 1)}
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
                              <button
                                onClick={() => handleUpdateRoomForm(room)}
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
      <dialog id="modal_admin_edit_auth" className={modalClassEditRoom}>
        <div className="w-5/12 bg-white p-5 h-fit shadow-2xl rounded-xl">
          <EditRoomForm
            setToggleForm={setOpenEditRoom}
            toggleForm={openEditRoom}
            room={room}
          />
        </div>
      </dialog>
      <ModalConfirm
        modalClass={modalClassModalClearRoom}
        setOpenModal={setOpenModalClearRoom}
        openModal={openModalClearRoom}
        typeButton="subscribe"
        action={handleClearRoom}
        underMessage="Once you delete this rooms if will be gone forever"
        title="Message!!!"
        message="Are you sure do you want to delete this rooms"
      />
      <ToastContainer
        toastStyle={{
          color: "black",
          fontSize: "14px",
          fontFamily: "Red Hat Text",
        }}
      />
    </div>
  );
};
