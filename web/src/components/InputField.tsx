import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  // propNames,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size,
  ...props
}) => {
  const [field, meta] = useField(props);
  let InputORTextArea = Input;
  if (textarea) InputORTextArea = Textarea as any;

  return (
    <FormControl isInvalid={!!meta.error}>
      <FormLabel htmlFor={props.name}>{label}</FormLabel>
      <InputORTextArea {...field} {...props} id={field.name} />

      {meta.error ? <FormErrorMessage>{meta.error}</FormErrorMessage> : null}
    </FormControl>
  );
};
