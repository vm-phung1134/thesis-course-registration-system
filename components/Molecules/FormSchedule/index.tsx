import { FC } from "react";
import { Form, Formik } from "formik";
import { Button, FormField } from "@/components/Atoms";

export interface IScheduleFormProps {}

export const ScheduleForm: FC<IScheduleFormProps> = () => {
  return (
    <Formik
      initialValues={{}}
      validate={(values) => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          resetForm();
        }, 400);
      }}
    >
      <Form className="flex gap-5">
        <FormField
          label="Select a start date"
          type="date"
          nameField="startDate"
          value=""
        />
        <FormField
          label="Select a end date"
          type="date"
          nameField="endDate"
          value=""
        />
        <div className="flex justify-end items-center mt-3">
          <Button
            type="submit"
            title="Proceed scheduling"
            className="hover:bg-[#165b31] normal-case w-60 bg-green-700 text-white px-5"
          />
        </div>
      </Form>
    </Formik>
  );
};
