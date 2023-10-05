/* eslint-disable @next/next/no-img-element */
import { Avatar, Breadcrumb, Button } from "@/components/Atoms";
import { AdminTemplate } from "@/components/Templates";
import {
  BREADCRUMB_ADMIN_CLASSROOM_MANAGEMENT,
  DATA_LECTURER_CIT,
} from "./mock-data";
import { useState } from "react";
import { IAuthObject } from "@/interface/auth";
import { useAuthContext } from "@/contexts/authContext";

function ClassroomManagement() {
  type MenuItem = {
    id: number;
    label: string;
  };
  const menuItems: MenuItem[] = [
    { id: 1, label: "Create classroom" },
    { id: 2, label: "Lecturer" },
    { id: 3, label: "Message" },
  ];
  const [selectedItem, setSelectedItem] = useState<MenuItem>(menuItems[0]);

  const handleClick = (item: MenuItem) => {
    setSelectedItem(item);
  };
  //   HANLE GET LECTURER
  const [checkedItems, setCheckedItems] = useState<IAuthObject[]>([]);
  const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckedItems(DATA_LECTURER_CIT);
    } else {
      setCheckedItems([]);
    }
  };
  const handleCheckItem = (
    event: React.ChangeEvent<HTMLInputElement>,
    lecturer: IAuthObject
  ) => {
    if (event.target.checked) {
      setCheckedItems([...checkedItems, lecturer]);
    } else {
      setCheckedItems(checkedItems.filter((item) => item.id !== lecturer.id));
    }
  };

  //   HANDLE CREATE ACCOUNT FOR LECTURER
  const { signUpWithEmailPassword } = useAuthContext();
  const handleCreateAccountLecturer = () => {
    checkedItems.forEach((lecturer: IAuthObject) => {
      const { email, password } = lecturer;
      signUpWithEmailPassword(email, password || "nopassword", lecturer);
    });
  };

  return (
    <AdminTemplate title="Classroom management | Thesis course registration system">
      <div className="mt-5">
        <Breadcrumb dataBreadcrumb={BREADCRUMB_ADMIN_CLASSROOM_MANAGEMENT} />
        <h4 className="text-lg uppercase text-green-700 font-medium mt-3">
          Classroom management
        </h4>
        <ul className="flex gap-3 mt-2 border-b text-[15px] cursor-pointer">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`px-3 py-2 ${
                selectedItem.id === item.id ? "border-green-700 border-b-2" : ""
              }`}
              onClick={() => handleClick(item)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
      {selectedItem.id === 1 && (
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-1 mt-5">
            <div className="w-full mx-auto">
              <div className="flex flex-col">
                <div className="overflow-x-auto">
                  <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                          <tr>
                            <th scope="col" className="p-4">
                              <div className="flex items-center">
                                <input
                                  id="checkbox-all"
                                  type="checkbox"
                                  className="w-4 h-4 "
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
                              className="py-3 px-6 text-xs font-medium tracking-wider text-left text-green-700 uppercase dark:text-green-400"
                            >
                              Email
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-6 text-xs font-medium tracking-wider text-left text-green-700 uppercase dark:text-green-400"
                            >
                              Full Name
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-6 text-xs font-medium tracking-wider text-left text-green-700 uppercase dark:text-green-400"
                            >
                              Avatar
                            </th>
                            <th scope="col" className="p-4">
                              <span className="sr-only">Update</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                          <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
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
                              bvqbao@cit.ctu.edu.vn
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-white">
                              PhD. Bui Vo Quoc Bao
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                              <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                <Avatar widthStr="50" srcImg="" />
                              </div>
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
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      )}
      {selectedItem.id === 2 && (
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-7 mt-3">
            <div className="flex justify-between items-center py-2">
              <h4 className="pb-3 font-medium">CIT HR systems</h4>
              <Button
                className="bg-green-700 btn-sm px-8 text-white"
                title="Create account"
                otherType="subscribe"
                handleSubcribeClass={handleCreateAccountLecturer}
              />
            </div>
            <div className="w-full mx-auto">
              <div className="flex flex-col">
                <div className="overflow-x-auto">
                  <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                          <tr>
                            <th scope="col" className="p-4">
                              <div className="flex items-center">
                                <input
                                  id="checkbox-all"
                                  type="checkbox"
                                  className="w-4 h-4 "
                                  checked={
                                    checkedItems.length ===
                                    DATA_LECTURER_CIT.length
                                  }
                                  onChange={handleCheckAll}
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
                              className="py-3 px-6 text-xs font-medium tracking-wider text-left text-green-700 uppercase dark:text-green-400"
                            >
                              Email
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-6 text-xs font-medium tracking-wider text-left text-green-700 uppercase dark:text-green-400"
                            >
                              Full Name
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-6 text-xs font-medium tracking-wider text-left text-green-700 uppercase dark:text-green-400"
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
                                    checked={checkedItems.includes(account)}
                                    onChange={(event) =>
                                      handleCheckItem(event, account)
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
                                <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                  <div className="avatar object-center">
                                    <div className="rounded-full">
                                      <img
                                        width={100}
                                        height={100}
                                        alt=""
                                        src={account.photoSrc}
                                      />
                                    </div>
                                  </div>
                                </div>
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
          <div className="col-span-5 m-5">
            <h4 className="pb-3 font-medium">Account system</h4>
            <div className="w-full mx-auto">
              <div className="flex flex-col">
                <div className="overflow-x-auto">
                  <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                          <tr>
                            <th scope="col" className="p-4">
                              <div className="flex items-center">
                                <input
                                  id="checkbox-all"
                                  type="checkbox"
                                  className="w-4 h-4"
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
                              className="py-3 px-6 text-xs font-medium tracking-wider text-left text-green-700 uppercase dark:text-green-400"
                            >
                              Account
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-6 text-xs font-medium tracking-wider text-left text-green-700 uppercase dark:text-green-400"
                            >
                              Password
                            </th>
                            <th scope="col" className="p-4">
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                          {DATA_LECTURER_CIT.map((account) => (
                            <tr
                              key={account.id}
                              className="hover:bg-gray-100 dark:hover:bg-gray-700"
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
                                {account.email}
                              </td>
                              <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                                {account.password}
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
      )}
    </AdminTemplate>
  );
}

export default ClassroomManagement;
