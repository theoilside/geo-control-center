import {
  Container,
  VStack,
  Text,
  Divider,
  Stack,
  Button,
  HStack,
} from "@chakra-ui/react";
import { BiBookBookmark, BiEnvelope } from "react-icons/bi";

function Footer() {
  return (
    <Container
      padding="30px 5vw 2vh 5vw"
      as="footer"
      role="contentinfo"
      maxWidth={"100%"}
    >
      <VStack spacing={"2"}>
        <Divider />
        <Stack
          direction={"row"}
          justify={"space-between"}
          width={"100%"}
          align={"center"}
        >
          <HStack spacing={"10px"}>
            <Button
              size={"xs"}
              colorScheme={"gray"}
              variant={"outline"}
              rightIcon={<BiBookBookmark />}
            >
              API Swagger
            </Button>
            <Button
              size={"xs"}
              colorScheme={"gray"}
              variant={"outline"}
              rightIcon={<BiEnvelope />}
            >
              Написать нам
            </Button>
          </HStack>

          <Text fontSize="sm" color="custom.blue.200">
            Geo Control Center, {new Date().getFullYear()} &copy;
          </Text>
        </Stack>
      </VStack>
    </Container>
  );
}

export default Footer;
