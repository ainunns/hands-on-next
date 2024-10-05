import * as React from "react";

export const metadata = {
  title: "Detail",
};

export default function DetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
