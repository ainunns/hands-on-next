"use client";

import ContactItem from "../../components/ContactItem";
import { useGetContactList } from "../../hooks/useGetContactList";
import * as React from "react";

export default function ContactList() {
  const { contacts, isLoading } = useGetContactList();

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="mt-6 w-full flex flex-col">
      <h2 className="text-neutral-950 text-2xl font-semibold">Contact List</h2>
      <div className="flex flex-col gap-4">
        {contacts.map((contact) => (
          <ContactItem
            id={contact.id}
            name={contact.name}
            email={contact.email}
            imgUrl={contact.img_url}
            key={contact.id}
          />
        ))}
      </div>
    </section>
  );
}
