import { Button, NormalAvatar, SnipperRound } from "@/components/Atoms";
import { InforUserFormV2, UploadFinalFileForm } from "@/components/Molecules";
import { EnrollSuccess } from "@/components/Organisms/MemberState/EnrollSuccess";
import { MainboardTemplate } from "@/components/Templates";
import { INITIATE_MEMBER, INITIATE_UPLOAD_REPORT } from "@/data";
import { useUserCookies } from "@/hooks/useCookies";
import { IMemberObject } from "@/interface/member";
import { ICouncilDef } from "@/interface/schedule";
import { IUploadReportObject } from "@/interface/upload";
import { getMember, updateMember } from "@/redux/reducer/member/api";
import { getScheduleForStudent } from "@/redux/reducer/schedule-def/api";
import { getUploadReport } from "@/redux/reducer/upload-def/api";
import { useAppDispatch } from "@/redux/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState, useEffect } from "react";

function EnrollStudentPage() {
  const [switchingForm, setSwitchingForm] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [user] = useUserCookies();
  const { data: member } = useQuery<IMemberObject>({
    queryKey: ["member", user],
    queryFn: async () => {
      const action = await dispatch(getMember(user));
      return action.payload || INITIATE_MEMBER;
    },
    initialData: INITIATE_MEMBER,
  });
  const { data: studentScheduled } = useQuery<ICouncilDef>({
    queryKey: ["studentScheduled", user.id],
    queryFn: async () => {
      const action = await dispatch(getScheduleForStudent(user.id));
      return action.payload || {};
    },
  });
  const updateMutation = useMutation(
    (postData: IMemberObject) => {
      return new Promise((resolve, reject) => {
        dispatch(updateMember(postData))
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
        queryClient.invalidateQueries(["member"]);
      },
    }
  );
  const handleEnrollMember = () => {
    updateMutation.mutate({ ...member, registerDefense: true });
  };

  // HANDLE FINAL UPLOAD
  const { data: uploadReport } = useQuery<IUploadReportObject>({
    queryKey: ["upload-def", user.id],
    queryFn: async () => {
      const action = await dispatch(getUploadReport(user.id));
      return action.payload || INITIATE_UPLOAD_REPORT;
    },
    initialData: INITIATE_UPLOAD_REPORT,
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);
  return (
    <MainboardTemplate title="Enroll & schedule | Thesis course registration system">
      {loading ? (
        <SnipperRound />
      ) : (
        <>
          {studentScheduled?.id ? (
            <>
              <div className="flex justify-center items-center my-12 gap-5">
                <Image
                  src="https://img.freepik.com/free-vector/design-inspiration-concept-illustration_114360-3957.jpg?w=740&t=st=1697188462~exp=1697189062~hmac=4107cde7d1b1bb3072f74a5d4614544b955a348d55322b833a1874440721b3dd"
                  alt="bg-create-class"
                  width="300"
                  height="300"
                  objectFit="cover"
                  objectPosition="center"
                />
                <div>
                  <h4 className="text-2xl font-bold">
                    Here is your schedule thesis defense
                    <span className="uppercase"> CT550/HK1-2023</span>
                  </h4>
                  <div className="w-[27rem]">
                    <h4 className="my-2 font-bold tracking-wider">
                      Upload your final files
                    </h4>
                    <UploadFinalFileForm uploadReport={uploadReport} />
                  </div>
                </div>
              </div>
              <div className="flex gap-4 w-full my-10">
                <div className="flex flex-grow w-10/12 text-sm p-5 flex-col gap-2 border rounded-xl">
                  <h5 className="text-lg text-green-700 font-bold capitalize tracking-wider">
                    The thesis committee
                  </h5>
                  <div className="grid grid-cols-3 gap-3">
                    {studentScheduled?.council?.map((lecturer, index) => (
                      <div key={lecturer?.id}>
                        <p className="text-gray-500">{`Examinator ${(index += 1)}`}</p>
                        <div className="flex items-center bg-slate-50 shadow-lg rounded-lg p-3 gap-3 my-2">
                          <NormalAvatar
                            setSize="w-10"
                            photoSrc={lecturer?.photoSrc}
                          />
                          <div className="flex flex-col">
                            <p className="font-medium capitalize">
                              {lecturer?.name}
                            </p>
                            <p className="text-sm">{lecturer?.email}</p>
                            <p className="text-sm">{lecturer?.major}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-grow p-5 flex-col gap-2 border rounded-xl w-fit">
                  <h5 className="text-lg text-green-700 font-bold capitalize tracking-wider">
                    Your schedule thesis defense
                  </h5>
                  <p className="font-thin text-xs italic text-orange-600">
                    Noticed: Please arrive at the room 10 minutes in advance to
                    prepare!!!
                  </p>
                  <ul className="capitalize flex flex-col gap-2 text-sm">
                    <li>
                      <p className="flex gap-3">
                        <span className="text-gray-500">Date:</span>
                        <span className="font-medium">
                          {
                            studentScheduled?.schedule?.timeSlots[0]?.timeSlot
                              .date
                          }
                        </span>
                      </p>
                    </li>
                    <li>
                      <p className="flex gap-3">
                        <span className="text-gray-500">Department:</span>
                        <span className="font-medium">
                          {
                            studentScheduled?.schedule?.timeSlots[0]?.student
                              ?.instructor?.class
                          }
                        </span>
                      </p>
                    </li>
                    <li className="flex gap-5">
                      <p className="flex gap-3">
                        <span className="text-gray-500">Room:</span>
                        <span className="font-medium">
                          {studentScheduled?.schedule?.room?.name}
                        </span>
                      </p>
                      <p className="flex gap-3">
                        <span className="text-gray-500">Time:</span>
                        <span className="font-medium">
                          {
                            studentScheduled?.schedule?.timeSlots[0]?.timeSlot
                              ?.time
                          }
                        </span>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="italic font-thin text-xs">
                Noticed: If you have any question or problems please directly
                send a request to system via under button
              </p>
              <div className="flex justify-start w-full">
                <Button
                  className="bg-green-700 btn-sm mt-2 rounded-lg text-white px-10"
                  title="Send request"
                />
              </div>
            </>
          ) : (
            <>
              {member?.registerDefense === true ? (
                <EnrollSuccess />
              ) : (
                <div className="grid grid-cols-2 h-full">
                  <div className="w-full mx-[-20px]">
                    <Image
                      src="https://tailwindcomponents.com/svg/secure-login-animate.svg"
                      alt="bg-create-class"
                      width="1000"
                      height="100"
                      className="-hue-rotate-[38deg] saturate-[.85]"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </div>
                  <div className="flex h-fit items-center">
                    <div className="p-5 w-[70%] mt-5 shadow-xl rounded-xl">
                      {switchingForm === 1 ? (
                        <InforUserFormV2
                          setSwitchingForm={setSwitchingForm}
                          switchingForm={switchingForm}
                        />
                      ) : (
                        <>
                          <h3 className="text-xs font-medium mb-3 text-green-700">
                            Step {switchingForm} of 2
                          </h3>
                          <div className="h-[50vh] flex flex-col gap-5 items-center justify-center">
                            <h3 className="uppercase text-green-700 font-bold">
                              Register thesis defense
                            </h3>
                            <h4 className="text-center font-medium">
                              Do you want to register for thesis defense?
                            </h4>
                            <p className="font-thin text-xs text-center px-5 italic">
                              {`(Noticed: You have to fullfill all of form before you
                      register thesis defense)`}
                            </p>
                            <div className="flex gap-5">
                              {switchingForm > 1 && (
                                <button
                                  onClick={() =>
                                    setSwitchingForm(switchingForm - 1)
                                  }
                                  type="button"
                                  className="bg-transparent btn rounded-none normal-case font-normal border-none hover:border-none hover:bg-transparent"
                                >
                                  Back
                                </button>
                              )}
                              <Button
                                otherType="subscribe"
                                handleActions={handleEnrollMember}
                                className="bg-green-700 text-white px-10 rounded-lg"
                                title="Enroll me"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </MainboardTemplate>
  );
}

export default EnrollStudentPage;
