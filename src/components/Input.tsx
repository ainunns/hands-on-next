import * as React from "react";
import { get, RegisterOptions, useFormContext } from "react-hook-form";
import clsxm from "@/lib/clsxm";

export type InputProps = {
  id: string;
  label?: string;
  helperText?: string;
  helperTextClassName?: string;
  hideError?: boolean;
  validation?: RegisterOptions;
} & React.ComponentPropsWithoutRef<"input">;

export default function Input({
  id,
  label,
  helperText,
  hideError = false,
  validation,
  className,
  type = "text",
  readOnly = false,
  helperTextClassName,
  ...rest
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, id);

  return (
    <div className="w-full space-y-1.5 rounded-md">
      <div className="relative flex w-full rounded-md">
        <div className="pointer-events-none absolute h-full w-full rounded-md ring-1 ring-inset ring-typo-outline" />
        <div className={clsxm("relative w-full rounded-md")}>
          <input
            {...register(id, validation)}
            type={type}
            id={id}
            name={id}
            readOnly={readOnly}
            disabled={readOnly}
            className={clsxm(
              "h-full w-full rounded-md border-[#cccccc] px-3 py-3",
              "focus:ring-2 focus:ring-inset",
              "bg-transparent font-poppins text-sm text-neutral-900",
              "placeholder:font-poppins placeholder:text-neutral-400",
              readOnly && "cursor-not-allowed",
              error
                ? "border-none ring-1 ring-inset ring-red-500 focus:ring-red-500 "
                : "focus:ring-blue-500",
              className
            )}
            aria-describedby={id}
            {...rest}
          />
        </div>
      </div>

      {!hideError && error && (
        <p className="!leading-tight text-red-500">{error.message}</p>
      )}
    </div>
  );
}
