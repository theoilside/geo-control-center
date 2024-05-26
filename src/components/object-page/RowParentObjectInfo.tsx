import {
  Box,
  Card,
  HStack,
  IconButton,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";

type RowParentObjectInfoProps = {
  parentObjectType: string;
  parentObjectId: number | string | undefined;
  parentObjectName: string | undefined;
  parentObjectLink: string | undefined;
  isLoading: boolean;
};

export function RowParentObjectInfo({ ...props }: RowParentObjectInfoProps) {
  const navigate = useNavigate();

  return (
    <Box>
      {props.isLoading ? (
        <Spinner />
      ) : (
        <Card
          variant={"outline"}
          padding={"8px 16px"}
          backgroundColor={"gray.100"}
          height={"58px"}
          _hover={{ backgroundColor: "#e8eef1" }}
          onClick={() =>
            navigate(`${props.parentObjectLink}${props.parentObjectId}`)
          }
          style={{ cursor: "pointer" }}
        >
          <HStack height={"100%"} justifyContent={"space-between"}>
            <VStack spacing={"0px"} alignItems={"flex-start"}>
              <Text fontSize={"xs"}>
                {props.parentObjectType} #{props.parentObjectId}
              </Text>
              <Text fontSize={"sm"} as="b">
                {props.parentObjectName}
              </Text>
            </VStack>
            <IconButton
              aria-label={"Перейти"}
              icon={<ArrowForwardIcon />}
              size={"xs"}
              colorScheme="orange"
              isRound={true}
            />
          </HStack>
        </Card>
      )}
    </Box>
  );
}
