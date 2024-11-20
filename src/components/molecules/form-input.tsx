"use client"
import { Input } from "@/components/ui/input"
import { FormLabel } from "../atoms/form-label"
import style from "./sign.module.scss"

interface FormInputProps<T extends FieldValues>  {
  label: string;
  type: string;
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
  id?: string;
  placeholder?: string;
}

import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";

export function FormInput<T extends FieldValues>({ label,type,name,control,error,id,placeholder, }: FormInputProps<T>) {
  return (
    <div className="w-full flex  flex-col mb-4">
    <label
      htmlFor={id || label.toLowerCase()}
      className={`text-sm font-semibold text-custom-black`}
    >
      {label}
    </label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          id={id || label.toLowerCase()}
          type={type}
          error={error?.message}
          placeholder={placeholder}
          {...field}
        />
      )}
    />
  </div>
  )
}