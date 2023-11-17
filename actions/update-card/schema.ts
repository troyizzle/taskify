import { z } from "zod";
import { CreateCard } from "../create-card/schema";

export const UpdateCard = CreateCard.partial().extend({
  id: z.string({
    required_error: "Board ID is required",
    invalid_type_error: "Board ID is required"
  }),
  boardId: z.string({
    required_error: "Board ID is required",
    invalid_type_error: "Board ID is required"
  }),
  description: z.optional(
    z.string({
      required_error: "Description is required",
      invalid_type_error: "Description is required"
    }).min(3, {
      message: "Description must be at least 3 characters long"
    })
  )
})
