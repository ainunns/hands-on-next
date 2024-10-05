export type ApiResponse<T> = {
  message: string;
  status: boolean;
  data: T;
};

export type ApiError = {
  status: boolean | number;
  message: string;
};

export type UninterceptedApiError = {
  code: number;
  status: boolean;
  message: string | Record<string, string[]>;
};
