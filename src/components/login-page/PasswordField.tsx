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

type PasswordFieldProps = {
  handleFormChange: ((form: Partial<BodyAuthJwtLoginAuthLoginPost>) => void);
}

function PasswordField({...props}: PasswordFieldProps) {
  const { isOpen, onToggle } = useDisclosure();
  const onClickReveal = () => onToggle();

  return (
    <FormControl>
      <FormLabel htmlFor="password">Пароль</FormLabel>
      <InputGroup>
        <Input
          id="password"
          placeholder="Введите пароль"
          onChange={(e) => props.handleFormChange({ password: e.target.value })}
          type={isOpen ? "text" : "password"}
          required
          defaultValue={'1234567890'}
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
