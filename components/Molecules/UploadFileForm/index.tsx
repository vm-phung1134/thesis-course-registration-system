import React, { FC, useRef, useState } from "react";
import { Form, Formik } from "formik";
import { Button } from "@/components/Atoms";
import { INITIATE_SUBMIT } from "@/data";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { IExerciseObject } from "@/interface/exercise";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ISubmitObject } from "@/interface/submit";
import { createSubmit, deleteSubmit } from "@/redux/reducer/submit/api";
import { useAppDispatch } from "@/redux/store";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import classNames from "classnames";
import { ModalConfirm } from "..";
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
        queryClient.invalidateQueries(["submit-exercise"]);
      },
    }
  );
  const [openDelSubmitted, setOpenDelSubmitted] = useState<boolean>(false);
  const modalClassDelSubmitted = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openDelSubmitted,
  });
  const deleteMutation = useMutation(
    (postData: ISubmitObject) => {
      return dispatch(deleteSubmit(postData));
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["submit-exercise"]);
      },
    }
  );

  const handleUnsubmitted = () => {
    deleteMutation.mutate(submit);
  };
  return (
    <>
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
          }, 400);
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="w-full h-fit border rounded-xl border-dashed py-5 mb-5 relative">
              <div className="flex gap-3 flex-col h-full w-full items-center justify-center">
                {submit.status !== "" ? (
                  // GET FILE HAS BEEN SUBMITED
                  <div className="w-full">
                    <ul className="text-sm w-full flex flex-col gap-2 mb-10 font-medium px-2">
                      {submit?.attachments?.map((file) => (
                        <div
                          key={file.id}
                          className="flex gap-3 text-blue-700 font-medium rounded-md items-center px-3 py-2 bg-slate-200 shadow-md"
                        >
                          <Image
                            width={20}
                            height={20}
                            src={
                              "https://cdn-icons-png.flaticon.com/128/4725/4725970.png"
                            }
                            alt="icon-file-pdf"
                          />
                          <a
                            className="text-[13px] truncate"
                            target="_blank"
                            href={file.src}
                          >
                            {file.name}
                          </a>
                        </div>
                      ))}
                    </ul>
                  </div>
                ) : // UPLOAD FORM
                selectedFiles.length > 0 ? (
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
                      className="text-sm px-5 rounded-lg flex gap-3 "
                      onClick={handleUploadClick}
                    >
                      <Image
                        width={15}
                        height={15}
                        src={
                          "https://cdn-icons-png.flaticon.com/128/4903/4903802.png"
                        }
                        alt=""
                      />
                      <p className="font-medium text-xs tracking-wider">
                        Add new file
                      </p>
                    </button>
                  )}
                </div>
              </div>
            </div>
            {submit.status !== "" ? (
              <>
                {deleteMutation.isLoading ? (
                  <Button
                    type="button"
                    className="rounded-lg hover:bg-green-600 w-full normal-case bg-green-700 text-white"
                    title="Loading ..."
                  />
                ) : (
                  <Button
                    type="button"
                    otherType="subscribe"
                    toggle={openDelSubmitted}
                    setToggle={setOpenDelSubmitted}
                    className="rounded-lg hover:bg-green-600 w-full normal-case bg-green-700 text-white"
                    title="Cancel submit"
                  />
                )}
              </>
            ) : (
              <>
                {addMutation.isLoading ? (
                  <Button
                    type="button"
                    className="rounded-lg hover:bg-green-600 w-full my-5 bg-green-700 text-white"
                    title="Loading ..."
                  />
                ) : (
                  <Button
                    type="submit"
                    className="rounded-lg hover:bg-green-600 w-full my-5 bg-green-700 text-white"
                    title="Submit your report"
                  />
                )}
              </>
            )}
          </Form>
        )}
      </Formik>
      <ModalConfirm
        modalClass={modalClassDelSubmitted}
        setOpenModal={setOpenDelSubmitted}
        openModal={openDelSubmitted}
        action={handleUnsubmitted}
        typeButton="subscribe"
        underMessage=""
        title="Message!!!"
        message="Are you sure that you want to unsubmit this exercise?"
      />
    </>
  );
};
