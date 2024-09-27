import * as React from "react";
import "../styles/globals.css";

export const metadata = {
  title: "Contact Apps",
  description: "Contact Management Apps",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-zinc-100">{children}</body>
    </html>
  );
}
