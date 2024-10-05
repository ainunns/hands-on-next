"use client";

import * as React from "react";
import Input from "@/components/Input";
import { FormProvider, useForm } from "react-hook-form";
import { ContactType } from "@/types/entities/contact";
import { useMutation } from "@tanstack/react-query";
import useMutationToast from "@/hooks/useMutationToast";
import api from "@/lib/api";
import { DANGER_TOAST, showToast, SUCCESS_TOAST } from "@/components/Toast";
import { useGetContactList } from "@/app/hooks/query";

export default function ContactForm() {
  const methods = useForm<Pick<ContactType, "name" | "email" | "img_url">>({
    mode: "onTouched",
  });

  const { handleSubmit, reset } = methods;
  const { refetch } = useGetContactList();

  const { mutateAsync } = useMutationToast<
    void,
    Pick<ContactType, "name" | "email" | "img_url">
  >(
    useMutation({
      mutationFn: async (data) => {
        if (!data.img_url) {
          delete data.img_url;
        }

        await api.post("/contacts/new", data);
      },
      onSuccess: () => {
        showToast("Contact added successfully", SUCCESS_TOAST);
        reset();
        refetch();
      },
      onError: () => {
        showToast("Failed to add contact", DANGER_TOAST);
      },
    })
  );

  const onSubmit = (data: Pick<ContactType, "name" | "email" | "img_url">) => {
    mutateAsync(data);
  };

  return (
    <section className="mt-6">
      <h2 className="text-neutral-950 text-2xl font-semibold">
        Add New Contact
      </h2>
      <FormProvider {...methods}>
        <form
          id="form"
          className="bg-white p-6 mt-6 rounded-lg shadow mb-8 flex flex-col gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            id="name"
            placeholder="Name"
            validation={{
              required: "Name is required",
            }}
          />
          <Input
            type="text"
            id="email"
            placeholder="Email"
            validation={{
              required: "Name is required",
            }}
          />
          <Input type="text" id="img_url" placeholder="Image URL" />
          <button
            form="form"
            type="submit"
            className="w-full p-3 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-md cursor-pointer transition-colors ease-in-out duration-300"
          >
            Add
          </button>
        </form>
      </FormProvider>
    </section>
  );
}
