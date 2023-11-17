import { z } from "zod"
import { CreateList } from "../create-list/schema"

export const UpdateList = CreateList.extend({
  id: z.string({
    required_error: "List ID is required",
    invalid_type_error: "List ID is required"
  }),
})
