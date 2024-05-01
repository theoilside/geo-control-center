import { HStack, IconButton, Link, Td } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";

type TableCellIDProps = {
  idValue: number;
  linkFunction: (id: number) => string;
};

function TableCellID({ ...props }: TableCellIDProps) {
  const navigate = useNavigate();

  return (
    <Td
      color={"orange.700"}
      position={"sticky"}
      left={"0"}
      backgroundColor={"#edf2f7"}
      isNumeric
    >
      <HStack spacing={"10px"}>
        <Link
          as={ReactRouterLink}
          to={props.linkFunction(props.idValue)}
          isExternal
        >
          {props.idValue}
        </Link>
        <IconButton
          aria-label={"Перейти"}
          icon={<ArrowForwardIcon />}
          size={"xs"}
          colorScheme="orange"
          isRound={true}
          onClick={() => navigate(props.linkFunction(props.idValue))}
        />
      </HStack>
    </Td>
  );
}

export default TableCellID;
