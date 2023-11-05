import { FC, useEffect } from "react";
import { Form, Formik } from "formik";
import { Button, CountInput, FormField } from "@/components/Atoms";
import { useAppDispatch } from "@/redux/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IThesisDef } from "@/interface/schedule";
import { createScheduleDef } from "@/redux/reducer/schedule-def/api";
import { IAuthObject } from "@/interface/auth";
import { getAllCouncilDefs } from "@/redux/reducer/council-def/api";
import { getAllStudentDefs } from "@/redux/reducer/student-def/api";
import { getAllRoomDefs } from "@/redux/reducer/room-def/api";

export interface IScheduleFormProps {
  setCreateScheduled: any;
  createScheduled: React.Dispatch<any>;
}

export const ScheduleForm: FC<IScheduleFormProps> = ({
  setCreateScheduled,
  createScheduled,
}) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { data: council_def } = useQuery<IAuthObject[]>({
    queryKey: ["council_def"],
    queryFn: async () => {
      const action = await dispatch(getAllCouncilDefs());
      return action.payload || [];
    },
    initialData: [],
  });
  const { data: student_def } = useQuery<IAuthObject[]>({
    queryKey: ["student_def"],
    queryFn: async () => {
      const action = await dispatch(getAllStudentDefs());
      return action.payload || [];
    },
    initialData: [],
  });
  const { data: room_def } = useQuery<IAuthObject[]>({
    queryKey: ["room_def"],
    queryFn: async () => {
      const action = await dispatch(getAllRoomDefs());
      return action.payload || [];
    },
    initialData: [],
  });
  const addMutation = useMutation(
    (postData: { quantityWeek: number; startDate: Date }) => {
      return new Promise((resolve, reject) => {
        dispatch(createScheduleDef(postData))
          .unwrap()
          .then((data: IThesisDef) => {
            setCreateScheduled(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["scheduled"]);
      },
    }
  );

  // Function handle number of rooms
  const handleNumberRoomDef = (wks: number, studef: number) => {
    if (wks <= 0) {
      return 0;
    } else {
      const convertDate = wks * 6;
      const dateDefense = studef / convertDate;
      return Math.ceil(dateDefense / 12);
    }
  };

  return (
    <Formik
      initialValues={{
        quantityWeek: 0,
        startDate: "",
      }}
      validate={(values) => {
        let errors: any = {};
        if (values.startDate == "Invalid Date") {
          errors.startDate = "! Start date is required";
        }
        if (!values.quantityWeek) {
          errors.quantityWeek = "! Quantity week is required";
        }
        console.log(errors);
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          // addMutation.mutate(values);

          resetForm();
        }, 400);
      }}
    >
      {(formik) => {
        const { values, setFieldValue } = formik;
        const handleChangeQuantityWeek = (newValue: number) => {
          setFieldValue("quantityWeek", newValue);
        };
        const expectedRoomDef = handleNumberRoomDef(
          values.quantityWeek,
          student_def.length
        );
        return (
          <Form>
            <div className="mb-8">
              <ul className="flex gap-10 text-sm">
                <li className="flex gap-3 items-center">
                  <p className="font-medium">Number of students involved:</p>
                  <span className="font-bold text-lg">
                    {student_def.length}
                  </span>
                </li>
                <li className="flex gap-3 items-center">
                  <p className="font-medium">
                    Number of lecturer in committed:
                  </p>
                  <span className="font-bold text-xl">
                    {council_def.length}
                  </span>
                </li>
                <li className="flex gap-3 items-center">
                  <p className="font-medium">Current number of rooms:</p>
                  <span className="font-bold text-xl">{room_def.length}</span>
                </li>
              </ul>
            </div>
            <div className="flex gap-5">
              <div className="w-1/2">
                <CountInput
                  valueNumber={values.quantityWeek}
                  className="h-12"
                  onChange={handleChangeQuantityWeek}
                  label="QL. Expected weeks"
                  limit={5}
                />
              </div>
              <FormField
                label="Select a end date"
                type="date"
                nameField="startDate"
                value={values.startDate}
              />
              <div className="flex justify-end items-center mt-3">
                <Button
                  type="submit"
                  title="Proceed scheduling"
                  className="hover:bg-[#165b31] normal-case w-60 bg-green-700 text-white px-5"
                />
              </div>
            </div>
            <div>
              <p className="text-xs tracking-wider font-medium text-red-500">
                Minimum number of rooms to accommodate {student_def.length}{" "}
                students on {expectedRoomDef} rooms or more
              </p>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
