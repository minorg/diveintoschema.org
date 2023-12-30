import {PropsWithChildren} from "react";

export default function MainLayout({children}: PropsWithChildren<object>) {
  return <div className="sm:px-4 md:px-8 lg:px-16 py-4">{children}</div>;
}
