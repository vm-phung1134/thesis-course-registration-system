import { useState, useEffect } from "react";
import { MainboardTemplate } from "@/components/Templates";
import { Breadcrumb, SnipperRound } from "@/components/Atoms";
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
      <MainboardTemplate title="Task completed | Thesis course registration system">
        {loading ? (
          <SnipperRound />
        ) : (
          <Breadcrumb dataBreadcrumb={BREADCRUMB_COMPLETED_TASKS} />
        )}
      </MainboardTemplate>
    </>
  );
}

export default CriticalTasks;
