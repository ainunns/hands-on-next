import * as React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ContactItem({ id, imgUrl, name, email }) {
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contacts/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      alert("Contact deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-between items-center p-4">
      <Link href={`/contacts/${id}`}>
        <div className="flex gap-4 items-center">
          <Image
            src={imgUrl ?? "/images/profile.png"}
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
        onClick={handleDelete}
      >
        x
      </button>
    </div>
  );
}
