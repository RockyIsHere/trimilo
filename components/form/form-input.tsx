"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import FormErrors from "./form-errors";

interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      type,
      placeholder,
      required,
      disabled,
      errors,
      className,
      defaultValue,
      onBlur,
    },
    ref
  ) => {
    const { pending } = useFormStatus();
    return (
      <div className=" space-y-2">
        <div className=" space-y-1">
          {label ? (
            <Label
              htmlFor="id"
              className=" text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          ) : null}
          <Input
            onBlur={onBlur}
            placeholder={placeholder}
            defaultValue={defaultValue}
            id={id}
            name={id}
            type={type}
            required={required}
            disabled={pending || disabled}
            className={cn(" text-sm px-1 py-1 h-7", className)}
            aria-describedby={`${id}-error`}
          />
          <FormErrors
          id={id}
          errors={errors}
          />
        </div>
      </div>
    );
  }
);