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
        <div className="relative flex flex-col gap-1">
          <div className="flex gap-3 items-center">
            <Field
              className="input text-sm input-sm rounded-full w-fit border-gray-300  focus:outline-none"
              type="number"
              id="content"
              placeholder="8.5"
              name="content"
            />
            <button className="py-2 rounded-full px-5 bg-green-700 text-white">Done</button>
          </div>
          <Field
            className="input text-sm rounded-full w-full border-gray-300  focus:outline-none"
            type="text"
            id="content"
            placeholder="Enter your comment ..."
            name="content"
          />
        </div>
      </Form>
    </Formik>
  );
};
