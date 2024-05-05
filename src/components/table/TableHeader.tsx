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
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DrawerAddObject } from "../drawer-add-object/DrawerAddObject.tsx";
import { IS_AUTO_SEARCH } from "../../settings.ts";

type TableHeaderProps = {
  isEditingAvailable: boolean;
  isMapAvailable: boolean;
  isSearchAvailable: boolean;
  onDeletedFlagChange: () => void;
  getObjectPagePathById: (objectId: number) => string;
  handleSearch: (term: string | null) => void;
};

function TableHeader({ ...props }: TableHeaderProps) {
  const [goToIdValue, setGoToIdValue] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
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
        navigate(props.getObjectPagePathById(objectId));
      } finally {
        console.log("Неправильный тип в goToId");
      }
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => setSearchTerm(searchQuery), 1000);
    return () => clearTimeout(timeOutId);
  }, [searchQuery]);

  useEffect(() => {
    if (IS_AUTO_SEARCH) props.handleSearch(searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleSearch = (term: string | null) => {
    props.handleSearch(term);
  };

  const handleIsDrawerOpened = () => {
    setIsDrawerOpened(!isDrawerOpened);
  };

  return (
    <Flex w={"100%"} wrap={"nowrap"}>
      <DrawerAddObject
        isOpened={isDrawerOpened}
        handleOpenedState={(isOpened) => setIsDrawerOpened(isOpened)}
      />
      <HStack spacing={"20px"} flexGrow={1}>
        <InputGroup maxW={"120px"}>
          <Input
            onChange={handleGoToIdValueChange}
            type={'number'}
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
            <Input
              onChange={(event) => setSearchQuery(event.target.value)}
              value={searchQuery as string}
              placeholder="Поиск"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(searchQuery);
                }
              }}
            />
            <InputRightElement>
              <IconButton
                onClick={() => handleSearch(searchTerm)}
                aria-label={"Поиск"}
                icon={<BiSearch />}
                colorScheme="gray"
                variant="ghost"
                h="1.85rem"
                size="sm"
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
          <Button
            leftIcon={<BiPlus />}
            colorScheme="orange"
            onClick={handleIsDrawerOpened}
          >
            Добавить
          </Button>
        )}
      </HStack>
    </Flex>
  );
}

export default TableHeader;
