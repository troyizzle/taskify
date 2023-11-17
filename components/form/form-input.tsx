"use client"

import { forwardRef } from "react"
import { useFormStatus } from "react-dom"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { FormErrors } from "./form-errors"

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errors?: Record<string, string[] | undefined>
  label?: string
  onBlur?: () => void
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
  errors,
  label,
  onBlur,
  ...props }, ref) => {
  const { pending } = useFormStatus();

  const id = props.id || "anonymous-input"

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        {label ? (
          <Label
            htmlFor={props.id}
            className="text-xs font-semibold text-neutral-700"
          >
            {label}
          </Label>
        ) : null}
        <Input
          onBlur={onBlur}
          defaultValue={props.defaultValue}
          ref={ref}
          required={props.required}
          name={id}
          id={id}
          placeholder={props.placeholder}
          disabled={pending}
          type={props.type}
          className={cn(
            "text-sm px-2 h-7",
            props.className,
          )}
          aria-describedby={`${props.id}-error`}
        />
      </div>
      <FormErrors
        id={id}
        errors={errors}
      />
    </div>
  )
})

FormInput.displayName = "FormInput"
