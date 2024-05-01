import {
    Button,
    CardHeader,
    Flex,
    Heading, HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import {BiEditAlt, BiTrash} from "react-icons/bi";
import {ChevronDownIcon} from "@chakra-ui/icons";

type HeaderWithActionsProps = {
    title?: string;
    isEditable?: boolean;
    isRemovable?: boolean;
}

export function HeaderWithAction({...props}: HeaderWithActionsProps) {
    return (
        <Flex w={"100%"} wrap={"nowrap"} gap={"20px"}>
            <CardHeader flexGrow={1}>
                <Heading size="md">{props.title}</Heading>
            </CardHeader>
            <HStack paddingRight={'10px'}>
            <Menu placement={'bottom-end'}>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant={'outline'}>
                    Изменить
                </MenuButton>
                <MenuList>
                    <MenuItem icon={<BiEditAlt />}>Редактировать</MenuItem>
                    <MenuItem icon={<BiTrash />}>Удалить</MenuItem>
                </MenuList>
            </Menu>
            </HStack>
        </Flex>
    );
}
