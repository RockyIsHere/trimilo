"use client";

import { ListWithCards } from "@/types";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import React, { useEffect, useState } from "react";
import ListForm from "./list-form";
import ListItem from "./list-item";
import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { toast } from "sonner";
import { updateCardOrder } from "@/actions/update-card-order";
interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState<ListWithCards[]>(data);
  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess() {
      toast.success("List reordered");
    },
    onError(error) {
      toast.error(error);
    },
  });
  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess() {
      toast.success("Card reordered");
    },
    onError(error) {
      toast.error(error);
    },
  });
  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;
    if (!destination) {
      return;
    }
    //? if droped in same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //! user moves a list

    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );
      setOrderedData(items);
      //!1111
      executeUpdateListOrder({ items, boardId });
    }
    //! user moves a card
    if (type === "card") {
      const newOrderedData = [...orderedData];
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );
      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );
      if (!sourceList || !destList) {
        return;
      }
      //? check if card exists on the sourceList
      if (!sourceList.cards) {
        sourceList.cards = [];
      }
      //? check if card exists on the destinationList
      if (!destList.cards) {
        destList.cards = [];
      }
      //? moving the card in same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );
        reorderedCards.forEach((card, index) => {
          card.order = index;
        });
        sourceList.cards = reorderedCards;
        setOrderedData(newOrderedData);
        //! trigger server action
        executeUpdateCardOrder({
          boardId: boardId,
          items: reorderedCards,
        });
      } else {
        //? remove card from source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        //? assign new card to dest list id
        movedCard.listId = destination.droppableId;

        //? add card to dest list
        destList.cards.splice(destination.index, 0, movedCard);
        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });

        //? update order of each card in destination list
        destList.cards.forEach((card, index) => {
          card.order = index;
        });
        setOrderedData(newOrderedData);
        executeUpdateCardOrder({
          boardId: boardId,
          items: destList.cards,
        });
      }
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className=" flex gap-x-3 h-full"
          >
            {orderedData?.map((data, index) => (
              <ListItem key={index} data={data} index={index} />
            ))}
            {provided.placeholder}
            <ListForm />
            <div className=" flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListContainer;
