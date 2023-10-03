import { useState, useEffect } from "react";
import { Spinner } from "@/components/Atoms";
import { AdminTemplate } from "@/components/Templates";

function DashboardPage() {
  const [loading, setLoading] = useState<boolean>(true);
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
        <AdminTemplate title="Admin dashboard | Thesis course registration system">
          
        </AdminTemplate>
      )}
    </>
  );
}

export default DashboardPage;
