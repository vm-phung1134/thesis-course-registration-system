import { FC, useState } from "react";
import { Form, Formik } from "formik";
import { Button, FormField } from "@/components/Atoms";
import { INITIATE_ROOM_DEF } from "@/data";
import { useAppDispatch } from "@/redux/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IRoomDefObject } from "@/interface/room";
import { createRoomDef } from "@/redux/reducer/room-def/api";
import { ModalConfirm } from "../..";
import classNames from "classnames";

export interface ICreateRoomFormProps {}

export const CreateRoomForm: FC<ICreateRoomFormProps> = ({}) => {
  const [openCreateRoom, setOpenCreateRoom] = useState<boolean>(false);
  const [valueRoom, setValueRoom] = useState<IRoomDefObject>(INITIATE_ROOM_DEF);
  const modalClassCreateRoom = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openCreateRoom,
  });
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const addMutation = useMutation(
    (postData: Omit<IRoomDefObject, "id">) => {
      return new Promise((resolve, reject) => {
        dispatch(createRoomDef(postData))
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

  const handleCreatRoomCouncil = () => {
    addMutation.mutate(valueRoom);
  };

  return (
    <Formik
      initialValues={INITIATE_ROOM_DEF}
      validate={(values) => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          setOpenCreateRoom(!openCreateRoom);
          setValueRoom(values);
          console.log(values);
        }, 400);
      }}
    >
      {(formik) => {
        const { values } = formik;
        return (
          <>
            {" "}
            <Form>
              <h4 className="text-xl font-bold mb-5">
                Create new Room council
              </h4>
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
              <p className="text-xs font-thin italic tracking-wide">
                Noticed: Adding a room to the assembly will be based on
                classroom schedule of the IT school
              </p>
              <div className="flex justify-end items-center mt-3">
                <Button
                  type="submit"
                  title="Create room"
                  className="hover:bg-[#165b31] rounded-xl normal-case bg-green-700 text-white px-10"
                />
              </div>
            </Form>
            <ModalConfirm
              typeButton="subscribe"
              modalClass={modalClassCreateRoom}
              setOpenModal={setOpenCreateRoom}
              openModal={openCreateRoom}
              action={handleCreatRoomCouncil}
              title="Message!!!"
              message="Do you want to create this room"
              underMessage="None"
            />
          </>
        );
      }}
    </Formik>
  );
};
