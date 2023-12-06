import { Button, CountInput } from "@/components/Atoms";
import { Form, Formik } from "formik";
import { FC } from "react";

interface ISettingScheduleProps {}

export const SettingSchedule: FC<ISettingScheduleProps> = ({}) => {
  return (
    <Formik
      initialValues={{}}
      validate={(values) => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          console.log(values);
        }, 400);
      }}
    >
      {(formik) => {
        const { values } = formik;
        return (
          <>
            <Form>
              <div className="flex gap-5">
                <div className="flex flex-col flex-grow gap-5 rounded-2xl border shadow-md p-5">
                  <h5 className="font-medium text-sm">
                    Student schedule settings
                  </h5>
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-5">
                      <h6 className="text-gray-500 text-sm">
                        Date defense:{" "}
                        <span className="text-black">{`Monday - Saturday (except Sundays and holidays)`}</span>
                      </h6>
                      <h6 className="text-gray-500 text-sm">
                        Time defense:{" "}
                        <span className="text-black">40 minutes</span>
                      </h6>
                      <h6 className="text-gray-500 text-sm flex gap-5">
                        <p>Shift time:</p>
                        <span className="text-black">7:00 AM - 11:30 AM</span>
                        <span className="text-black">13:30 AM - 17:30 AM</span>
                      </h6>
                    </div>
                    <div>
                      <div className="flex gap-10">
                        <div className="w-60 flex-grow">
                          <CountInput
                            className="font-normal h-8 w-40"
                            label="Quantity students for Mor-shift"
                            valueNumber={0}
                            onChange={function (newValue: number): void {
                              throw new Error("Function not implemented.");
                            }}
                            limit={0}
                          />
                        </div>
                        <div className="w-60 flex-grow">
                          <CountInput
                            className="font-normal h-8 w-40"
                            label="Quantity students for After-shift"
                            valueNumber={0}
                            onChange={function (newValue: number): void {
                              throw new Error("Function not implemented.");
                            }}
                            limit={0}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col flex-grow gap-5 rounded-2xl border shadow-md p-5">
                  <h5 className="font-medium text-sm">
                    Thesis committed settings
                  </h5>
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-5">
                      <h6 className="text-gray-500 text-sm flex gap-5">
                        <p>Shift time:</p>
                        <span className="text-black">7:00 AM - 11:30 AM</span>
                        <span className="text-black">13:30 AM - 17:30 AM</span>
                      </h6>
                      <h6 className="text-gray-500 text-sm flex gap-5">
                        <p>Room:</p>
                        <span className="text-black">
                          Same at the time / 2 rooms
                        </span>
                      </h6>
                    </div>
                    <div>
                      <div className="flex gap-10">
                        <div className="w-60 flex-grow">
                          <CountInput
                            className="font-normal h-8 w-40"
                            label="QL. Council members"
                            valueNumber={0}
                            onChange={function (newValue: number): void {
                              throw new Error("Function not implemented.");
                            }}
                            limit={0}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end w-full mt-5">
                <Button
                  title="Save changes"
                  className="px-10 rounded-lg bg-green-700 text-white"
                />
              </div>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};
