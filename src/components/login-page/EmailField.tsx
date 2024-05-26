import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { BodyAuthJwtLoginAuthLoginPost } from "../../api/generated/model";
import {useEffect, useState} from "react";

type EmailFieldProps = {
  handleFormChange: (form: Partial<BodyAuthJwtLoginAuthLoginPost>) => void;
  isInvalid: boolean;
};

function EmailField({ ...props }: EmailFieldProps) {
  const [isCorrected, setIsCorrected] = useState<boolean>(false);

    useEffect(() => {
        setIsCorrected(false);
    }, [props.isInvalid]);

  return (
    <FormControl>
      <FormLabel htmlFor="email">Почта</FormLabel>
      <Input
        onChange={(e) => {
            props.handleFormChange({ username: e.target.value });
            setIsCorrected(true);
        }}
        size={"md"}
        id="email"
        type="email"
        required
        placeholder="Введите почту"
        defaultValue={"theoilside@gmail.com"}
        isInvalid={props.isInvalid && !isCorrected}
      />
    </FormControl>
  );
}

export default EmailField;
