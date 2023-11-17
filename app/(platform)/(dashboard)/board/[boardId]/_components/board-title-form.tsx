"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Board } from "@prisma/client"
import { FormInput } from "@/components/form/form-input"
import { updateBoard } from "@/actions/update-board"
import { useAction } from "@/hooks/use-action"
import { toast } from "sonner"

interface BoardTitleFormProps {
  board: Board
}

export const BoardTitleForm = ({ board }: BoardTitleFormProps) => {
  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board ${data.title} updated`)
      setTitle(data.title)
      disableEditing()
    },
    onError: (error) => {
      toast.error(error)
    }
  })

  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [title, setTitle] = useState(board.title)
  const [isEditing, setIsEditing] = useState(false)

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string

    execute({ id: board.id, title })
  }

  const onBlur = () => {
    formRef.current?.requestSubmit();
  }

  if (isEditing) {
    return (
      <form action={onSubmit} ref={formRef} className="flex items-center gap-x-2">
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    )
  }

  return (
    <Button
      onClick={enableEditing}
      className="font-bold text-lg h-auto w-auto p-1 px-2"
      variant="transparent"
    >
      {title}
    </Button>
  )
}
