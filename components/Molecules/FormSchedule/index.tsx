import { FC } from "react";
import { Form, Formik } from "formik";
import { Button, CountInput, FormField } from "@/components/Atoms";
import { useAppDispatch } from "@/redux/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IThesisDef } from "@/interface/schedule";
import { createScheduleDef } from "@/redux/reducer/schedule-def/api";

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
  const addMutation = useMutation(
    (postData: { startTime: Date; endTime: Date }) => {
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
  return (
    <Formik
      initialValues={{
        startTime: new Date("12 1, 2023"),
        endTime: new Date("12 12, 2023"),
      }}
      validate={(values) => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          addMutation.mutate(values);
          resetForm();
        }, 400);
      }}
    >
      {(formik) => {
        const { values } = formik;
        return (
          <Form className="flex gap-5">
            <div className="w-1/2">
              <CountInput className="h-12" label="QL. Expected weeks" />
            </div>
            
            <FormField
              label="Select a end date"
              type="date"
              nameField="endTime"
              value={values.endTime}
            />
            <div className="flex justify-end items-center mt-3">
              <Button
                type="submit"
                title="Proceed scheduling"
                className="hover:bg-[#165b31] normal-case w-60 bg-green-700 text-white px-5"
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
