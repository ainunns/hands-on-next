import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ContactType } from "@/types/entities/contact";
import useMutationToast from "@/hooks/useMutationToast";
import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { DANGER_TOAST, showToast, SUCCESS_TOAST } from "@/components/Toast";
import { useGetContactList } from "@/app/hooks/query";

export default function ContactItem({
  id,
  img_url,
  name,
  email,
}: Omit<ContactType, "created_at" | "updated_at">) {
  const { refetch } = useGetContactList();
  const { mutateAsync } = useMutationToast<void, void>(
    useMutation({
      mutationFn: async () => {
        await api.delete(`/contacts/${id}`);
      },
      onSuccess: () => {
        showToast("Contact deleted successfully", SUCCESS_TOAST);
        refetch();
      },
      onError: () => {
        showToast("Failed to delete contact", DANGER_TOAST);
      },
    })
  );

  return (
    <div className="flex justify-between items-center p-4">
      <Link href={`/${id}`}>
        <div className="flex gap-4 items-center">
          <Image
            src={img_url ?? "/images/profile.png"}
            width={64}
            height={64}
            alt={name}
          />
          <div className="flex flex-col gap-1">
            <p className="text-lg font-medium text-neutral-950">{name}</p>
            <p className="text-sm font-normal text-neutral-600">{email}</p>
          </div>
        </div>
      </Link>
      <button
        className="w-fit p-3 text-lg bg-red-500 hover:bg-red-600 text-white rounded-md cursor-pointer transition-colors ease-in-out duration-300"
        onClick={() => mutateAsync()}
      >
        x
      </button>
    </div>
  );
}
