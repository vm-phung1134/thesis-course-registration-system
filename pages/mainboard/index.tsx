import { useState, useEffect } from "react";
import { MainboardTemplate } from "@/components/Templates";
import { Spinner } from "@/components/Atoms";
import {
  NoSubscribeView,
  UnSubscribeView,
  WaitingView,
} from "@/components/Organisms";
import { useClassroomStateContext } from "@/contexts/authClassroomState";
import { ROLE_ASSIGNMENT } from "@/contexts/authContext";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";

function MainboardPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const {currentUser} = useCurrentUser();
  const { authClassroomState } = useClassroomStateContext();
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
          {currentUser.role === ROLE_ASSIGNMENT.LECTURER ? (
            <>
              {authClassroomState?.status === "UNLOCK" && <NoSubscribeView />}
            </>
          ) : (
            <>
              {authClassroomState?.status === "NO_SUBSCRIBE" && (
                <NoSubscribeView />
              )}
              {authClassroomState?.status === "WAITING" && (
                <WaitingView classroom={authClassroomState?.classroom} />
              )}
              {authClassroomState?.status === "UN_SUBSCRIBE" && (
                <UnSubscribeView classroom={authClassroomState?.classroom} />
              )}
            </>
          )}
        </MainboardTemplate>
      )}
    </>
  );
}

export default MainboardPage;
