"use client"

import { useFormStatus } from "react-dom"

import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "@/components/ui/button"

interface FormSubmitProps extends ButtonProps {
  children: React.ReactNode
}

export const FormSubmit = ({
  children,
  ...props
}: FormSubmitProps) => {
  const { pending } = useFormStatus()

  return (
    <Button
      disabled={pending || props.disabled}
      type="submit"
      variant={props.variant || "primary"}
      size="sm"
      className={cn(props.className)}
    >
      {children}
    </Button>
  )
}
