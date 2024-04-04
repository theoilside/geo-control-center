import {Heading, VStack, Text, Button} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {COUNTRIES_PAGE} from "../../routes/route-paths.ts";

function ErrorPage() {
    const navigate = useNavigate();

    return(
        <VStack>
            <Heading>Ошибка</Heading>
            <Text>Такой страницы не существует :(</Text>
            <Button onClick={() => navigate(COUNTRIES_PAGE)}>Вернуться на главную</Button>
        </VStack>
    )
}

export default ErrorPage;
