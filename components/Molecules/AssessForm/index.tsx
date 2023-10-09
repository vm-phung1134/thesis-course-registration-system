import { FC } from "react";
import { Field, Form, Formik } from "formik";
import { Button } from "@/components/Atoms";

export interface IAssessFormProps {}

export const AssessForm: FC<IAssessFormProps> = () => {
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
      <Form>
        <div className="relative flex flex-col gap-2">
          <Field
            className="input text-sm rounded-none w-fit border-gray-300  focus:outline-none"
            type="number"
            id="content"
            placeholder="Ex: 10"
            name="content"
          />
          <Field
            className="input text-sm rounded-none w-full border-gray-300  focus:outline-none"
            type="text"
            id="content"
            placeholder="Enter your assessments ..."
            name="content"
          />
          <div className="flex justify-end">
            <Button className="px-10 bg-green-700 btn-sm text-white" title="Confirm" />
          </div>
        </div>
      </Form>
    </Formik>
  );
};
