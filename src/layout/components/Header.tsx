import { Link } from "react-router-dom";
import {
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  VStack,
} from "@chakra-ui/react";
import { COUNTRIES_PAGE } from "../../routes/route-paths.ts";
import logo from "../../assets/images/logo.png";
import LoginButton from "../components/LoginButton";

function Header() {
  return (
    <VStack padding={"16px 0 16px 0"} as={"header"} maxW={"100%"} gap={"16px"}>
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
        <LoginButton />
      </Flex>
      <Divider />
    </VStack>
  );
}

export default Header;
