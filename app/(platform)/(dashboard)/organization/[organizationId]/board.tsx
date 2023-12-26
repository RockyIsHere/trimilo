import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";
import React from "react";

interface BoardProps {
  id: string;
  title: string;
}

export const Board = ({ id, title }: BoardProps) => {
  const deleteBoardWithId = deleteBoard.bind(null, id);
  return (
    <form action={deleteBoardWithId}>
      <p>Board title: {title}</p>
      <Button type="submit" variant={"destructive"} size={"sm"}>
        Delete
      </Button>
    </form>
  );
};
