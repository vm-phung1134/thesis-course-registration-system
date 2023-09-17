import { useState, useEffect } from "react";
import { MainboardTemplate } from "@/components/Templates";
import { Spinner } from "@/components/Atoms";
import { NoSubscribeView, UnSubscribeView, WaitingView } from "@/components/Organisms";

function MainboardPage() {
  const [loading, setLoading] = useState<boolean>(false);
  //const KEY_STATUS = "NO_SUBSCRIBE"
  const KEY_STATUS = "WAITING"
  // const KEY_STATUS = "UN_SUBSCRIBE"
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
          {/* {
            KEY_STATUS === "NO_SUBSCRIBE" && <NoSubscribeView />
          } */}
          {
            KEY_STATUS === "WAITING" && <WaitingView />
          }
          {/* {
            KEY_STATUS === "UN_SUBSCRIBE" && <UnSubscribeView />
          } */}
        </MainboardTemplate>
      )}
    </>
  );
}

export default MainboardPage;
