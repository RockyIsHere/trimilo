import { Input } from "@/components/ui/input";
import React from "react";
import { useFormStatus } from "react-dom";

interface FormInputProps {
  errors?: {
    title?: string[];
  };
}

const FormInput = ({ errors }: FormInputProps) => {
  const { pending } = useFormStatus();
  return (
    <div className=" flex flex-col space-y-2">
      <Input
        id="title"
        name="title"
        required
        placeholder="Enter title"
        disabled={pending}
        className=" border-black border p-1 appearance-none rounded"
      />
      {errors?.title
        ? errors?.title?.map((err: string) => <p key={err}>{err}</p>)
        : null}
    </div>
  );
};

export default FormInput;
