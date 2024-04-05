import {
    Box,
    Stack,
    VStack,
    HStack,
    Button,
    Heading,
    Divider,
    Text,
    Breadcrumb,
    BreadcrumbItem, BreadcrumbLink
} from "@chakra-ui/react";
import PasswordField from "../../components/login-page/PasswordField.tsx";
import EmailField from "../../components/login-page/EmailField.tsx";
import {BiRocket} from "react-icons/bi";
import { Link } from "react-router-dom";
import {COUNTRIES_PAGE} from "../../routes/route-paths.ts";

function LoginPage() {
    return (
        <VStack width={'100%'} spacing={'20px'} align={'left'}>
            <Breadcrumb fontWeight='medium' fontSize='md'>
                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to={COUNTRIES_PAGE}>Главная</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href='#'>Страница входа</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Heading color={'gray.700'} size={'lg'}>
                Войдите, чтобы редактировать
            </Heading>
            <Box
                className="login-container"
                width={'33%'}
            >
                <Stack spacing="6">
                    <Stack spacing="5">
                        <EmailField />
                        <PasswordField />
                    </Stack>
                    <Stack spacing="3">
                        <Button
                            size={'md'}
                            colorScheme={'orange'}
                            type="submit"
                        >
                                Войти
                        </Button>
                        <HStack>
                            <Divider />
                            <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                                или
                            </Text>
                            <Divider />
                        </HStack>
                        <Button
                            size={'md'}
                            colorScheme={'orange'}
                            type="submit"
                            variant={'outline'}
                            rightIcon={<BiRocket />}
                        >
                            Raketa SSO
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </VStack>
    );
}

export default LoginPage;
