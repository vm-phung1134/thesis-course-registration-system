import { Button, SnipperRound } from "@/components/Atoms";
import { InforUserFormV2 } from "@/components/Molecules";
import { EnrollSuccess } from "@/components/Organisms/MemberState/EnrollSuccess";
import { MainboardTemplate } from "@/components/Templates";
import { INITIATE_MEMBER } from "@/data";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { IMemberObject } from "@/interface/member";
import { ICouncilDef } from "@/interface/schedule";
import { getMember, updateMember } from "@/redux/reducer/member/api";
import { getScheduleForStudent } from "@/redux/reducer/schedule-def/api";
import { useAppDispatch } from "@/redux/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState, useEffect } from "react";

function EnrollStudentPage() {
  const [switchingForm, setSwitchingForm] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { currentUser } = useCurrentUser();
  const { data: member } = useQuery<IMemberObject>({
    queryKey: ["member", currentUser],
    queryFn: async () => {
      const action = await dispatch(getMember(currentUser));
      return action.payload || [];
    },
    initialData: INITIATE_MEMBER,
  });
  const { data: studentScheduled } = useQuery<ICouncilDef>({
    queryKey: ["studentScheduled", currentUser.id],
    queryFn: async () => {
      const action = await dispatch(getScheduleForStudent(currentUser.id));
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
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);
  return (
    <MainboardTemplate title="Create classroom">
      {loading ? (
        <SnipperRound />
      ) : (
        <>
          {studentScheduled ? (
            <div className="flex gap-2 justify-center items-center min-h-[70%] max-h-full">
              <Image
                src="https://img.freepik.com/free-vector/design-inspiration-concept-illustration_114360-3957.jpg?w=740&t=st=1697188462~exp=1697189062~hmac=4107cde7d1b1bb3072f74a5d4614544b955a348d55322b833a1874440721b3dd"
                alt="bg-create-class"
                width="300"
                height="300"
                objectFit="cover"
                objectPosition="center"
              />
              <div className="flex gap-3 flex-col items-center">
                <h4 className="">
                  Here is your schedule thesis defense
                  <span className="uppercase font-medium"> CT550/HK1-2023</span>
                </h4>
                <div className="flex gap-5">
                  <div className="flex flex-grow px-5 py-2 flex-col gap-2">
                    <h5 className="text-sm uppercase text-green-700 font-medium">
                      Your time particular
                    </h5>
                    <ul className="capitalize text-sm flex flex-col gap-2">
                      <li>
                        <p>
                          <span className="text-gray-500">Date:</span>{" "}
                          {studentScheduled.schedule.timeSlots[0].timeSlot.date}
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className="text-gray-500">Department:</span>{" "}
                          {
                            studentScheduled.schedule.timeSlots[0].student
                              .instructor.class
                          }
                        </p>
                      </li>
                      <li className="flex gap-5">
                        <p>
                          <span className="text-gray-500">Room:</span>{" "}
                          {studentScheduled.schedule.room.name}
                        </p>
                        <p>
                          <span className="text-gray-500">Time:</span>{" "}
                          {studentScheduled.schedule.timeSlots[0].timeSlot.time}
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-grow px-5 py-2 flex-col gap-2">
                    <h5 className="text-sm uppercase text-green-700 font-medium">
                      The thesis committee
                    </h5>
                    {studentScheduled.council.map((lecturer, index) => (
                      <ul
                        key={lecturer.id}
                        className="capitalize text-sm flex flex-col gap-2"
                      >
                        <li>
                          <p>
                            <span className="text-gray-500">{`Examinator ${index+=1}:`}</span>{" "}
                            {lecturer.name}
                          </p>
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
                <p className="italic font-thin text-xs">
                  Noticed: If you have any question or problems please directly
                  send a request to system via under button
                </p>
                <div className="flex justify-end w-full">
                  <Button
                    className="bg-green-700 btn-sm mt-2 text-white px-10"
                    title="Send"
                  />
                </div>
              </div>
            </div>
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
                    <div className="p-5 w-[70%] mt-5 shadow-xl">
                      {switchingForm === 1 ? (
                        <InforUserFormV2
                          setSwitchingForm={setSwitchingForm}
                          switchingForm={switchingForm}
                        />
                      ) : (
                        <>
                          <h3 className="text-xs mb-3">
                            Step {switchingForm} of 2
                          </h3>
                          <div className="h-[50vh] flex flex-col gap-5 items-center justify-center">
                            <h3 className="uppercase text-sm text-green-700 font-medium">
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
                                className="bg-green-700 text-white px-10"
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
