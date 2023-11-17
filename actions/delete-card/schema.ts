import { z } from "zod";

export const DeleteCard = z.object({
  id: z.string({
    required_error: "Board ID is required",
    invalid_type_error: "Board ID is required"
  }),
  boardId: z.string({
    required_error: "Board ID is required",
    invalid_type_error: "Board ID is required"
  }),
})
