import { FC, useState } from "react";
import { Form, Formik } from "formik";
import { Button, FormField } from "@/components/Atoms";
import { INITIATE_ROOM_DEF } from "@/data";
import { useAppDispatch } from "@/redux/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IRoomDefObject } from "@/interface/room";
import { updateRoomDef } from "@/redux/reducer/room-def/api";
import useToastifyMessage from "@/hooks/useToastify";

export interface IEditRoomFormProps {
  room: IRoomDefObject;
  setToggleForm?: React.Dispatch<React.SetStateAction<boolean>>;
  toggleForm?: boolean;
}

export const EditRoomForm: FC<IEditRoomFormProps> = ({
  room,
  setToggleForm,
  toggleForm,
}) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const updateMutation = useMutation(
    (postData: IRoomDefObject) => {
      return new Promise((resolve, reject) => {
        dispatch(updateRoomDef(postData))
          .unwrap()
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["room-defs"]);
      },
    }
  );

  useToastifyMessage(updateMutation, "Update room defense was successfully");

  return (
    <Formik
      initialValues={room}
      enableReinitialize
      validate={(values) => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          updateMutation.mutate(values);
          setToggleForm?.(!toggleForm);
        }, 400);
      }}
    >
      {(formik) => {
        const { values } = formik;
        return (
          <>
            <Form>
              <h4 className="text-xl font-bold mb-5">Edit Room council</h4>
              <div className="flex gap-5">
                <FormField
                  label="Name room"
                  type="text"
                  nameField="name"
                  className="rounded-xl bg-slate-100 border-none"
                  placeholder="Ex: CT550/HK1-2023"
                  value={values.name}
                />
                <FormField
                  label="Type"
                  type="text"
                  className="rounded-xl bg-slate-100 border-none"
                  nameField="type"
                  value={values.type}
                />
              </div>
              <FormField
                label="Department"
                type="text"
                nameField="school"
                className="rounded-xl bg-slate-100 border-none"
                value={values.school}
              />
              <FormField
                label="Description"
                type="text"
                className="rounded-xl bg-slate-100 border-none"
                nameField="description"
                value={values.description || ""}
              />
              <div className="flex justify-end items-center mt-3">
                <Button
                  setToggle={setToggleForm}
                  toggle={toggleForm}
                  type="button"
                  title="Cancel"
                  className="bg-transparent border-none hover:border-none hover:bg-transparent"
                />
                <Button
                  type="submit"
                  title="Save Changes"
                  className="hover:bg-[#165b31] rounded-xl normal-case bg-green-700 text-white px-10"
                />
              </div>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};
