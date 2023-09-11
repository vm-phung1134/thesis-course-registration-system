import { FormField, TitleFormField } from "@/components/Atoms";
import { INITIATE_AUTH } from "@/data";
import { Form, Formik } from "formik";
import { FC } from "react";

export interface IInforUserFormV2Props {
  switchingForm: number;
  setSwitchingForm: React.Dispatch<React.SetStateAction<number>>;
}

export const InforUserFormV2: FC<IInforUserFormV2Props> = ({
  setSwitchingForm,
  switchingForm,
}) => {
  return (
    <Formik
      initialValues={INITIATE_AUTH}
      validate={(values) => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        <TitleFormField
          className="text-base uppercase text-green-700 font-medium mb-5"
          title="Update personal information"
        />
        <FormField type="text" label="Full name" nameField="name" />
        <FormField type="text" label="Email address" nameField="email" />
        <div className="flex gap-5 w-full">
          <FormField type="text" label="Phone number" nameField="phone" />
          <FormField type="text" label="Class" nameField="class" />
        </div>
        <FormField type="text" label="Major" nameField="major" />
        <div className="flex justify-end items-center">
          <button
            onClick={() => setSwitchingForm(switchingForm + 1)}
            type="submit"
            className="hover:bg-[#165b31] btn rounded-none font-normal normal-case w-28 bg-[#018937] text-white px-5"
          >
            Next step
          </button>
        </div>
      </Form>
    </Formik>
  );
};
