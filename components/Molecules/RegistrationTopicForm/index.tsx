import { Button, FormField, TitleFormField } from "@/components/Atoms";
import { useAuthContext } from "@/contexts/authContext";
import { ITopicObject } from "@/interface/topic";
import { Form, Formik } from "formik";
import { FC } from "react";

export interface IRegistrationTopicFormProps {}

export const RegistrationTopicForm: FC<IRegistrationTopicFormProps> = () => {
  const { user } = useAuthContext();
  return (
    <Formik
      initialValues={
        {
          title: "",
          type: "",
          technologies: [],
          memberQuantiy: 0,
          student: user,
          memberEmail: "",
          description: "",
        } as ITopicObject
      }
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
          className="text-lg uppercase text-green-600 font-medium mb-5"
          title="Registration of research topics"
        />
        <FormField
          placeholder="Ex: Build a website..."
          type="text"
          label="Name of research topic"
          nameField="title"
        />
        <div className="flex justify-between w-full gap-3">
          <FormField
            placeholder="Ex: Website, Mobile, AI..."
            type="text"
            label="Type"
            nameField="typeTopic"
          />
          <FormField
            placeholder="Ex: C#, Python, Java..."
            type="text"
            label="Programming language"
            nameField="languages"
          />
          <FormField
            placeholder="Ex: 2"
            type="number"
            label="Number of team member"
            nameField="quantity"
          />
        </div>
        <FormField
          placeholder="Ex: nameb1910xxx@student.ctu.edu.vn"
          type="text"
          label="Email member"
          nameField="nameDual"
        />
        <FormField type="text" label="Description" nameField="description" />
        <div className="flex justify-end items-center">
          <Button
            type="button"
            title="Cancel"
            className="bg-transparent border-none hover:border-none hover:bg-transparent"
          />
          <Button
            type="submit"
            title="Confirm"
            className="hover:bg-[#165b31] bg-[#018937] text-white px-5"
          />
        </div>
      </Form>
    </Formik>
  );
};
