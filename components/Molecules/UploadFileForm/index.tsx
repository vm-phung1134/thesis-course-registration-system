import React, { FC, useRef, useState } from "react";
import { Form, Formik } from "formik";
import { Button } from "@/components/Atoms";
import { INITIATE_SUBMIT } from "@/data";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { IExerciseObject } from "@/interface/exercise";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ISubmitObject } from "@/interface/submit";
import { createSubmit } from "@/redux/reducer/submit/api";
import { useAppDispatch } from "@/redux/store";
import { v4 as uuidv4 } from "uuid";
const objectId = uuidv4();

interface IUploadFormProps {
  exercise: IExerciseObject;
  submit: ISubmitObject;
}

export const UploadFileForm: FC<IUploadFormProps> = ({ exercise, submit }) => {
  const fileInputRef = useRef<HTMLInputElement>(null!);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { currentUser } = useCurrentUser();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  const resetSelectedFiles = () => {
    setSelectedFiles([]);
    fileInputRef.current.value = "";
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const addMutation = useMutation(
    (postData: ISubmitObject) => {
      return new Promise((resolve, reject) => {
        dispatch(createSubmit(postData))
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
        queryClient.invalidateQueries(["submit"]);
      },
    }
  );

  return (
    <Formik
      initialValues={INITIATE_SUBMIT}
      validate={(values) => {
        let errors: any = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          addMutation.mutate({
            exerciseId: exercise.uid,
            student: currentUser,
            attachments: selectedFiles,
            uid: objectId,
            status: "submited",
          });
          resetSelectedFiles();
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ setFieldValue }) => (
        <Form>
          <div className="w-full h-fit border rounded-xl border-dashed py-5 mb-5 relative">
            <div className="flex gap-3 flex-col h-full w-full items-center justify-center">
              {submit.status ? (
                // GET FILE HAS BEEN SUBMITED
                <div className="w-full">
                  <ul className="text-sm w-full flex flex-col gap-2 mb-10 font-medium px-2">
                    {submit?.attachments.map((file) => (
                      <li
                        className="bg-slate-100 rounded-lg flex gap-5 items-center px-5 py-1"
                        key={file.id}
                      >
                        <i className="fa-regular fa-file-word"></i>
                        <a target="_blank" href={file.src} className="truncate">
                          {file.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : // UPLOAD FORM
              selectedFiles.length > 0 ? (
                <ul className="text-sm w-full flex flex-col gap-2 mb-10 font-medium px-2">
                  {selectedFiles.map((file) => (
                    <li
                      className="border flex gap-5 items-center px-5 py-1"
                      key={file.name}
                    >
                      <i className="fa-regular fa-file-word"></i>
                      <p className="truncate">{file.name}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p
                  className="text-sm flex gap-5 items-center font-thin cursor-pointer"
                  onClick={handleUploadClick}
                >
                  <i className="fa-solid fa-upload"></i>
                  <span>Choose your files</span>
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
              <div className="w-full absolute bottom-0 cursor-pointer">
                {selectedFiles.length > 0 && (
                  <button
                    className="text-sm font-thin border border-gray-400 w-full py-1 px-5"
                    onClick={handleUploadClick}
                  >
                    + Add another file
                  </button>
                )}
              </div>
            </div>
          </div>
          {submit.status ? (
            <Button
              type="button"
              className="rounded-lg hover:bg-green-600 w-full my-5 bg-green-700 text-white"
              title="Cancel"
            />
          ) : (
            <Button
              type="submit"
              className="rounded-lg hover:bg-green-600 w-full my-5 bg-green-700 text-white"
              title="Submit your report"
            />
          )}
        </Form>
      )}
    </Formik>
  );
};
