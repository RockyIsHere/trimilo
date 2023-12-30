import { z } from "zod";

export const CreateCard = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is invalid",
    })
    .min(3, {
      message: "Title is too short",
    }),
  boardId: z.string({
    required_error: "Board Id is required",
  }),
  listId: z.string()
});
