import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { LOGIN_PAGE } from "../../routes/route-paths.ts";
import { BiLockOpenAlt } from "react-icons/bi";

export function LoginButton() {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate(LOGIN_PAGE)}
      rightIcon={<BiLockOpenAlt />}
      colorScheme="orange"
      variant="outline"
      size={"sm"}
    >
      Войти
    </Button>
  );
}
