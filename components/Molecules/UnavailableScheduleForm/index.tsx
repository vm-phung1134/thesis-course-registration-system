import { Button, FormField } from "@/components/Atoms";
import { useCurrentUserContext } from "@/contexts/currentUserContext";
import { INITIATE_UNAVAIABLE_SCHEDULE_ITEM } from "@/data";
import { IUnavailableDate } from "@/interface/unavaiableDate";
import { createUnavaiableDate } from "@/redux/reducer/unavailable-date/api";
import { useAppDispatch } from "@/redux/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { FC } from "react";
export interface IUnavailableFormProps {}
import { v4 as uuidv4 } from "uuid";

export const UnavailableForm: FC<IUnavailableFormProps> = ({}) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { currentUser } = useCurrentUserContext();
  const addMutation = useMutation(
    (postData: IUnavailableDate) => {
      return new Promise((resolve, reject) => {
        dispatch(createUnavaiableDate(postData))
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
        queryClient.invalidateQueries(["unavailable-date"]);
      },
    }
  );
  const objectId = uuidv4();
  return (
    <Formik
      initialValues={INITIATE_UNAVAIABLE_SCHEDULE_ITEM}
      enableReinitialize
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          addMutation.mutate({
            lecturer: currentUser,
            schedules: [
              { id: objectId, date: values.date, reason: values.reason },
            ],
          });
          resetForm()
        }, 500);
      }}
    >
      {(formik) => {
        const { values } = formik;
        return (
          <>
            <Form>
              <h4 className="text-xl font-bold mb-5">
                Unavaible Schedule for lecturer
              </h4>
              <FormField
                type="date"
                label="Date"
                nameField="date"
                className="rounded-xl bg-slate-100 border-none"
                placeholder="Ex: DI19VXXX"
                value={values.date}
              />
              <FormField
                type="text"
                label="Reason"
                nameField="reason"
                placeholder="Ex: I have a work schedule ..."
                className="rounded-xl bg-slate-100 border-none"
                value={values.reason}
              />
              <div className="flex justify-end items-center">
                <Button
                  type="button"
                  title="Cancel"
                  className="bg-transparent border-none hover:border-none hover:bg-transparent"
                />
                <Button
                  type="submit"
                  title="Add Unavailable date"
                  className="bg-green-700 rounded-md btn-sm hover:bg-green-600 text-white px-8"
                />
              </div>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};
