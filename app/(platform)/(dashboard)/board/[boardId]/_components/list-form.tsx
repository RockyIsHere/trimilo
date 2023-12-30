import React, { ElementRef, useRef, useState } from "react";
import ListWrapper from "./list-wrapper";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "@/components/form/form-input";
import { useParams, useRouter } from "next/navigation";
import FormSubmit from "@/components/form/form-button";
import { useAction } from "@/hooks/use-action";
import { createList } from "@/actions/create-list";
import { toast } from "sonner";

const ListForm = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const params = useParams();
  const enebleEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };
  const disbleEditing = () => {
    setIsEditing(false);
  };

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess(data) {
      toast.success(`List ${data.title} was successfully created`);
      disbleEditing();
      router.refresh();
    },
    onError(error) {
      toast.error(error);
      disbleEditing();
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;
    console.log(title, boardId);
    execute({ title, boardId });
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      disbleEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disbleEditing);

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className=" w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
          <FormInput
            id={"title"}
            errors={fieldErrors}
            ref={inputRef}
            className=" text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
            placeholder="Enter list title"
          />
          <input hidden value={params.boardId} name={"boardId"} readOnly />
          <div className=" flex items-center gap-x-1">
            <FormSubmit variant={"primary"}>Add List</FormSubmit>
            <Button onClick={disbleEditing} size={"sm"} variant={"ghost"}>
              <X className=" h-5 w-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }
  return (
    <ListWrapper>
      <button
        onClick={enebleEditing}
        className=" w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
      >
        <Plus className=" h-4 w-4 mr-2" />
        Add a list
      </button>
    </ListWrapper>
  );
};

export default ListForm;
