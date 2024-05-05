import {Alert, AlertIcon} from "@chakra-ui/react";

export function NotFound() {
    return (
        <Alert status='warning'>
            <AlertIcon />
            Ничего не найдено :(
        </Alert>
    );
}
