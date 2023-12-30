import { createCard } from "@/actions/create-card";
import FormSubmit from "@/components/form/form-button";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import React, {
  ElementRef,
  KeyboardEventHandler,
  forwardRef,
  useRef,
} from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
interface CardFormProps {
  listId: string;
  enebleEditing: () => void;
  disbleEditing: () => void;
  isEditing: boolean;
}

const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, enebleEditing, disbleEditing, isEditing }, ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);
    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess(data) {
        toast.success(`Card ${data.title} created successfully`);
        formRef.current?.reset();
      },
      onError(error) {
        toast.error(error);
      },
    });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        disbleEditing();
      }
    };

    useOnClickOutside(formRef, disbleEditing);
    useEventListener("keydown", onKeyDown);
    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };
    const onSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;
      const listId = formData.get("listId") as string;
      const boardId = formData.get("boardId") as string;
      console.log({ listId, boardId, title });
      execute({ listId, boardId, title });
    };

    if (isEditing) {
      return (
        <form
          ref={formRef}
          action={onSubmit}
          className=" m-1 py-0.5 px-1 space-y-4"
        >
          <FormTextarea
            id={"title"}
            onKeyDown={onTextareaKeyDown}
            errors={fieldErrors}
            ref={ref}
            placeholder="Enter a title for this card..."
          />
          <input hidden id={"listId"} name="listId" value={listId} />
          <input hidden id={"boardId"} name="boardId" value={params.boardId} />
          <div className=" flex items-center gap-x-1">
            <FormSubmit variant="primary">Add card</FormSubmit>
            <Button onClick={disbleEditing} size={"sm"} variant={"ghost"}>
              <X className=" h-5 w-5 " />
            </Button>
          </div>
        </form>
      );
    }
    return (
      <div>
        <Button
          className=" h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
          size={"sm"}
          variant={"ghost"}
          onClick={enebleEditing}
        >
          <Plus className=" h-4 w-4 mr-2" />
          Add a card
        </Button>
      </div>
    );
  }
);

export default CardForm;

CardForm.displayName = "CardForm";
