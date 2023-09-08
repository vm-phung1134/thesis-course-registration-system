import { useState, useEffect } from "react";
import { MainboardTemplate } from "@/components/Templates";
import { Breadcrumb, Spinner } from "@/components/Atoms";
import { BREADCRUMB_COMPLETED_TASKS } from "./mock-data";

function CriticalTasks() {
  const [loading, setLoading] = useState<boolean>(false);

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
          <Breadcrumb dataBreadcrumb={BREADCRUMB_COMPLETED_TASKS} />
        </MainboardTemplate>
      )}
    </>
  );
}

export default CriticalTasks;
