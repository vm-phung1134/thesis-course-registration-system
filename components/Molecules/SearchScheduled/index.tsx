import { Field, Form, Formik } from "formik";
import { FC } from "react";

export interface ISearchScheduledFormProps {}

export const SearchScheduledForm: FC<ISearchScheduledFormProps> = ({}) => {
  return (
    <Formik
      initialValues={{ search: "" }}
      enableReinitialize
      validate={(values) => {}}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          setSubmitting(false);
        }, 400);
      }}
    >
      {(formik) => {
        const { values } = formik;
        return (
          <Form>
            <div className="flex border w-80 px-3 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-5 flex-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <Field
                value={values.search}
                placeholder="Filter scheduled..."
                type="text"
                id="search"
                className="input dark:bg-black h-10 text-[15px] focus:outline-none placeholder:font-thin rounded-none flex-1"
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
