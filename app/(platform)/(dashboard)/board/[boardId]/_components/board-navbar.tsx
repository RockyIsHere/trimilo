import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Board } from "@prisma/client";
import React from "react";
import BoardTitleForm from "./board-title-form";
import BoardOptions from "./board-options";

interface BoardNavbarProps {
  data: Board;
}

const BoardNavbar = ({ data }: BoardNavbarProps) => {
  const board = data;
  return (
    <div className=" w-full h-14 top-14 bg-black/10 fixed flex items-center px-6 gap-x-4 text-white">
      <BoardTitleForm data={data} />
      <div className=" ml-auto">
        <BoardOptions id={data.id} />
      </div>
    </div>
  );
};

export default BoardNavbar;
