import Link from "next/link";
import { FC } from "react";

export interface IBreadcrumbItem {
  id: string;
  title: string;
  href: string;
}

export interface IBreadcrumbProps {
  dataBreadcrumb: IBreadcrumbItem[];
}

export const Breadcrumb: FC<IBreadcrumbProps> = ({ dataBreadcrumb }) => {
  return (
    <div className="text-[13px] breadcrumbs mt-2 tracking-wider">
      <ul>
        {dataBreadcrumb?.map((item, index) => {
          return (
            <li key={item.id}>
              <Link href={item.href}>{item?.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
