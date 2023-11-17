"use client"

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { useAction } from "@/hooks/use-action"
import { createBoard } from "@/actions/create-board"

import { FormInput } from "./form-input"
import { FormSubmit } from "./form-submit"
import { PopoverContentProps } from "@radix-ui/react-popover"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { toast } from "sonner"
import { FormPicker } from "./form-picker"
import { useRef } from "react"
import { useRouter } from "next/navigation"
import { useProModal } from "@/hooks/use-pro-modal"

interface FormPopverProps extends PopoverContentProps {
  children: React.ReactNode

}

export const FormPopover = ({
  children,
  ...props
}: FormPopverProps) => {
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null)
  const proModal = useProModal();

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success("Board created")
      closeRef.current?.click()
      router.push(`/board/${data.id}`)
    },
    onError: (error) => {
      toast.error(error)
      proModal.onOpen();
    }
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string
    const image = formData.get("image") as string

    execute({ title, image })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent
        align={props.align}
        className="w-80 pt-3"
        side={props.side}
        sideOffset={props.sideOffset}
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
            <X className="w-4 h-4" />
            <span className="sr-only">Close</span>
          </Button>
        </PopoverClose>
        <form action={onSubmit}>
          <div className="space-y-4">
            <FormPicker id="image" errors={fieldErrors} />
            <FormInput
              id="title"
              label="Board Title"
              type="text"
              errors={fieldErrors}
            />
          </div>
          <FormSubmit className="w-full mt-2">
            Create
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  )
}
