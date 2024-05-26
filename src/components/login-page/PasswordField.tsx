import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import { BiShow, BiHide } from "react-icons/bi";
import {BodyAuthJwtLoginAuthLoginPost} from "../../api/generated/model";
import {useEffect, useState} from "react";

type PasswordFieldProps = {
  handleFormChange: (form: Partial<BodyAuthJwtLoginAuthLoginPost>) => void;
  isInvalid: boolean;
}

function PasswordField({...props}: PasswordFieldProps) {
  const { isOpen, onToggle } = useDisclosure();
  const onClickReveal = () => onToggle();
  const [isCorrected, setIsCorrected] = useState<boolean>(false);

  useEffect(() => {
    setIsCorrected(false);
  }, [props.isInvalid]);

  return (
    <FormControl>
      <FormLabel htmlFor="password">Пароль</FormLabel>
      <InputGroup>
        <Input
          id="password"
          placeholder="Введите пароль"
          onChange={(e) => {
            props.handleFormChange({ password: e.target.value });
            setIsCorrected(true);
          }}
          type={isOpen ? "text" : "password"}
          required
          defaultValue={'1234567890'}
          isInvalid={props.isInvalid && !isCorrected}
        />
        <InputRightElement>
          <IconButton
              variant="link"
              aria-label={isOpen ? "Скрыть пароль" : "Показать пароль"}
              icon={isOpen ? <BiHide /> : <BiShow />}
              onClick={onClickReveal}
          />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}

export default PasswordField;
