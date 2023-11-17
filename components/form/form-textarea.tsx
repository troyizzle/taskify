"use client"

import { forwardRef } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { FormErrors } from "./form-errors"
import { useFormStatus } from "react-dom"

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  errors?: Record<string, string[] | undefined>
  label?: string
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>((
  { label, errors, ...props }, ref) => {
  const { pending } = useFormStatus()

  return (
    <div className="space-y-2 w-full">
      <div className="space-y-1 w-full">
        {label ? (
          <Label
            htmlFor={props.id}
            className="text-xs font-semibold text-neutral-700"
          >
            {label}
          </Label>
        ) : null}
        <Textarea
          onKeyDown={props.onKeyDown}
          onBlur={props.onBlur}
          onClick={props.onClick}
          ref={ref}
          required={props.required}
          placeholder={props.placeholder}
          name={props.id}
          id={props.id}
          disabled={props.disabled || pending}
          className={cn("resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 shadow-sm",
            props.className
          )}
          aria-describedby={`${props.id}-error`}
          defaultValue={props.defaultValue}
        />
      </div>
      <FormErrors errors={errors} id={props.id ?? ""} />
    </div>
  )
})

FormTextarea.displayName = "FormTextarea"
