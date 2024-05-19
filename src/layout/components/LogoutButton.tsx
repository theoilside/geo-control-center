import { Button } from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";

type LogoutButtonProps = {
    handleLogout: () => void;
}

export function LogoutButton({...props}: LogoutButtonProps) {
    return (
        <Button
            onClick={props.handleLogout}
            rightIcon={<BiLogOut />}
            colorScheme="orange"
            variant="outline"
            size={"sm"}
        >
            Выйти
        </Button>
    );
}
