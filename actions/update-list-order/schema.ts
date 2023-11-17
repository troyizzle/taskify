import { z } from "zod";

export const UpdateListOrder = z.object({
  boardId: z.string({
    required_error: "Board ID is required",
    invalid_type_error: "Board ID is required"
  }),
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
});
