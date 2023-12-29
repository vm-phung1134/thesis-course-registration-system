/* eslint-disable @next/next/no-img-element */
import { Breadcrumb, SnipperRound } from "@/components/Atoms";
import { AdminTemplate } from "@/components/Templates";
import { useState, useEffect } from "react";
import { IBreadcrumbItem } from "@/components/Atoms";

export const BREADCRUMB_TOPIC_RESEARCH_ADMIN: IBreadcrumbItem[] = [
  {
    id: "1",
    href: "/",
    title: "TCR System",
  },
  {
    id: "2",
    href: "/admin",
    title: "Admin",
  },
  {
    id: "3",
    href: "/admin/alumnus",
    title: "Alumnus",
  },
  {
    id: "4",
    href: "/admin/alumnus/topic-research",
    title: "Topic research",
  },
];

function TopicResearchPageAdmin() {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <AdminTemplate title="Alumnus | Thesis course registration system">
      {loading ? (
        <SnipperRound />
      ) : (
        <>
          <div className="mt-5">
            <Breadcrumb dataBreadcrumb={BREADCRUMB_TOPIC_RESEARCH_ADMIN} />
            <div className="my-3 py-2 flex gap-2 items-center">
              <h4 className="text-xl capitalize text-green-700 font-medium ">
                Topic <span className="text-green-700"> Research</span>
              </h4>
              <div className="flex-grow h-[0.5px] bg-green-700"></div>
            </div>
          </div>
        </>
      )}
    </AdminTemplate>
  );
}

export default TopicResearchPageAdmin;
