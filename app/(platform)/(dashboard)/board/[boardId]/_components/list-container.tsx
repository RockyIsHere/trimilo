"use client";

import { ListWithCards } from "@/types";



import React, { useEffect, useState } from "react";
import ListForm from "./list-form";
import ListItem from "./list-item";
interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState<ListWithCards[]>(data);
  useEffect(() => {
    setOrderedData(data);
  }, [data]);
  return (
    <ol className=" flex gap-x-3 h-full">
      {orderedData?.map((data, index) => (
        <ListItem key={index} data={data} index={index} />
      ))}
      <ListForm />
      <div className=" flex-shrink-0 w-1" />
    </ol>
  );
};

export default ListContainer;
