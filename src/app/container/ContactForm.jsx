"use client";

import * as React from "react";
import Input from "../../components/Input";

export default function ContactForm() {
  const formRef = React.useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());

    const { name, email, img_url } = data;
    let payload = {
      name,
      email,
    };

    if (img_url) {
      payload.img_url = img_url;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contacts/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      formRef.current.reset();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="mt-6">
      <h2 className="text-neutral-950 text-2xl font-semibold">
        Add New Contact
      </h2>
      <form
        className="bg-white p-6 mt-6 rounded-lg shadow mb-8 flex flex-col gap-3"
        ref={formRef}
      >
        <Input type="text" name="name" placeholder="Name" />
        <Input type="text" name="email" placeholder="Email" />
        <Input type="text" name="img_url" placeholder="Image URL" />
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full p-3 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-md cursor-pointer transition-colors ease-in-out duration-300"
        >
          Add
        </button>
      </form>
    </section>
  );
}
