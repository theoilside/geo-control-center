import { Box, FormLabel, Input } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

type ObjectFieldEditableProps<T> = {
  fieldName: keyof T;
  fieldTitle: string;
  value: T[keyof T];
  handleFormUpdate: (newValue: keyof T, value: T[keyof T]) => void;
  type?: string;
  placeholder?: string;
  charactersLimit?: number;
};

export function ObjectFieldEditable<T extends NonNullable<unknown>>({
  ...props
}: ObjectFieldEditableProps<T>) {
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value as T[keyof T];
    props.handleFormUpdate(props.fieldName, newValue);
    if (
      props.charactersLimit &&
      e.target.value.length > props.charactersLimit
    ) {
      setIsInvalid(true);
    }
  };

  return (
    <Box>
      <FormLabel htmlFor={props.fieldName.toString()}>
        {props.fieldTitle.toString()}
      </FormLabel>
      <Input
        onChange={(e) => {
          handleChange(e);
          setIsInvalid(false);
        }}
        value={props.value as string | number | undefined}
        id={props.fieldName.toString()}
        placeholder={props.placeholder}
        type={props.type}
        isInvalid={isInvalid}
      />
    </Box>
  );
}
