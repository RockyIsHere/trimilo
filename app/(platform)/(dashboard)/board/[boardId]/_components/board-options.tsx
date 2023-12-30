"use client";

import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { MoreHorizontalIcon, X } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface BoardOptionsProps {
  id: string;
}

const BoardOptions = ({ id }: BoardOptionsProps) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(error);
    },
  });
  const onDelete = () => {
    execute({ id: id });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className=" h-auto w-auto p-2" variant={"transparent"}>
          <MoreHorizontalIcon className=" h-4 w-4 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" pt-3 px-0 pb-3" side="bottom" align="start">
        <div className=" text-sm font-medium text-center text-neutral-600 pb-4">
          Board options
        </div>
        <PopoverClose asChild>
          <Button
            className=" h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant={"ghost"}
          >
            <X className=" h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          variant={"ghost"}
          onClick={onDelete}
          disabled={isLoading}
          className=" rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
        >
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default BoardOptions;