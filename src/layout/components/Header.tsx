import { Link } from "react-router-dom";
import {
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  VStack,
  Text,
  Card,
  useToast,
} from "@chakra-ui/react";
import { COUNTRIES_PAGE } from "../../routes/route-paths.ts";
import logo from "../../assets/images/logo.png";
import { LoginButton } from "./LoginButton.tsx";
import {
  useAuthJwtLogoutAuthLogoutPost,
  useUsersCurrentUserAuthMeGet,
} from "../../api/generated/reactQuery/auth/auth.ts";
import { LogoutButton } from "./LogoutButton.tsx";
import { queryClient } from "../../main.tsx";

export default function Header() {
  const { data: currentUserData, isError } = useUsersCurrentUserAuthMeGet();
  const { mutateAsync: postLogout } = useAuthJwtLogoutAuthLogoutPost();
  const toast = useToast();

  const handleLogout = async () => {
    await postLogout();
    await queryClient.resetQueries({
      queryKey: [`/auth/me`],
    });
    toast({
      description: "Вы вышли из аккаунта",
      variant: "subtle",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <VStack padding={"16px 0 16px 0"} as={"header"} maxW={"100vw"} gap={"16px"}>
      <Flex
        w={"100%"}
        wrap={"nowrap"}
        align={"center"}
        justifyContent={"space-between"}
      >
        <Link to={COUNTRIES_PAGE} style={{ flexDirection: "row" }}>
          <HStack spacing={"3"} justify={"left"} flexGrow={"1"}>
            <Image src={logo} boxSize={"30px"} />
            <Heading size={"md"} color={"orange.500"}>
              Geo Control Center
            </Heading>
          </HStack>
        </Link>
        {currentUserData && !isError ? (
          <HStack spacing={"10px"}>
            <Card padding={"4px 10px"} variant={"outline"}>
              <Text color={"gray.700"} fontSize={"sm"}>
                {currentUserData.email}
              </Text>
            </Card>
            <LogoutButton handleLogout={handleLogout} />
          </HStack>
        ) : (
          <LoginButton />
        )}
      </Flex>
      <Divider />
    </VStack>
  );
}
