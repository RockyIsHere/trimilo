"use client";

import { updateBoard } from "@/actions/update-board";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Board } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

interface BoardTitleFormProps {
  data: Board;
}

const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [title, setTitle] = useState<string>(data.title);

  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board ${data.title} updated!`);
      setTitle(data.title);
      disbleEditing();
    },
    onError: (error) => {
      toast.error(`error`);
    },
  });
  const enebleEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };
  const disbleEditing = () => {
    setIsEditing(false);
  };
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    if (title === data.title) {
      return disbleEditing();
    }
    execute({
      id: data.id,
      title: title,
    });
  };
  const onBlur = () => {
    formRef.current?.requestSubmit();
  };
  if (isEditing) {
    return (
      <form
        ref={formRef}
        action={onSubmit}
        className=" flex items-center gap-x-2"
      >
        <FormInput
          id={"title"}
          ref={inputRef}
          onBlur={onBlur}
          defaultValue={title}
          className=" text-lg font-bold px-[7px] py-1 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    );
  }
  return (
    <Button
      onClick={enebleEditing}
      variant={"transparent"}
      className=" font-bold text-lg w-auto h-auto p-1 px-2"
    >
      {title}
    </Button>
  );
};

export default BoardTitleForm;
