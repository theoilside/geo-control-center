import {Button} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import {LOGIN_PAGE} from "../../routes/route-paths.ts";

function LoginButton() {
    const navigate = useNavigate();
    return (
        <Button
            onClick={() => navigate(LOGIN_PAGE)}
            colorScheme='orange'
            variant='outline'
        >
            Войти
        </Button>
    );
}

export default LoginButton;
