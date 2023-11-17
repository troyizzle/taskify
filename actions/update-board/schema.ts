import { z } from "zod";
import { CreateBoard } from "../create-board/schema";

export const UpdateBoard = CreateBoard.partial().extend({
  id: z.string({
    required_error: "Board ID is required",
    invalid_type_error: "Board ID is required"
  }),
})
