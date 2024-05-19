import {
  IconButton,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
  Text,
  Tooltip,
  MenuDivider,
  useDisclosure,
} from "@chakra-ui/react";
import { BiEditAlt, BiTrash, BiRedo } from "react-icons/bi";
import { DeleteIcon, HamburgerIcon, RepeatIcon } from "@chakra-ui/icons";
import {
  CountryReadNeedAutomaticUpdate,
  HTTPValidationError,
} from "../../api/modals.ts";
import { useState } from "react";
import { DrawerEditObject } from "../drawer-edit-object/DrawerEditObject.tsx";
import { RemoveObjectAlert } from "../remove-object-alert/RemoveObjectAlert.tsx";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import {ReviveObjectAlert} from "../revive-object-alert/ReviveObjectAlert.tsx";
import {ObjectRead} from "../../types/ObjectRead.ts";
import ReactCountryFlag from "react-country-flag";

type HeaderWithActionsProps = {
  objectTitle?: string;
  objectType: string;
  objectId?: number;
  objectCode?: string;
  isEditable?: boolean;
  isRemovable?: boolean;
  isAutoUpdatable?: CountryReadNeedAutomaticUpdate;
  deletedAt?: string;
  deletedAgo?: string;
  lastEditedAt?: string;
  lastEditedAgo?: string;
  refetchFunction: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<ObjectRead, HTTPValidationError>>;
  changeAutoUpdatableFunction: () => Promise<void>;
};

export function HeaderWithAction({ ...props }: HeaderWithActionsProps) {
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const { isOpen: isDeleteAlertOpen, onOpen: onDeleteAlertOpen, onClose: onDeleteAlertClose } = useDisclosure();
  const { isOpen: isReviveAlertOpen, onOpen: onReviveAlertOpen, onClose: onReviveAlertClose } = useDisclosure();
  const currentUser = null;

  const handleIsDrawerOpened = () => {
    setIsDrawerOpened(!isDrawerOpened);
  };

  return (
    <Flex w={"100%"} wrap={"nowrap"} gap={"20px"} alignItems={"flex-start"}>
      <DrawerEditObject
        isOpened={isDrawerOpened}
        handleOpenedState={handleIsDrawerOpened}
        refetchFunction={props.refetchFunction}
      />
      <RemoveObjectAlert
        isOpened={isDeleteAlertOpen}
        handleOpenedState={onDeleteAlertClose}
        refetchFunction={props.refetchFunction}
        objectName={props.objectTitle}
        objectType={props.objectType}
        objectId={props.objectId}
      />
      <ReviveObjectAlert
          isOpened={isReviveAlertOpen}
          handleOpenedState={onReviveAlertClose}
          refetchFunction={props.refetchFunction}
          objectName={props.objectTitle}
          objectType={props.objectType}
          objectId={props.objectId}
      />
      <VStack flexGrow={1} alignItems={"left"} padding={"20px 20px 20px 20px"}>
        <CardHeader padding={"0"}>
          <Heading size="md">{props.objectTitle} {props.objectCode && <ReactCountryFlag countryCode={props.objectCode} style={{
            fontSize: '24px',
          }} />}</Heading>
        </CardHeader>
        <HStack>
          <Flex alignItems={"center"} gap={"5px"}>
            <Tooltip
              hasArrow
              display={(props.deletedAt as string) && 'none'}
              padding={"5px"}
              placement="bottom-end"
              label={
                (props.isAutoUpdatable as boolean)
                  ? "Автообновление включено"
                  : "Автообновление выключено"
              }
              bg={(props.isAutoUpdatable as boolean) ? "green.100" : "red.100"}
              color="gray.700"
            >
              <HStack>
                {(props.deletedAt as string) ?? (
                <RepeatIcon
                  color={
                    (props.isAutoUpdatable as boolean) ? "green.500" : "red.500"
                  }
                />)}
                <Text fontSize="sm">
                  {(props.deletedAt as string) ? `Удаленный ${props.objectType.toLowerCase()}` : props.objectType}
                </Text>
              </HStack>
            </Tooltip>
          </Flex>
          <Text as={"samp"}>/</Text>
          <Flex alignItems={"center"} gap={"5px"}>
            <Tooltip
              hasArrow
              padding={"5px"}
              placement="bottom-end"
              label={(props.deletedAt as string) ? props.deletedAt : props.lastEditedAt}
              bg={"gray.100"}
              color="gray.700"
            >
              <HStack>
                {(props.deletedAt as string) ? <DeleteIcon color={"red.500"} /> : <BiEditAlt />}
                <Text fontSize="sm">{(props.deletedAgo as string) ? props.deletedAgo : props.lastEditedAgo}</Text>
              </HStack>
            </Tooltip>
          </Flex>
        </HStack>
      </VStack>
      <HStack padding={"10px 10px 20px 20px"}>
        { currentUser ?
            (
                <Menu placement={"bottom-end"}>
                  <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<HamburgerIcon />}
                      variant="outline"
                      disabled
                  />
                  <MenuList>
                    <MenuItem onClick={handleIsDrawerOpened} icon={<BiEditAlt />}>
                      Редактировать
                    </MenuItem>
                    <MenuItem onClick={() => props.changeAutoUpdatableFunction()} icon={<RepeatIcon />}>
                      {(props.isAutoUpdatable as boolean) ? 'Выключить автообновление' : 'Включить автообновление'}
                    </MenuItem>
                    <MenuDivider />
                    {(props.deletedAt as string) ? (
                        <MenuItem onClick={onReviveAlertOpen} icon={<BiRedo />}>
                          Восстановить
                        </MenuItem>
                    ) : (
                        <MenuItem onClick={onDeleteAlertOpen} icon={<BiTrash />}>
                          Удалить
                        </MenuItem>
                    )}
                  </MenuList>
                </Menu>
            ) :
            <></>
        }
      </HStack>
    </Flex>
  );
}
