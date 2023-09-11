import {
  Button,
  CheckBoxField,
  FormField,
  SelectBox,
  TitleFormField,
} from "@/components/Atoms";
import { Field, Form, Formik } from "formik";
import { FC } from "react";

export interface ICreateClassroomFormProps {
  switchingForm: number;
  setSwitchingForm: React.Dispatch<React.SetStateAction<number>>;
}

export const CreateClassroomForm: FC<ICreateClassroomFormProps> = ({
  setSwitchingForm,
  switchingForm,
}) => {
  return (
    <Formik
      initialValues={{}}
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
          title="Create your classroom"
        />
        <FormField
          placeholder="Ex: Le Huynh Quoc Bao"
          type="text"
          label="Name class"
          nameField="name"
        />
        <div className="flex gap-3">
          <FormField
            type="number"
            label="Quantity members"
            nameField="quantity"
          />
          <FormField
            placeholder="Ex: jhkldop"
            type="text"
            label="Code classroom"
            nameField="quantity"
          />
        </div>
        <div className="mb-4">
          <SelectBox
            setPadding="lg"
            options={[]}
            selected={{ value: "", label: "" }}
            setSelected={() => {}}
          />
        </div>
        <CheckBoxField
          title="I accept the Terms and Conditions"
          nameField="checkedTerm"
        />
        <CheckBoxField
          title="I accept the Private policy"
          nameField="checkedPolicy"
        />
        <div className="flex justify-end items-center">
          {switchingForm > 1 && (
            <button
              onClick={() => setSwitchingForm(switchingForm - 1)}
              type="button"
              className="bg-transparent btn rounded-none normal-case font-normal border-none hover:border-none hover:bg-transparent"
            >
              Back
            </button>
          )}
          <Button
            type="submit"
            title="Next step"
            className="hover:bg-[#165b31] normal-case w-28 bg-[#018937] text-white px-5"
          />
        </div>
      </Form>
    </Formik>
  );
};
