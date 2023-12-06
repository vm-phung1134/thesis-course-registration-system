import { Button, FormField, SelectBox, SelectInForm } from "@/components/Atoms";
import { useClassroomStateContext } from "@/contexts/classroomState";
import { useCurrentUserContext } from "@/contexts/currentUserContext";
import { INITIATE_CATEGORY, INITIATE_EXERCISE_INPUT } from "@/data";
import { useMutationQueryAPI } from "@/hooks/useMutationAPI";
import { useSelectStage } from "@/hooks/useSelectStage";
import { ICategoryObject } from "@/interface/category";
import { IClassroomObject } from "@/interface/classroom";
import { IExerciseObject, IExerciseObjectInput } from "@/interface/exercise";
import { IOptionItem } from "@/interface/filter";
import { createExercise, updateExercise } from "@/redux/reducer/exercise/api";
import { Form, Formik } from "formik";
import Image from "next/image";
import { FC, useState, useRef } from "react";

export interface IEditExerciseFormProps {
  setToggleForm: React.Dispatch<React.SetStateAction<boolean>>;
  toggleForm: boolean;
  classroom: IClassroomObject;
  exercise: IExerciseObject;
}
export const EditExerciseForm: FC<IEditExerciseFormProps> = ({
  setToggleForm,
  toggleForm,
  classroom,
  exercise,
}) => {
  const initialValues: IExerciseObjectInput = INITIATE_EXERCISE_INPUT;
  const { currentUser } = useCurrentUserContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  // HANDLE SELECT STAGE REPORT
  const { selectedStage, setSelectedStage, reportStages } = useSelectStage();
  // HANDLE FILE
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };
  const updateMutation = useMutationQueryAPI({
    action: updateExercise,
    queryKeyLog: ["classroom-exercises"],
    successMsg: "You have just updated a reporting process!",
    errorMsg: "Fail to update a reporting process!",
  });
  return (
    <Formik
      initialValues={exercise}
      enableReinitialize
      validate={(values) => {
        const errors = {};
        if (!values.title) {
        }
        if (!values.description) {
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          updateMutation.mutate({
            id: values.id,
            title: values.title,
            description: values.description,
            deadline: values.deadline,
            classroomID: classroom.id,
            categoryID: selectedStage.id,
            attachments: selectedFiles,
            authorID: currentUser.id,
          });
          console.log({
            id: values.id,
            title: values.title,
            description: values.description,
            deadline: values.deadline,
            classroomID: classroom.id,
            categoryID: selectedStage.id,
            attachments: selectedFiles,
            authorID: currentUser.id,
          })
          resetForm();
          setSelectedFiles([]);
          setSelectedStage(INITIATE_CATEGORY);
          setSubmitting(false);
          setToggleForm(!toggleForm);
        }, 400);
      }}
    >
      {(formik) => {
        const { values } = formik;
        return (
          <Form>
            <h4 className="text-xl font-bold mb-5">Update report progress</h4>
            <FormField
              placeholder="Ex: Report progress"
              type="text"
              label="Post title"
              className="rounded-xl bg-slate-100 border-none"
              nameField="title"
              value={values?.title}
            />
            <div className="flex gap-5">
              <div className="w-full">
                <SelectInForm
                  title="Choose stage"
                  options={reportStages}
                  selectedStage={selectedStage}
                  setSelectedStage={setSelectedStage}
                />
              </div>
              <FormField
                type="datetime-local"
                label="Set Deadline"
                className="rounded-xl bg-slate-100 border-none"
                nameField="deadline"
                value={values.deadline}
              />
            </div>
            <FormField
              value={values.description}
              type="text"
              className="rounded-xl bg-slate-100 border-none"
              label="Description"
              nameField="description"
            />
            <div className="w-full h-fit border border-dashed py-5 mb-5 relative">
              <div className="flex gap-3 flex-col h-full w-full items-center justify-center">
                {selectedFiles.length > 0 ? (
                  <ul className="text-sm w-full flex flex-col gap-2 mb-5 font-medium px-2">
                    {selectedFiles.map((file) => (
                      <li
                        className="flex gap-3 text-blue-700 font-medium rounded-md items-center px-3 py-2 bg-slate-200 shadow-md"
                        key={file.name}
                      >
                        <Image
                          width={20}
                          height={20}
                          src={
                            "https://cdn-icons-png.flaticon.com/128/4725/4725970.png"
                          }
                          alt="icon-file-pdf"
                        />
                        <p className="truncate">{file.name}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p
                    className="text-sm flex gap-5 items-center font-thin cursor-pointer"
                    onClick={handleUploadClick}
                  >
                    <Image
                      width={40}
                      height={40}
                      src={
                        "https://cdn-icons-png.flaticon.com/128/179/179378.png"
                      }
                      alt="upload-file-icon"
                    />
                    <span className="font-medium text-gray-500">
                      Upload your files
                    </span>
                  </p>
                )}
                <input
                  type="file"
                  name="files"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple
                  hidden
                />
                <div className="w-full flex justify-end cursor-pointer">
                  {selectedFiles.length > 0 && (
                    <button
                      className="text-sm px-5 py-2 rounded-lg flex gap-3 "
                      onClick={handleUploadClick}
                    >
                      <Image
                        width={20}
                        height={20}
                        src={
                          "https://cdn-icons-png.flaticon.com/128/4903/4903802.png"
                        }
                        alt=""
                      />
                      <p className="font-medium tracking-wider">Add new file</p>
                    </button>
                  )}
                </div>
              </div>
            </div>
            <small className="text-gray-500 italic font-thin text-xs">
              Noticed ! File size of your document should not exceed 10MB
            </small>
            <div className="flex justify-end items-center">
              <Button
                setToggle={setToggleForm}
                toggle={toggleForm}
                type="button"
                title="Cancel"
                className="bg-transparent rounded-lg border-none hover:border-none hover:bg-transparent"
              />
              <Button
                type="submit"
                title="Save change"
                className="hover:bg-[#165b31] rounded-lg bg-green-700 text-white"
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
