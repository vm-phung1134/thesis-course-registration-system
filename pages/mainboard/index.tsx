import { useState, useEffect } from "react";
import { MainboardTemplate } from "@/components/Templates";
import { Spinner } from "@/components/Atoms";
import {
  NoSubscribeView,
  UnSubscribeView,
  WaitingView,
} from "@/components/Organisms";
import { useSubscribeStateContext } from "@/contexts/subscribeState";

function MainboardPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const { subscribeState } = useSubscribeStateContext();
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
