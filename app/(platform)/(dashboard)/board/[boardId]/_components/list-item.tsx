import { ListWithCards } from "@/types";
import React, { ElementRef, useRef, useState } from "react";
import ListHeader from "./list-header";
import CardForm from "./card-form";

interface ListItemProps {
  data: ListWithCards;
  index: number;
}
const ListItem = ({ data, index }: ListItemProps) => {
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const enebleEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
      textareaRef.current?.select();
    });
  };
  const disbleEditing = () => {
    setIsEditing(false);
  };
  return (
    <li className=" shrink-0 h-full w-[272px] select-none">
      <div className=" w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader onAddCard={enebleEditing} data={data} />
        <CardForm
          listId={data.id}
          ref={textareaRef}
          isEditing={isEditing}
          enebleEditing={enebleEditing}
          disbleEditing={disbleEditing}
        />
      </div>
    </li>
  );
};

export default ListItem;
