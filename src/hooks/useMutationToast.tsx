import { UseMutationResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import * as React from "react";
import toast from "react-hot-toast";

import { DANGER_TOAST, showToast, SUCCESS_TOAST } from "@/components/Toast";
import { ApiError, ApiResponse } from "@/types/api";
import { DEFAULT_TOAST_MESSAGE } from "@/constant/Toast";

type OptionType = {
  loading?: string;
  success?: string;
  error?: string;
};

export default function useMutationToast<T, K>(
  mutationFn: UseMutationResult<
    AxiosResponse<ApiResponse<T>> | undefined | void,
    AxiosError<ApiError>,
    K
  >,
  customMessages: OptionType = {}
) {
  const { data, isError, isPending, error } = mutationFn;

  const toastStatus = React.useRef<string>(data ? "done" : "idle");

  React.useEffect(() => {
    const toastMessage = {
      ...DEFAULT_TOAST_MESSAGE,
      ...customMessages,
    };

    // If it is not the first render
    if (toastStatus.current === "done" && !isPending) return;

    if (isError) {
      showToast(
        typeof toastMessage.error === "string"
          ? toastMessage.error
          : toastMessage.error(error),
        DANGER_TOAST
      );
      toastStatus.current = "done";
    } else if (isPending) {
      toastStatus.current = toast.loading(toastMessage.loading);
    } else if (data) {
      showToast(toastMessage.success, SUCCESS_TOAST);
      toastStatus.current = "done";
    }

    return () => {
      toast.dismiss(toastStatus.current);
    };
  }, [customMessages, data, error, isError, isPending]);

  return { ...mutationFn };
}
