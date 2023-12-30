import { Card, List } from "@prisma/client";

export type ListWithCards =  { cards: Card[] } & List;

export type CardWithList = Card & { list: List };
