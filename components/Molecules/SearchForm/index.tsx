import { Field, Form, Formik } from "formik";
import { FC } from "react";
import { useRouter } from "next/router";
import { useSearchContext } from "@/contexts/useSearchContext";

export interface ISearchFormProps {}

export const SearchForm: FC<ISearchFormProps> = ({}) => {
  const router = useRouter();
  const { setSearchValue } = useSearchContext();
  return (
    <Formik
      initialValues={{ search: "" }}
      enableReinitialize
      validate={(values) => {}}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          setSearchValue(values.search);
          router.push("/search");
          resetForm();
          setSubmitting(false);
        }, 400);
      }}
    >
      {(formik) => {
        const { values } = formik;
        return (
          <Form>
            <div className="flex border w-96 px-3 items-center rounded-full">
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
                placeholder="Search for anything..."
                type="text"
                id="search"
                className="input placeholder:text-gray-300 placeholder:text-sm placeholder:font-thin placeholder:tracking-wide rounded-full dark:bg-[#141E37] dark:text-[#dedede] h-10 text-[15px] focus:outline-none flex-1"
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
