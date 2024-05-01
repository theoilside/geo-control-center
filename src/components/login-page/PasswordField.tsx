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

function PasswordField() {
  const { isOpen, onToggle } = useDisclosure();
  const onClickReveal = () => onToggle();

  return (
    <FormControl>
      <FormLabel htmlFor="password">Пароль</FormLabel>
      <InputGroup>
        <InputRightElement>
          <IconButton
            variant="link"
            aria-label={isOpen ? "Скрыть пароль" : "Показать пароль"}
            icon={isOpen ? <BiHide /> : <BiShow />}
            onClick={onClickReveal}
          />
        </InputRightElement>
        <Input
          id="password"
          placeholder="Введите пароль"
          type={isOpen ? "text" : "password"}
          required
        />
      </InputGroup>
    </FormControl>
  );
}

export default PasswordField;
