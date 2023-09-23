import { useState, useEffect } from "react";
import { MainboardTemplate } from "@/components/Templates";
import { Spinner } from "@/components/Atoms";
import {
  NoSubscribeView,
  UnSubscribeView,
  WaitingView,
} from "@/components/Organisms";
import { useQuery } from "@tanstack/react-query";
import { checkStateSubscribe } from "@/redux/reducer/auth/api";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { useAppDispatch } from "@/redux/store";
import { IMemberObject } from "@/interface/member";
import { INITIATE_AUTH, INITIATE_COURSE } from "@/data";
import { deleteRequirement } from "@/redux/reducer/requirement/api";
import { useSubscribeStateContext } from "@/contexts/subscribeState";

function MainboardPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { subscribeState } = useSubscribeStateContext();

  const handleUnScribeClass = (requirement: IMemberObject) => {
    dispatch(deleteRequirement(requirement));
  };

  useEffect(() => {
    setLoading(true);
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
          {subscribeState?.status === "NO_SUBSCRIBE" && <NoSubscribeView />}
          {subscribeState?.status === "WAITING" && (
            <WaitingView classroom={subscribeState?.classroom} />
          )}
          {subscribeState?.status === "UN_SUBSCRIBE" && (
            <UnSubscribeView classroom={subscribeState?.classroom} />
          )}
        </MainboardTemplate>
      )}
    </>
  );
}

export default MainboardPage;
