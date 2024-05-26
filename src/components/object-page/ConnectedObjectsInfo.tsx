import {
  Button,
  Card,
  Flex,
  Heading,
  StackDivider,
  Text,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ObjectRead } from "../../types/ObjectRead.ts";

type ConnectedObjectsInfoProps = {
  connectedObjects: ObjectRead[] | undefined;
  connectedObjectsTypeName: string;
  goToSearchLink: string;
  goToObjectLink: string;
  headerTitle: string;
  isAllObjectsShown: boolean;
};

export function ConnectedObjectsInfo({ ...props }: ConnectedObjectsInfoProps) {
  const navigate = useNavigate();

  return (
    <Flex width={"100%"}>
      <VStack divider={<StackDivider />} width={"100%"} spacing={"20px"}>
        <VStack spacing={"10px"} width={"100%"}>
          <Heading size={"sm"} width={"100%"}>
            {props.headerTitle}
          </Heading>
          <Flex width={"100%"} flexWrap={"wrap"} gap={"10px"}>
            {props.connectedObjects ? (
              <>
                {props.connectedObjects.map((object) => (
                  <Card
                    key={object.id}
                    variant={"outline"}
                    padding={"8px 16px"}
                    height={"58px"}
                    onClick={() => navigate(`${props.goToObjectLink}${object.id}`)}
                    style={{cursor: 'pointer'}}
                    _hover={{backgroundColor: '#fffaf5'}}
                  >
                    <Text fontSize={"xs"}>
                      {props.connectedObjectsTypeName} #{object.id}
                    </Text>
                    <Text fontSize={"sm"} as="b">
                      {object.name}
                    </Text>
                  </Card>
                ))}
                {!props.isAllObjectsShown &&
                    <Button
                        height={"58px"}
                        variant={"outline"}
                        colorScheme={"orange"}
                        onClick={() => navigate(props.goToSearchLink)}
                    >
                      Смотреть все
                    </Button>
                }
              </>
            ) : (
              <Spinner color="orange.700" />
            )}
          </Flex>
        </VStack>
      </VStack>
    </Flex>
  );
}
