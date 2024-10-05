"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { useGetDetailContact } from "../hooks/query";

export default function DetailPage({ params }: { params: { id: string } }) {
  const {
    contactDetail: detail,
    isLoading,
    isError,
  } = useGetDetailContact(params.id);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {isError}</p>;
  if (!detail) return <p>No data found</p>;

  return (
    <main className="py-24 w-10/12 mx-auto flex flex-col">
      <section className="w-full rounded-xl bg-white p-8 flex flex-col gap-4">
        <div className="flex gap-2">
          <Link
            href="/"
            className="inline-flex items-center focus-visible:ring-blue-500 focus:outline-none focus-visible:rounded focus-visible:ring focus-visible:ring-offset-2 font-medium text-blue-500 hover:text-blue-600 active:text-blue-700 disabled:text-blue-200"
          >
            &lt; Back to Home
          </Link>
        </div>
        <h1 className="text-3xl font-semibold text-neutral-950">Detail</h1>
        <div className="flex gap-4 mt-6">
          <Image
            src={detail.img_url ?? "/images/profile.png"}
            alt="Profile"
            width={64}
            height={64}
          />
          <div className="flex flex-col gap-2">
            <p className="text-lg font-medium text-neutral-950">
              {detail.name}
            </p>
            <p className="text-sm font-normal text-neutral-600">
              {detail.email}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
