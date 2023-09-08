import {
  Button,
  FormField,
  SelectBox,
  TitleFormField,
} from "@/components/Atoms";
import { ICategoryObject } from "@/interface/category";
import { IOptionItem } from "@/interface/filter";
import { Form, Formik } from "formik";
import { FC, useState } from "react";

export interface ICreatePostFormProps {
  setToggleForm: React.Dispatch<React.SetStateAction<boolean>>;
  toggleForm: boolean;
  setSelected: React.Dispatch<
    React.SetStateAction<IOptionItem | ICategoryObject>
  >;
  selected: IOptionItem | ICategoryObject;
  options: IOptionItem[] | ICategoryObject[];
}
export const CreatePostForm: FC<ICreatePostFormProps> = ({
  setToggleForm,
  toggleForm,
  selected,
  setSelected,
  options,
}) => {
  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        stage: "",
        file: "",
        type: "exercise",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.title) {
        }
        if (!values.description) {
        }
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
        <div className="flex justify-between items-center">
          <TitleFormField
            className="font-medium uppercase text-green-700 text-lg mb-5"
            title="Create new notification"
          />
          <div className="w-40">
            <SelectBox
              setSelected={setSelected}
              selected={selected}
              options={options}
            />
          </div>
        </div>
        <FormField
          placeholder="Ex: Report progress"
          type="text"
          label="Post title"
          nameField="title"
        />
        <FormField type="text" label="Description" nameField="description" />
        <div className="border h-20 w-full cursor-pointer border-dashed border-gray-400">
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-600 text-sm">Upload additional file</p>
          </div>
          <input type="file" accept="image/*" id="file" name="file" hidden />
        </div>
        <small className="text-gray-500">
          Noticed ! File size of your document should not exceed 10MB
        </small>
        <div className="flex justify-end items-center">
          <Button
            setToggle={setToggleForm}
            toggle={toggleForm}
            type="button"
            title="Cancel"
            className="bg-transparent border-none hover:border-none hover:bg-transparent"
          />
          <Button
            type="submit"
            title="Submit"
            className="hover:bg-[#165b31] bg-[#018937] text-white"
          />
        </div>
      </Form>
    </Formik>
  );
};
