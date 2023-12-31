import { z } from "zod";
import { ActionState } from "@/lib/create-safe-action";
import { DeleteCard } from "./schema";
import { Board, Card, List } from "@prisma/client";

export type InputType = z.infer<typeof DeleteCard>;
export type ReturnType = ActionState<InputType, Card>;
