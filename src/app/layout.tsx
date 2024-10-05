import * as React from "react";
import "../styles/globals.css";
import Providers from "@/app/providers";

export const metadata = {
  title: "Contact Apps",
  description: "Contact Management Apps",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
