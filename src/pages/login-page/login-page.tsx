import {Box, Flex, Stack, VStack, Button, Heading, FormLabel, Input} from "@chakra-ui/react";
import PasswordField from "../../components/login-page/PasswordField.tsx";

function LoginPage() {
    return (
        <Flex>
            <VStack width={'100%'} spacing={'16px'}>
                <Stack textAlign="center">
                    <Heading>
                        Войти в аккаунт
                    </Heading>
                </Stack>
                <Box
                    className="login-container"
                    py={{ base: '4', sm: '8' }}
                    px={{ base: '4', sm: '10' }}
                    borderWidth="2px"
                    borderRadius="12px"
                >
                    <Stack spacing="6">
                        <Stack spacing="5">
                            <>
                                <FormLabel htmlFor="email">Почта</FormLabel>
                                <Input id="email" type="email" placeholder="Введите почту" />
                            </>
                            <PasswordField />
                        </Stack>
                        <Stack spacing="6">
                            <Button
                                size={'lg'}
                                colorScheme={'orange'}
                                type="submit"
                            >
                                Войти
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </VStack>
        </Flex>
    );
}

export default LoginPage;
