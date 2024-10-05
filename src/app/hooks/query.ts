import api from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { ContactType } from "@/types/entities/contact";
import { useQuery } from "@tanstack/react-query";

export const useGetContactList = () => {
  const { data, isPending, refetch } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const response = await api.get<ApiResponse<ContactType[]>>("/contacts");
      const data = await response.data.data;

      return data;
    },
  });

  return { contactList: data, isLoading: isPending, refetch };
};

export const useGetDetailContact = (id: string) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["contacts", id],
    queryFn: async () => {
      const response = await api.get<ApiResponse<ContactType>>(
        `/contacts/${id}`
      );
      const data = await response.data.data;

      return data;
    },
  });

  return { contactDetail: data, isLoading: isPending, isError };
};
