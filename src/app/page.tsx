import * as React from "react";
import ContactForm from "./container/ContactForm";
import ContactList from "./container/ContactList";

export default function Home() {
  return (
    <main className="w-full flex flex-col py-24 items-center justify-center">
      <section className="min-w-[800px] mx-10 my-auto p-6 bg-white shadow-md rounded-xl">
        <h1 className="font-bold text-4xl mb-6 text-center text-neutral-950">
          Contact Apps
        </h1>
        <ContactForm />
        <ContactList />
      </section>
    </main>
  );
}
