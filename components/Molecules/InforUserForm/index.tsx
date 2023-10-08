import { Button, FormField, TitleFormField } from "@/components/Atoms";
import { IAuthObject } from "@/interface/auth";
import { Form } from "formik";
import { FC } from "react";

export interface IInforUserFormProps {
  setToggleForm: React.Dispatch<React.SetStateAction<boolean>>;
  toggleForm: boolean;
  values: IAuthObject;
}

export const InforUserForm: FC<IInforUserFormProps> = ({
  setToggleForm,
  toggleForm,
  values,
}) => {
  return (
    <Form>
      <div className="bg-green-700 px-5 py-3 mb-3 flex items-center gap-3">
        <h4 className="uppercase text-white text-sm">Lecturer information</h4>
        <div className="flex-grow h-[1px] bg-white"></div>
      </div>
      <FormField
        type="text"
        label="Full name"
        nameField="name"
        placeholder="Ex: Nguyen Van Anh"
        value={values.name}
      />
      <FormField
        type="text"
        label="Email address"
        nameField="email"
        placeholder="Ex: Nameb1910xxx@student.ctu.edu.vn"
        value={values.email}
      />
      <div className="flex gap-5 w-full">
        <FormField
          type="text"
          label="Phone number"
          nameField="phone"
          value={values.phone || ""}
        />
        <FormField
          type="text"
          label="Class"
          nameField="class"
          placeholder="Ex: DI19VXXX"
          value={values.class || ""}
        />
      </div>
      <FormField
        type="text"
        label="Major"
        nameField="major"
        placeholder="Ex: Computer Sciented"
        value={values.major || ""}
      />
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
          title="Save"
          className="bg-[#165b31] hover:bg-green-700 text-white px-5"
        />
      </div>
    </Form>
  );
};
