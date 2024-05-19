import {Box, Heading, HStack, Text, Tooltip} from "@chakra-ui/react";
import {InfoOutlineIcon} from "@chakra-ui/icons";

type RowObjectInfoProps = {
    title: string;
    content?: string | number | undefined | null;
    tooltip?: string;
}

export function RowObjectInfo({...props}: RowObjectInfoProps) {
    return (
      <Box>
        <HStack spacing={"8px"}>
          <Heading size="xs" textTransform="uppercase">
            {props.title}
          </Heading>
          {props.tooltip && (
            <Tooltip
              hasArrow
              padding={"5px"}
              placement='top'
              label={props.tooltip}
              bg="gray.100"
              color="gray.700"
            >
              <InfoOutlineIcon />
            </Tooltip>
          )}
        </HStack>

        <Text pt="2" fontSize="sm">
          {props.content}
        </Text>
      </Box>
    );
}
