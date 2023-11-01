/* eslint-disable @next/next/no-img-element */
import { Button, IconButton, NormalAvatar } from "@/components/Atoms";
import { FilterScheduledForm, ModalConfirm } from "@/components/Molecules";
import { useAuthContext } from "@/contexts/authContext";
import useCheckedBox from "@/hooks/useCheckedBox";
import { IAuthObject } from "@/interface/auth";
import { DATA_LECTURER_CIT } from "@/pages/admin/classroom-management/mock-data";
import { deleteAuth, getAllLecturers } from "@/redux/reducer/auth/api";
import { useAppDispatch } from "@/redux/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { FC, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useTableSearch } from "@/hooks/useTableSearch";

interface ICreateAccountTab {}

export const CreateAccountTab: FC<ICreateAccountTab> = ({}) => {
  //   LECTURER SERVICE
  // Check box
  const {
    checkedItems: checkedLecturers,
    handleCheckAll: handleCheckAllLecturer,
    handleCheckItem: handleCheckLecturer,
  } = useCheckedBox<IAuthObject>(DATA_LECTURER_CIT);
  const { filteredData: cit_filteredData, handleSearch: cit_handleSearch } =
    useTableSearch(DATA_LECTURER_CIT);
  // Open modal
  const [openCreateAccount, setOpenCreateAccount] = useState<boolean>(false);
  const modalClassCreateAccount = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openCreateAccount,
  });

  // Get all accounts have been created
  const dispatch = useAppDispatch();
  const { data: accounts } = useQuery<IAuthObject[]>({
    queryKey: ["accounts"],
    queryFn: async () => {
      const action = await dispatch(getAllLecturers());
      return action.payload || [];
    },
    initialData: [],
  });

  //   Handle create account
  const { signUpWithEmailPassword } = useAuthContext();
  const handleCreateAccountLecturer = () => {
    checkedLecturers.forEach((lecturer: IAuthObject) => {
      const { email, password } = lecturer;
      signUpWithEmailPassword(email, password || "nopassword", lecturer);
    });
  };

  // ACCOUNT SERVICE
  // Open modal
  const [openDelAccount, setOpenDelAccount] = useState<boolean>(false);
  const modalClassDelAccount = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openDelAccount,
  });
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    (postData: IAuthObject) => {
      return new Promise((resolve, reject) => {
        dispatch(deleteAuth(postData))
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
        queryClient.invalidateQueries(["accounts"]);
      },
    }
  );
  const {
    checkedItems: checkedAccounts,
    handleCheckAll: handleCheckAllAccount,
    handleCheckItem: handleCheckAccount,
  } = useCheckedBox<IAuthObject>(accounts);
  const handleDelAccount = () => {
    checkedAccounts.forEach((account: IAuthObject) => {
      deleteMutation.mutate(account);
    });
  };

  // Use custom hook to search item in table by using useDebounce
  const {
    filteredData: account_filteredData,
    handleSearch: account_handleSearch,
  } = useTableSearch(accounts);

  useEffect(() => {
    if (deleteMutation.isSuccess) {
      toast.success("Account was successfully deleted", {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 2000,
      });
    }
  }, [deleteMutation.isSuccess]);
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-7 mt-3">
        <div className="flex justify-between items-center py-2">
          <div className="mb-3">
            <h4 className="font-medium">CIT HR systems</h4>
            <p className="text-sm text-slate-500">
              Total {DATA_LECTURER_CIT.length} lecturers
            </p>
          </div>
          <div className="flex gap-3">
            <IconButton
              className="btn-sm rounded-none hover:text-black px-5 text-green-700 border"
              title="New lecturer"
              classNameIcon={"w-4"}
              srcIcon={
                "https://cdn-icons-png.flaticon.com/128/9698/9698073.png"
              }
            />
            {checkedLecturers.length > 0 ? (
              <IconButton
                setToggleForm={setOpenCreateAccount}
                toggleForm={openCreateAccount}
                className="btn-sm rounded-none px-5 border-none bg-green-700 text-white"
                title="Generate Account"
                classNameIcon={"w-5"}
                srcIcon={
                  "https://cdn-icons-png.flaticon.com/128/5482/5482806.png"
                }
              />
            ) : (
              <IconButton
                className="btn-sm px-5 text-gray-800 rounded-none"
                title="Generate Account"
                classNameIcon={"w-5"}
                srcIcon={
                  "https://cdn-icons-png.flaticon.com/128/5482/5482806.png"
                }
              />
            )}
          </div>
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
            handleSearch={cit_handleSearch}
            holderText="Filter lecturer ..."
          />
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
                              checked={
                                checkedLecturers.length ===
                                DATA_LECTURER_CIT.length
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
                          className="py-3 px-6 text-sm font-medium tracking-wider text-left text-gray-200 dark:text-green-400"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-sm font-medium tracking-wider text-left text-gray-200 dark:text-green-400"
                        >
                          Full Name
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-sm font-medium tracking-wider text-left text-gray-200 dark:text-green-400"
                        >
                          Avatar
                        </th>
                        <th scope="col" className="p-4">
                          <span className="sr-only">Update</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      <AnimatePresence>
                        {cit_filteredData?.map((lecturer) => (
                          <motion.tr
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key={lecturer.id}
                            className="hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700"
                          >
                            <td className="p-4 w-4">
                              <div className="flex items-center">
                                <input
                                  id="checkbox-table-2"
                                  type="checkbox"
                                  className="w-4 h-4 "
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
                              {lecturer.email}
                            </td>
                            <td className="py-4 px-6 text-sm capitalize text-gray-500 whitespace-nowrap dark:text-white">
                              {lecturer.name}
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                              <NormalAvatar
                                photoSrc={lecturer.photoSrc}
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
      <div className="col-span-5 m-3">
        <div className="flex justify-between items-center py-2">
          <div className="mb-3">
            <h4 className="font-medium">Account system</h4>
            <p className="text-sm text-slate-500">
              Total {accounts.length} accounts
            </p>
          </div>
          <IconButton
            className="bg-red-100 btn-sm rounded-none px-5 border-none text-red-500"
            title="Clear Account"
            setToggleForm={setOpenDelAccount}
            toggleForm={openDelAccount}
            classNameIcon={"w-5"}
            srcIcon={"https://cdn-icons-png.flaticon.com/128/9068/9068885.png"}
          />
        </div>
        <div className="flex justify-start flex-col items-start gap-3 mb-2">
          <FilterScheduledForm
            handleSearch={account_handleSearch}
            holderText="Account ..."
          />
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
                              className="w-4 h-4"
                              checked={
                                checkedAccounts.length === accounts.length
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
                          className="py-3 px-6 text-sm font-medium tracking-wider text-left text-gray-200 dark:text-green-400"
                        >
                          Account
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-sm font-medium tracking-wider text-left text-gray-200 dark:text-green-400"
                        >
                          Password
                        </th>
                        <th scope="col" className="p-4">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      <AnimatePresence>
                        {account_filteredData?.map((account) => (
                          <motion.tr
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key={account.id}
                            className="hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700"
                          >
                            <td className="p-4 w-4">
                              <div className="flex items-center">
                                <input
                                  id="checkbox-table-2"
                                  type="checkbox"
                                  className="w-4 h-4 "
                                  checked={checkedAccounts.includes(account)}
                                  onChange={(event) =>
                                    handleCheckAccount(event, account)
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
                              {account?.email}
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                              {account?.password}
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

      <ToastContainer
        toastStyle={{
          color: "black",
          fontSize: "14px",
          fontFamily: "Red Hat Text",
        }}
      />
      <ModalConfirm
        modalClass={modalClassCreateAccount}
        setOpenModal={setOpenCreateAccount}
        openModal={openCreateAccount}
        action={handleCreateAccountLecturer}
        typeButton="subscribe"
        underMessage="No message!!"
        title="Message!!!"
        message="Do you want to create account for lecturers"
      />
      <ModalConfirm
        modalClass={modalClassDelAccount}
        setOpenModal={setOpenDelAccount}
        openModal={openDelAccount}
        action={handleDelAccount}
        typeButton="subscribe"
        underMessage="Once you delete this accounts if will be gone forever"
        title="Message!!!"
        message="Are you sure that you want to delete this accounts?"
      />
    </div>
  );
};
