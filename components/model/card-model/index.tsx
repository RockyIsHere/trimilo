"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModelStore } from "@/hooks/use-card-model";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Header from "./header";
import Description from "./description";
import Actions from "./actions";

const CardModel = () => {
  const id = useCardModelStore((state) => state.id);
  const isOpen = useCardModelStore((state) => state.isOpen);
  const onClose = useCardModelStore((state) => state.onClose);

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {!cardData ? <Header.Skeleton /> : <Header data={cardData} />}
        <div className=" grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className=" col-span-3">
            <div className="w-full space-y-6">
              {!cardData ? (
                <Description.Skeleton />
              ) : (
                <Description data={cardData} />
              )}
            </div>
          </div>
          {!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModel;
