import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { forwardRef } from "react";
interface CardFormProps {
  listId: string;
  enebleEditing: () => void;
  disbleEditing: () => void;
  isEditing: boolean;
}

const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, enebleEditing, disbleEditing, isEditing }, ref) => {
    return (
      <div>
        <Button
          className=" h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
          size={"sm"}
          variant={"ghost"}
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
