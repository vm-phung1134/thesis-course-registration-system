import { Button, CountInput, FormField } from "@/components/Atoms";
import { Form, Formik } from "formik";
import { FC, useEffect, useState } from "react"; // Import useState hook
import { AnimatePresence, motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "@/redux/store";
import { IStudentDefObject } from "@/interface/studef";
import {
  createStudentDef,
  deleteAllStudentDef,
  getAllStudentDefs,
} from "@/redux/reducer/student-def/api";
import { IAuthObject } from "@/interface/auth";
import {
  createCouncilDef,
  deleteAllCouncilDef,
  getAllCouncilDefs,
} from "@/redux/reducer/council-def/api";

export interface ITestingScheduleprops {}

export const TestingSchedule: FC<ITestingScheduleprops> = ({}) => {
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const addStudefMutation = useMutation(
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
        queryClient.invalidateQueries(["stud-defs"]);
        queryClient.invalidateQueries(["council-defs"]);
      },
    }
  );
  const addLecdefMutation = useMutation(
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
        queryClient.invalidateQueries(["stud-defs"]);
        queryClient.invalidateQueries(["council-defs"]);
      },
    }
  );
  const createMockDataScheduleArrange = async (
    teacherCount: number,
    studentCount: number,
    isRandom: boolean
  ) => {
    await dispatch(deleteAllCouncilDef());
    await dispatch(deleteAllStudentDef());
    if (isRandom) {
      let remainingStudents = studentCount;
      for (let i = 1; i < teacherCount + 1; i++) {
        addLecdefMutation.mutate({
          name: `Giang vien ${i}`,
          photoSrc:
            "https://images.pexels.com/photos/445109/pexels-photo-445109.jpeg?auto=compress&cs=tinysrgb&w=600",
          email: `gv${i}@cit.ctu.edu.vn`,
          phone: "0123456789",
          class: "IT1",
          major: "CNTT",
          role: "lecturer",
          id: `GV${i}`,
        });
        const randomStudentCount =
          Math.floor(Math.random() * (remainingStudents / teacherCount)) + (remainingStudents / teacherCount);
        remainingStudents -= randomStudentCount;
        for (let j = 1; j < randomStudentCount + 1; j++) {
          addStudefMutation.mutate({
            infor: {
              name: `Student ${j}`,
              photoSrc:
                "https://images.pexels.com/photos/445109/pexels-photo-445109.jpeg?auto=compress&cs=tinysrgb&w=600",
              email: `user${j}b191000${j}.student.ctu.edu.vn`,
              phone: "0999999999",
              class: `DI19V7A${j}`,
              major: "IT1",
              role: "student",
              id: `SV${j}GV${i}`,
            },
            instructor: {
              name: `Giang vien ${i}`,
              photoSrc:
                "https://images.pexels.com/photos/445109/pexels-photo-445109.jpeg?auto=compress&cs=tinysrgb&w=600",
              email: `gv${i}@cit.ctu.edu.vn`,
              phone: "0123456789",
              class: "IT1",
              major: "CNTT",
              role: "lecturer",
              id: `GV${i}`,
            },
          } as IStudentDefObject);
        }
      }
    } else {
      const studentPerTeacher = Math.floor(studentCount / teacherCount);
      for (let i = 1; i < teacherCount + 1; i++) {
        addLecdefMutation.mutate({
          name: `Giang vien ${i}`,
          photoSrc:
            "https://images.pexels.com/photos/445109/pexels-photo-445109.jpeg?auto=compress&cs=tinysrgb&w=600",
          email: `gv${i}@cit.ctu.edu.vn`,
          phone: "0123456789",
          class: "IT1",
          major: "CNTT",
          role: "lecturer",
          id: `GV${i}`,
        });
        for (let j = 1; j < studentPerTeacher + 1; j++) {
          addStudefMutation.mutate({
            infor: {
              name: `Student ${j}`,
              photoSrc:
                "https://images.pexels.com/photos/445109/pexels-photo-445109.jpeg?auto=compress&cs=tinysrgb&w=600",
              email: `user${j}b191000${j}.student.ctu.edu.vn`,
              phone: "0999999999",
              class: `DI19V7A${j}`,
              major: "IT1",
              role: "student",
              id: `SV${j}GV${i}`,
            },
            instructor: {
              name: `Giang vien ${i}`,
              photoSrc:
                "https://images.pexels.com/photos/445109/pexels-photo-445109.jpeg?auto=compress&cs=tinysrgb&w=600",
              email: `gv${i}@cit.ctu.edu.vn`,
              phone: "0123456789",
              class: "IT1",
              major: "CNTT",
              role: "lecturer",
              id: `GV${i}`,
            },
          } as IStudentDefObject);
        }
      }
    }
  };
  const { data: council_defs } = useQuery<IAuthObject[]>({
    queryKey: ["council-defs"],
    queryFn: async () => {
      const action = await dispatch(getAllCouncilDefs());
      return action.payload || [];
    },
    initialData: [],
  });
  const { data: stud_defs } = useQuery<IStudentDefObject[]>({
    queryKey: ["stud-defs"],
    queryFn: async () => {
      const action = await dispatch(getAllStudentDefs());
      return action.payload || [];
    },
    initialData: [],
  });
  return (
    <Formik
      initialValues={{
        quantityLecdef: 15,
        quantityStudef: 15,
        sameStudentForLecturer: true,
      }}
      validate={(values) => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          createMockDataScheduleArrange(
            values.quantityLecdef,
            values.quantityStudef,
            isChecked
          );
        }, 400);
      }}
    >
      {(formik) => {
        const { values, setFieldValue } = formik;
        const handleChangeQuantityLecturer = (newValue: number) => {
          setFieldValue("quantityLecdef", newValue);
        };
        const handleChangeQuantityStudent = (newValue: number) => {
          setFieldValue("quantityStudef", newValue);
        };
        return (
          <>
            <Form>
              <h4 className="font-medium text-green-700 my-3">
                Testing api schedule time thesis denfense
              </h4>
              <p className="text-sm">
                This pages allows user perform testing schedule thesis denfense
                with data has been generating random:
              </p>
              <ul className="text-sm list-disc ml-10 mb-5">
                <li>Mock data quantity lecturers</li>
                <li>Mock data quantity students</li>
                <li>
                  Select quantity students have follow lecturer constantly
                </li>
              </ul>
              <div className="flex gap-5 items-end">
                <div className="w-1/3">
                  <CountInput
                    valueNumber={values.quantityLecdef}
                    className="h-12"
                    onChange={handleChangeQuantityLecturer}
                    label="QL. Lecturer"
                    limit={50}
                  />
                </div>
                <div className="w-1/3">
                  <CountInput
                    valueNumber={values.quantityStudef}
                    className="h-12"
                    onChange={handleChangeQuantityStudent}
                    label="QL. Student"
                    limit={700}
                  />
                </div>
                {addStudefMutation.isLoading ? (
                  <Button
                    className="bg-green-700 text-white px-10"
                    title="Loading..."
                  />
                ) : (
                  <Button
                    type="submit"
                    className="bg-green-700 text-white px-10"
                    title="Generating document"
                  />
                )}
              </div>

              <div className="w-1/3 mt-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="checkbox h-5 w-5 text-green-500 checkbox-success"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                  />
                  <span className="ml-2 text-sm font-medium">
                    Asynchronous quantity student follow lecturer
                  </span>
                </label>
              </div>
            </Form>
            <h4 className="font-medium text-green-700 mt-5">The mock testing api result</h4>
            <div className="w-1/2">
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
                              className="py-3 pl-2 text-sm text-start font-medium tracking-wider text-gray-200  dark:text-green-400"
                            >
                              No.
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-6 text-sm font-medium tracking-wider text-left text-gray-200 dark:text-green-400"
                            >
                              Instructor
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-6 text-sm font-medium tracking-wider text-left text-gray-200 dark:text-green-400"
                            >
                              Ql. Students
                            </th>
                            <th scope="col" className="p-4">
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                          <AnimatePresence>
                            {council_defs?.map((council, index) => (
                              <motion.tr
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                key={council.id}
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
                                  {(index += 1)}
                                </td>
                                <td className="py-4 px-6 capitalize text-sm text-gray-900 whitespace-nowrap dark:text-white">
                                  {council?.name}
                                </td>
                                <td className="py-4 px-6  text-sm capitalize text-gray-900 whitespace-nowrap dark:text-white">
                                  {
                                    stud_defs?.filter(
                                      (stud) =>
                                        stud.instructor.id === council.id
                                    ).length
                                  }
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
          </>
        );
      }}
    </Formik>
  );
};
