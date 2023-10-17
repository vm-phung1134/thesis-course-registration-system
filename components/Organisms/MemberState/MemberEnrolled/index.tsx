import { Button, NormalAvatar } from "@/components/Atoms";
import { FilterScheduledForm } from "@/components/Molecules";
import { useClassroomStateContext } from "@/contexts/classroomState";
import useCheckedBox from "@/hooks/useCheckedBox";
import { IClassroomObject } from "@/interface/classroom";
import { IMemberObject } from "@/interface/member";
import { IStudentDefObject } from "@/interface/studef";
import { getAllMemberClassroom } from "@/redux/reducer/member/api";
import { createStudentDef } from "@/redux/reducer/student-def/api";
import { useAppDispatch } from "@/redux/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";

interface IMemberEnrolledProps {}

export const MemberEnrolled: FC<IMemberEnrolledProps> = ({}) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { authClassroomState } = useClassroomStateContext();
  const { data: members } = useQuery<IMemberObject[]>({
    queryKey: ["members", authClassroomState],
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
  const addMutation = useMutation(
    (postData: IStudentDefObject) => {
      return new Promise((resolve, reject) => {
        dispatch(createStudentDef(postData))
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
        queryClient.invalidateQueries(["members"]);
      },
    }
  );

  const handleAddToStudentDef = () => {
    checkedMembers.forEach(async (member: IMemberObject) => {
      await addMutation.mutate({
        infor: member.member,
        instructor: authClassroomState.lecturer,
      } as IStudentDefObject);
    });
  };

  // const handleFakeDataStudentDef = async () => {
  //   for (let i = 80; i < 90; i++) {
  //     await addMutation.mutate({
  //       infor: {
  //         name: `Student ${i}`,
  //         photoSrc:
  //           "https://images.pexels.com/photos/445109/pexels-photo-445109.jpeg?auto=compress&cs=tinysrgb&w=600",
  //         email: `user${i}b191000${i}.student.ctu.edu.vn`,
  //         phone: "0999999999",
  //         class: `DI19V7A${i}`,
  //         major: "IT1",
  //         role: "student",
  //         id: `SV${i}`,
  //       },
  //       instructor: {
  //         name: "truc anh dai",
  //         photoSrc:
  //           "https://images.pexels.com/photos/445109/pexels-photo-445109.jpeg?auto=compress&cs=tinysrgb&w=600",
  //         email: "tadai@cit.ctu.edu.vn",
  //         phone: "0123456789",
  //         class: "IT1",
  //         major: "CNTT",
  //         role: "lecturer",
  //         id: "GV9",
  //       },
  //     } as IStudentDefObject);
  //   }
  // };

  return (
    <div className="px-3 my-5">
      <div className="flex justify-between">
        <div className="flex">
          <Button
            title="Recently date"
            className="px-5 btn-sm bg-gray-800 text-white"
          />
          <Button title="Ascending order" className="px-5 btn-sm" />
          <Button title="All" className="px-5 btn-sm" />
        </div>
        <div className="flex justify-end py-2 gap-3">
          <Button
            otherType="subscribe"
            handleActions={handleAddToStudentDef}
            className=" btn-sm px-8 text-gray-800"
            title="Submit to council"
          />
          <FilterScheduledForm holderText="Filter schedule time ..." />
        </div>
      </div>
      <div className="w-full mx-auto my-5">
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
                    {filterMemberEnrolled(members).map((member) => (
                      <tr
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
                          10/13/2023
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
  );
};
