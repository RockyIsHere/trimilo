'use server'

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteBoard(id: string) {
  await db.board.delete({
    where: {
      id,
    },
  });
  revalidatePath("/organization/org_2a4nH35xZAbl3w6us0Cnyjj3Nz3");
}
