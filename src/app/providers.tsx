"use client";

import {
  QueryClient,
  QueryClientProvider,
  QueryOptions,
} from "@tanstack/react-query";

import Toast from "@/components/Toast";
import api from "@/lib/api";

const defaultQueryFn = async ({ queryKey }: QueryOptions) => {
  const { data } = await api.get(`${queryKey?.[0]}`);
  return data;
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Toast />
      {children}
    </QueryClientProvider>
  );
}
