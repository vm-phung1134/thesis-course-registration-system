/* eslint-disable @next/next/no-img-element */
import { Button, NormalAvatar } from "@/components/Atoms";
import { FilterScheduledForm, ModalConfirm } from "@/components/Molecules";
import { useAuthContext } from "@/contexts/authContext";
import useCheckedBox from "@/hooks/useCheckedBox";
import { IAuthObject } from "@/interface/auth";
import { DATA_LECTURER_CIT } from "@/pages/admin/classroom-management/mock-data";
import { getAllLecturers } from "@/redux/reducer/auth/api";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { FC, useState } from "react";

interface ICreateAccountTab {}

export const CreateAccountTab: FC<ICreateAccountTab> = ({}) => {
  //   LECTURER SERVICE

  // Check box
  const {
    checkedItems: checkedLecturers,
    handleCheckAll: handleCheckAllLecturer,
    handleCheckItem: handleCheckLecturer,
  } = useCheckedBox<IAuthObject>(DATA_LECTURER_CIT);
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
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-7 mt-3">
        <div className="flex justify-between items-center py-2">
          <h4 className="pb-3 font-medium">CIT HR systems</h4>
          {checkedLecturers.length > 0 ? (
            <Button
              className="bg-green-700 btn-sm px-8 text-white"
              title="Create account"
              setToggle={setOpenCreateAccount}
              toggle={openCreateAccount}
            />
          ) : (
            <Button
              className=" btn-sm px-8 text-gray-800"
              title="Create account"
            />
          )}
        </div>
        <div className="flex justify-end mb-2">
          <FilterScheduledForm holderText="Filter lecturer ..." />
        </div>
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
                          className="py-3 px-6 text-sm font-normal tracking-wider text-left text-gray-200 dark:text-green-400"
                        >
                          Email
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
                          Avatar
                        </th>
                        <th scope="col" className="p-4">
                          <span className="sr-only">Update</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      {DATA_LECTURER_CIT.map((account) => (
                        <tr
                          key={account.id}
                          className="hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700"
                        >
                          <td className="p-4 w-4">
                            <div className="flex items-center">
                              <input
                                id="checkbox-table-2"
                                type="checkbox"
                                className="w-4 h-4 "
                                checked={checkedLecturers.includes(account)}
                                onChange={(event) =>
                                  handleCheckLecturer(event, account)
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
                            {account.email}
                          </td>
                          <td className="py-4 px-6 text-sm capitalize text-gray-500 whitespace-nowrap dark:text-white">
                            {account.name}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                            <NormalAvatar
                              photoSrc={account.photoSrc}
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
      <div className="col-span-5 m-3">
        <div className="flex justify-between items-center py-2">
          <h4 className="pb-3 font-medium">Account system</h4>
          <Button
            className="bg-gray-700 btn-sm px-8 text-white"
            title="Clear Account"
          />
        </div>
        <div className="flex justify-end mb-2">
          <FilterScheduledForm holderText="Account ..." />
        </div>
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
                              className="w-4 h-4"
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
                          Account
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-sm font-normal tracking-wider text-left text-gray-200 dark:text-green-400"
                        >
                          Password
                        </th>
                        <th scope="col" className="p-4">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      {accounts?.map((account) => (
                        <tr
                          key={account.id}
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
      <ModalConfirm
        modalClass={modalClassCreateAccount}
        setOpenModal={setOpenCreateAccount}
        openModal={openCreateAccount}
        action={handleCreateAccountLecturer}
        title="Message!!!"
        message="Do you want to create account for lecturers"
      />
    </div>
  );
};
