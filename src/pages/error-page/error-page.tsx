import { Heading, VStack, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { COUNTRIES_PAGE } from "../../routes/route-paths.ts";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <VStack align={"left"} spacing={"30px"} maxW={"40%"} margin={'20px'}>
      <VStack align={"left"}>
        <Heading color={"gray.700"}>Ошибка</Heading>
        <Text color={"gray.700"}>Такой страницы не существует :(</Text>
      </VStack>
      <Button colorScheme={"orange"} onClick={() => navigate(COUNTRIES_PAGE)}>
        Вернуться на главную
      </Button>
    </VStack>
  );
}

export default ErrorPage;
