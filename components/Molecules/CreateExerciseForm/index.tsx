import {
  Button,
  FormField,
  SelectBox,
  SelectInForm,
  TitleFormField,
} from "@/components/Atoms";
import { INITIATE_CATEGORY, INITIATE_EXERCISE } from "@/data";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { useSelectStage } from "@/hooks/useSelectStage";
import { ICategoryObject } from "@/interface/category";
import { IClassroomObject } from "@/interface/classroom";
import { IExerciseObject } from "@/interface/exercise";
import { IOptionItem } from "@/interface/filter";
import { createExercise } from "@/redux/reducer/exercise/api";
import { useAppDispatch } from "@/redux/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import Image from "next/image";
import { FC, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
const objectId = uuidv4();

export interface ICreateExerciseFormProps {
  setToggleForm: React.Dispatch<React.SetStateAction<boolean>>;
  toggleForm: boolean;
  setSelected: React.Dispatch<
    React.SetStateAction<IOptionItem | ICategoryObject>
  >;
  selected: IOptionItem | ICategoryObject;
  options: IOptionItem[] | ICategoryObject[];
  classroom: IClassroomObject;
}
export const CreateExerciseForm: FC<ICreateExerciseFormProps> = ({
  setToggleForm,
  toggleForm,
  selected,
  setSelected,
  options,
  classroom,
}) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const initialValues: IExerciseObject = INITIATE_EXERCISE;
  const { currentUser } = useCurrentUser();
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
  const addMutation = useMutation(
    (postData: IExerciseObject) => {
      return new Promise((resolve, reject) => {
        dispatch(createExercise(postData))
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
        queryClient.invalidateQueries(["exercises"]);
      },
    }
  );
  return (
    <Formik
      initialValues={initialValues}
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
          addMutation.mutate({
            ...values,
            type: "exercise",
            uid: objectId,
            classroom: classroom,
            category: selectedStage,
            attachments: selectedFiles,
            lecturer: currentUser,
          });
          resetForm();
          setSelectedFiles([]);
          setSelectedStage(INITIATE_CATEGORY);
          setSubmitting(false);
          setToggleForm(!toggleForm)
        }, 400);
      }}
    >
      {(formik) => {
        const { values } = formik;
        return (
          <Form>
            <div className="flex justify-between items-center">
              <h4 className="text-xl font-bold mb-5">
                Create new report stage
              </h4>
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
                type="date"
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
                title="Create exercise"
                className="hover:bg-[#165b31] rounded-lg bg-green-700 text-white"
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
