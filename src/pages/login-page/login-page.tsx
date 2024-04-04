import {Box, Flex, Stack, VStack, Button, Heading} from "@chakra-ui/react";
import PasswordField from "../../components/login-page/PasswordField.tsx";
import EmailField from "../../components/login-page/EmailField.tsx";

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
                    width={'40%'}
                    padding={'30px'}
                    borderWidth="2px"
                    borderRadius="12px"
                >
                    <Stack spacing="6">
                        <Stack spacing="5">
                            <EmailField />
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
