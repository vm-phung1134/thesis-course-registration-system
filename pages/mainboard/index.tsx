import { useState, useEffect } from "react";
import { MainboardTemplate } from "@/components/Templates";
import { Button, Spinner } from "@/components/Atoms";
import {
  NoSubscribeView,
  UnSubscribeView,
  WaitingView,
} from "@/components/Organisms";
import { useClassroomStateContext } from "@/contexts/authClassroomState";
import { ROLE_ASSIGNMENT } from "@/contexts/authContext";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import Image from "next/image";
import Link from "next/link";
import { STATE_AUTH_CLASSROOM, STATE_LECTURER_CLASSROOM } from "@/data";
import { useSubscribeStateContext } from "@/contexts/subscribeState";

function MainboardPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const { currentUser } = useCurrentUser();
  const { authClassroomState } = useClassroomStateContext();
  const {subscribeState} = useSubscribeStateContext()
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <MainboardTemplate title="Mainboard Thesis | Thesis course registration system">
          {subscribeState?.status ? (
            <>
              {/* GET UI FOR LECTURER ROLE */}
              {currentUser.role === ROLE_ASSIGNMENT.LECTURER && <NoSubscribeView />}
              {/* GET UI FOR STUDENT ROLE */}
              {currentUser.role === ROLE_ASSIGNMENT.STUDENT && (
                <>
                  {subscribeState?.status ===
                    STATE_AUTH_CLASSROOM.NO_SUB && <NoSubscribeView />}
                  {subscribeState?.status ===
                    STATE_AUTH_CLASSROOM.WAITING && (
                    <WaitingView classroom={subscribeState?.classroom} />
                  )}
                  {subscribeState?.status ===
                    STATE_AUTH_CLASSROOM.UN_SUB && (
                    <UnSubscribeView
                      classroom={subscribeState?.classroom}
                    />
                  )}
                </>
              )}
            </>
          ) : (
            <div className="h-[80%] w-full flex flex-col justify-center items-center">
              <Image
                src="https://yi-files.s3.eu-west-1.amazonaws.com/products/794000/794104/1354385-full.jpg"
                width="400"
                height="400"
                className="-hue-rotate-[38deg] saturate-[.85]"
                alt=""
              />
              <p className="py-5 text-gray-500 uppercase">
                Ops! There are currently no classrooms
              </p>
              <Link href="/manage-classroom">
                <Button
                  className="px-10 bg-green-700 text-white hover:bg-green-600"
                  title="Comming soon"
                />
              </Link>
            </div>
          )}
        </MainboardTemplate>
      )}
    </>
  );
}

export default MainboardPage;
