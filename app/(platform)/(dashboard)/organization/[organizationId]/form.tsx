"use client";

import { createBoard } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import React from "react";
import { useFormState } from "react-dom";
import FormInput from "./form-input";
import FormButton from "./form-button";
import { useAction } from "@/hooks/use-action";

export const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onComplete() {
      console.log("Completed");
    },
    onSuccess(data) {
      console.log("SUCCESSFUL");
    },
  });
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({ title });
  };
  return (
    <form className="flex gap-2 items-center" action={onSubmit}>
      <FormInput errors={fieldErrors} />
      <FormButton />
    </form>
  );
};
