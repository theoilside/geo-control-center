import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import {BodyAuthJwtLoginAuthLoginPost} from "../../api/generated/model";

type EmailFieldProps = {
    handleFormChange: ((form: Partial<BodyAuthJwtLoginAuthLoginPost>) => void);
}

function EmailField({...props}: EmailFieldProps) {
  return (
    <FormControl>
      <FormLabel htmlFor="email">Почта</FormLabel>
      <Input
          onChange={(e) => props.handleFormChange({ username: e.target.value })}
          size={"md"}
          id="email"
          type="email"
          placeholder="Введите почту"
          defaultValue={'theoilside@gmail.com'}
      />
    </FormControl>
  );
}

export default EmailField;
