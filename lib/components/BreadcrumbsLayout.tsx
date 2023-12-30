import {Fragment, PropsWithChildren, useMemo} from "react";
import Link from "./Link";
import {ChevronRightIcon} from "@heroicons/react/16/solid";
import Hrefs from "../Hrefs";

interface Breadcrumb {
  href?: string;
  text: string;
}

function BreadcrumbLink(breadcrumb: Breadcrumb) {
  if (!breadcrumb.href) {
    return <span>{breadcrumb.text}</span>;
  }
  return <Link href={breadcrumb.href}>{breadcrumb.text}</Link>;
}

export default function BreadcrumbsLayout({
  breadcrumbs,
  children,
}: PropsWithChildren<{
  breadcrumbs: readonly Breadcrumb[];
}>) {
  const breadcrumbsWithHome = useMemo(() => {
    return [
      {
        href: Hrefs.root,
        text: "Home",
      } as Breadcrumb,
    ].concat(breadcrumbs);
  }, [breadcrumbs]);

  return (
    <div className="flex flex-col gap-4">
      <nav aria-label="Breadcrumb" className="flex justify-center py-2 text-lg">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          {breadcrumbsWithHome.map((breadcrumb, breadcrumbI) => (
            <Fragment key={breadcrumbI}>
              <li className="inline-flex items-center">
                {BreadcrumbLink(breadcrumb)}
              </li>
              {breadcrumbI + 1 < breadcrumbsWithHome.length ? (
                <li>
                  <ChevronRightIcon className="h-4 w-4" />
                </li>
              ) : null}
            </Fragment>
          ))}
        </ol>
      </nav>
      {children}
    </div>
  );
}
