"use client";

import React, { ElementRef, ReactNode, useRef } from "react";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { FormInput } from "./form-input";
import FormSubmit from "./form-button";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";
import { toast } from "sonner";
import FormPicker from "./form-picker";
import { useRouter } from "next/navigation";

interface FormPopoverProps {
  children: ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

const FormPopover = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}: FormPopoverProps) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess(data) {
      toast.success("Board created successfully!");
      router.push(`/board/${data.id}`);
    },
    onError(error) {
      toast.error("Failed to create");
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;
    execute({ title, image });
    closeRef.current?.click();
  };
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        side={side}
        className=" w-80 pt-3"
        align={align}
        sideOffset={sideOffset}
      >
        <div className=" text-sm font-medium text-center text-neutral-600 pb-4">
          Create Board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className=" h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600 "
            variant={"ghost"}
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <div className=" space-y-4">
            <FormPicker id={"image"} errors={fieldErrors} />
            <FormInput
              id={"title"}
              label="Board title"
              type="text"
              errors={fieldErrors}
            />
          </div>
          <FormSubmit>Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default FormPopover;
