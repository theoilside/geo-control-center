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
import { DrawerAddCountry } from "../drawer-add-object/DrawerAddCountry.tsx";
import { IS_AUTO_SEARCH } from "../../settings.ts";
import { DrawerAddRegion } from "../drawer-add-object/DrawerAddRegion.tsx";

type TableHeaderProps = {
  objectType: string;
  isEditingAvailable: boolean;
  isMapAvailable: boolean;
  isSearchAvailable: boolean;
  isSearchByParentObjectIdAvailable: boolean;
  onDeletedFlagChange: () => void;
  getObjectPagePathById: (objectId: number) => string;
  handleSearch: (term: string | null) => void;
  handleChangeParentObjectId?: (parentObjectId: string | null) => void;
  parentObjectName?: string;
  parentObjectId?: string | null;
};

function TableHeader({ ...props }: TableHeaderProps) {
  const [goToIdValue, setGoToIdValue] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [parentObjectId, setParentObjectId] = useState<string | null>(
    props.parentObjectId ?? null,
  );
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const navigate = useNavigate();
  const isGoToIdValueInvalid: boolean = false;

  const handleGoToIdValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setGoToIdValue(evt.target.value);
  };

  const handleGoToId = (goToIdValue: string | null) => {
    if (goToIdValue) {
      const objectId = parseInt(goToIdValue);
      navigate(props.getObjectPagePathById(objectId));
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

  const handleSearchByParentObjectId = (parentObjectId: string | null) => {
    if (props.handleChangeParentObjectId)
      props.handleChangeParentObjectId(parentObjectId);
  };

  const handleIsDrawerOpened = () => {
    setIsDrawerOpened(!isDrawerOpened);
  };

  function getDrawer(objectType: string) {
    switch (objectType) {
      case "region": {
        return (
          <DrawerAddRegion
            isOpened={isDrawerOpened}
            handleOpenedState={(isOpened) => setIsDrawerOpened(isOpened)}
          />
        );
      }
      default: {
        return (
          <DrawerAddCountry
            isOpened={isDrawerOpened}
            handleOpenedState={(isOpened) => setIsDrawerOpened(isOpened)}
          />
        );
      }
    }
  }

  return (
    <Flex w={"100%"} wrap={"nowrap"}>
      {getDrawer(props.objectType)}
      <HStack spacing={"20px"} flexGrow={1}>
        <InputGroup minW={"100px"} maxW={"130px"} width={"20%"}>
          <Input
            onChange={handleGoToIdValueChange}
            type={"number"}
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
        {props.isSearchByParentObjectIdAvailable && (
          <InputGroup minW={"140px"} maxW={"160px"} width={"20%"}>
            <Input
              onChange={(event) => setParentObjectId(event.target.value)}
              value={parentObjectId ? parentObjectId : undefined}
              placeholder={`ID ${props.parentObjectName}`}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchByParentObjectId(parentObjectId);
                }
              }}
            />
            <InputRightElement>
              <IconButton
                onClick={() => handleSearchByParentObjectId(parentObjectId)}
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
        {props.isSearchAvailable && (
          <InputGroup maxW={"270px"} width={"30%"}>
            <Input
              onChange={(event) => setSearchQuery(event.target.value)}
              value={searchQuery ? searchQuery : undefined}
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
