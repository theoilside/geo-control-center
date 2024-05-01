import { FormControl, FormLabel, Input } from "@chakra-ui/react";

function EmailField() {
  return (
    <FormControl>
      <FormLabel htmlFor="email">Почта</FormLabel>
      <Input size={"md"} id="email" type="email" placeholder="Введите почту" />
    </FormControl>
  );
}

export default EmailField;
