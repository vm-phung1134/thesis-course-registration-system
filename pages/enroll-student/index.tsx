import { Button, SnipperRound } from "@/components/Atoms";
import { InforUserFormV2 } from "@/components/Molecules";
import { EnrollSuccess } from "@/components/Organisms/MemberState/EnrollSuccess";
import { MainboardTemplate } from "@/components/Templates";
import { INITIATE_MEMBER } from "@/data";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { IMemberObject } from "@/interface/member";
import { getMember } from "@/redux/reducer/member/api";
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
  console.log(member);
  // const updateMutation = useMutation(
  //   (postData: IMemberObject) => {
  //     return new Promise((resolve, reject) => {
  //       dispatch(updateMember(postData))
  //         .unwrap()
  //         .then((data) => {
  //           resolve(data);
  //         })
  //         .catch((error) => {
  //           reject(error);
  //         });
  //     });
  //   },
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["member"]);
  //     },
  //   }
  // );
  const handleEnrollMember = () => {
    console.log({ ...member, registerDefense: true });
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
    </MainboardTemplate>
  );
}

export default EnrollStudentPage;
