import { ListWithCards } from "@/types";
import React, { ElementRef, useRef, useState } from "react";
import ListHeader from "./list-header";
import CardForm from "./card-form";
import { cn } from "@/lib/utils";
import CardItem from "./card-item";

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
        <ol
          className={cn(
            " mx-1 px-1 py-0.5 flex flex-col gap-y-2",
            data.cards.length > 0 ? "mt-2" : "mt-0"
          )}
        >
          {data.cards.map((card,index)=>(
            <CardItem key={index} data={card} index={index}/>
          ))}
        </ol>
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
