import {
  Flex,
  HStack,
  Checkbox,
  Button,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import { BiPlus, BiMapAlt, BiSearch, BiRightArrowAlt } from "react-icons/bi";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DrawerAddCountry } from "../drawer-add-object/DrawerAddCountry.tsx";
import { IS_AUTO_SEARCH } from "../../settings.ts";
import { DrawerAddRegion } from "../drawer-add-object/DrawerAddRegion.tsx";
import {DrawerAddCity} from "../drawer-add-object/DrawerAddCity.tsx";

type TableHeaderProps = {
  objectType: string;
  isEditingAvailable: boolean;
  isMapAvailable: boolean;
  isSearchAvailable: boolean;
  isSearchByParentObjectIdAvailable: boolean;
  isSearchBySecondParentObjectIdAvailable?: boolean;
  onDeletedFlagChange: () => void;
  getObjectPagePathById: (objectId: number) => string;
  parentObjectName?: string;
  parentObjectId?: string | null;
  secondParentObjectName?: string;
  secondParentObjectId?: string | null;
  handleUpdateSearch: (
    term: string | null,
    regionId: string | null,
    countryId: string | null,
  ) => void;
};

function TableHeader({ ...props }: TableHeaderProps) {
  const [goToIdValue, setGoToIdValue] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [parentObjectId, setParentObjectId] = useState<string | null>(
    props.parentObjectId ?? null,
  );
  const [secondParentObjectId, setSecondParentObjectId] = useState<
    string | null
  >(props.secondParentObjectId ?? null);
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
    if (IS_AUTO_SEARCH) props.handleUpdateSearch(searchTerm, parentObjectId, secondParentObjectId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleSearch = () => {
    props.handleUpdateSearch(searchTerm, parentObjectId, secondParentObjectId);
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
      case "city": {
        return (
          <DrawerAddCity
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
      <HStack spacing={"10px"} flexGrow={1}>
        <InputGroup minW={"90px"} maxW={"100px"} width={"20%"}>
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
          <>
            <Divider orientation={"vertical"} />
            <InputGroup minW={"140px"} maxW={"160px"} width={"20%"}>
              <Input
                onChange={(event) => setParentObjectId(event.target.value)}
                value={parentObjectId ? parentObjectId : undefined}
                placeholder={`ID ${props.parentObjectName}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            </InputGroup>
          </>
        )}
        {props.isSearchBySecondParentObjectIdAvailable && (
          <InputGroup minW={"140px"} maxW={"160px"} width={"20%"}>
            <Input
              onChange={(event) => setSecondParentObjectId(event.target.value)}
              value={secondParentObjectId ? secondParentObjectId : undefined}
              placeholder={`ID ${props.secondParentObjectName}`}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </InputGroup>
        )}
        {props.isSearchAvailable && (
          <InputGroup maxW={"270px"} width={"30%"}>
            <Input
              onChange={(event) => setSearchQuery(event.target.value)}
              value={searchQuery ? searchQuery : undefined}
              placeholder="Название"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </InputGroup>
        )}
        <IconButton
          icon={<BiSearch />}
          onClick={() => handleSearch()}
          colorScheme={'orange'}
          aria-label={'Поиск'}
        />
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
