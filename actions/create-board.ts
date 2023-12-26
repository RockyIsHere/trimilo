"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export type State = {
  message?: string | null;
  error?: {
    title?: string[];
  };
};

const CreateBoard = z.object({
  title: z.string().min(3, {
    message: "Minimum length of 3 letters is required",
  }),
});

export async function create(prevState: State, formData: FormData) {
  const validatedFields = CreateBoard.safeParse({
    title: formData.get("title") as string,
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields",
    };
  }
  const { title } = validatedFields.data;

  try {
    await db.board.create({
      data: {
        title,
      },
    });
  } catch (error: any) {
    return {
      message: "Database error: " + error.message,
    };
  }

  revalidatePath("/organization/org_2a4nH35xZAbl3w6us0Cnyjj3Nz3");
  redirect("/organization/org_2a4nH35xZAbl3w6us0Cnyjj3Nz3");
}
