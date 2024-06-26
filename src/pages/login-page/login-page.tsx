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
  BreadcrumbItem,
  BreadcrumbLink,
  useToast,
} from "@chakra-ui/react";
import PasswordField from "../../components/login-page/PasswordField.tsx";
import EmailField from "../../components/login-page/EmailField.tsx";
import { BiRocket } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { COUNTRIES_PAGE } from "../../routes/route-paths.ts";
import {useEffect, useState} from "react";
import {useAuthJwtLoginAuthLoginPost, useUsersCurrentUserAuthMeGet} from "../../api/generated/reactQuery/auth/auth.ts";
import { BodyAuthJwtLoginAuthLoginPost } from "../../api/generated/model";
import { queryClient } from "../../main.tsx";

function LoginPage() {
  const [loginForm, setLoginForm] =
    useState<Partial<BodyAuthJwtLoginAuthLoginPost>>();
  const { data: currentUserData, isError: isErrorGettingCurrentUser } = useUsersCurrentUserAuthMeGet();
  const navigate = useNavigate();
  const toast = useToast();

  const { mutateAsync, isError: isErrorLoggingIn } = useAuthJwtLoginAuthLoginPost({
    mutation: {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [`/auth/me`],
        });
        toast({
          description: "Вы вошли в аккаунт",
          variant: "subtle",
          status: "success",
          duration: 3000,
        });
        navigate(COUNTRIES_PAGE);
      },
      onError: async () => {
        toast({
          description: "Проверьте введенные данные",
          variant: "subtle",
          status: "error",
          duration: 3000,
        });
      }
    },
  });

  function handleSetLoginForm(newForm: Partial<BodyAuthJwtLoginAuthLoginPost>) {
    setLoginForm((prevState) => ({ ...prevState, ...newForm }));
  }

  useEffect(() => {
    if (currentUserData && !isErrorGettingCurrentUser) {
      navigate(COUNTRIES_PAGE);
    }
  }, [navigate, currentUserData, isErrorGettingCurrentUser]);


  return (
    <VStack width={"100%"} spacing={"20px"} align={"left"}>
      <Breadcrumb fontWeight="medium" fontSize="md">
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to={COUNTRIES_PAGE}>
            Главная
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">Страница входа</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Heading color={"gray.700"} size={"lg"}>
        Войдите, чтобы редактировать
      </Heading>
      <Box className="login-container" width={"33%"}>
        <Stack spacing="6">
          <Stack spacing="5">
            <EmailField handleFormChange={handleSetLoginForm} isInvalid={isErrorLoggingIn} />
            <PasswordField handleFormChange={handleSetLoginForm} isInvalid={isErrorLoggingIn} />
          </Stack>
          <Stack spacing="3">
            <Button
              onClick={() =>
                mutateAsync({
                  data: loginForm as BodyAuthJwtLoginAuthLoginPost,
                })
              }
              size={"md"}
              colorScheme={"orange"}
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
              size={"md"}
              colorScheme={"orange"}
              type="submit"
              variant={"outline"}
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
