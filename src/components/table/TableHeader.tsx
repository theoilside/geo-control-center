import {
  Flex,
  HStack,
  Checkbox,
  Button,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { BiPlus, BiMapAlt, BiSearch, BiRightArrowAlt } from "react-icons/bi";
import { ChangeEvent, useState } from "react";
import { getCountryPagePathById } from "../../routes/routes.ts";
import { useNavigate } from "react-router-dom";
import { DrawerAddObject } from "../drawer-add-object/DrawerAddObject.tsx";

type TableHeaderProps = {
  isEditingAvailable: boolean;
  isMapAvailable: boolean;
  isSearchAvailable: boolean;
  onDeletedFlagChange: () => void;
  getObjectPagePathById: (objectId: number) => string;
};

function TableHeader({ ...props }: TableHeaderProps) {
  const [goToIdValue, setGoToIdValue] = useState<string | null>(null);
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const navigate = useNavigate();
  const isGoToIdValueInvalid: boolean = false;

  const handleGoToIdValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setGoToIdValue(evt.target.value);
  };

  const handleGoToId = (goToIdValue: string | null) => {
    if (goToIdValue) {
      try {
        const objectId = parseInt(goToIdValue);
        navigate(getCountryPagePathById(objectId));
      } finally {
        console.log("Неправильный тип в goToId");
      }
    }
  };

  const handleIsDrawerOpened = () => {
    setIsDrawerOpened(!isDrawerOpened);
  };

  return (
    <Flex w={"100%"} wrap={"nowrap"}>
      <DrawerAddObject isOpened={isDrawerOpened} handleOpenedState={(isOpened) => setIsDrawerOpened(isOpened)} />
      <HStack spacing={"20px"} flexGrow={1}>
        <InputGroup maxW={"120px"}>
          <Input
            onChange={handleGoToIdValueChange}
            placeholder="ID"
            isInvalid={isGoToIdValueInvalid}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleGoToId(goToIdValue);
              }
            }}
          />
          <InputRightElement>
            <IconButton
              onClick={() => handleGoToId(goToIdValue)}
              aria-label={"Перейти"}
              icon={<BiRightArrowAlt />}
              colorScheme="gray"
              variant="ghost"
              h="1.85rem"
              size="sm"
            />
          </InputRightElement>
        </InputGroup>
        {props.isSearchAvailable && (
          <InputGroup maxW={"270px"}>
            <Input placeholder="Поиск по названию" />
            <InputRightElement>
              <IconButton
                aria-label={"Поиск"}
                icon={<BiSearch />}
                colorScheme="gray"
                variant="ghost"
              />
            </InputRightElement>
          </InputGroup>
        )}
      </HStack>
      <HStack spacing={"20px"}>
        <Checkbox
          colorScheme="orange"
          onChange={() => props.onDeletedFlagChange()}
        >
          Показывать удаленные
        </Checkbox>
        {props.isMapAvailable && (
          <Button leftIcon={<BiMapAlt />} colorScheme="orange" width={"260px"}>
            Открыть карту
          </Button>
        )}
        {props.isEditingAvailable && (
          <Button leftIcon={<BiPlus />} colorScheme="orange" onClick={handleIsDrawerOpened}>
            Добавить
          </Button>
        )}
      </HStack>
    </Flex>
  );
}

export default TableHeader;
