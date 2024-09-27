"use client";

import ContactItem from "../../components/ContactItem";
import * as React from "react";

export default function ContactList() {
  const [contacts, setContacts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/contacts`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
            },
          }
        );
        const data = await response.json();
        setContacts(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
