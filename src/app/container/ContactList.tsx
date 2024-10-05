"use client";

import ContactItem from "@/components/ContactItem";
import * as React from "react";
import { useGetContactList } from "@/app/hooks/query";

export default function ContactList() {
  const { contactList, isLoading } = useGetContactList();

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="mt-6 w-full flex flex-col">
      <h2 className="text-neutral-950 text-2xl font-semibold">Contact List</h2>
      <div className="flex flex-col gap-4">
        {contactList?.map((contact) => (
          <ContactItem
            id={contact.id}
            name={contact.name}
            email={contact.email}
            img_url={contact.img_url}
            key={contact.id}
          />
        ))}
      </div>
    </section>
  );
}
