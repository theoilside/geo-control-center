import {Flex, HStack, Checkbox, Button, InputGroup, Input, InputRightElement} from "@chakra-ui/react";
import {BiRevision, BiPlus, BiMapAlt, BiSearch} from 'react-icons/bi';

type TableHeaderProps = {
    isEditingAvailable: boolean,
    isMapAvailable: boolean,
    isSearchAvailable: boolean,
    onDeletedFlagChange: (() => void);
}

function TableHeader({...props}: TableHeaderProps) {
    return (
        <Flex w={'100%'} wrap={'nowrap'}>
            <HStack spacing={'20px'} flexGrow={1}>
                {props.isSearchAvailable &&
                    <InputGroup maxW={'270px'}>
                        <Input placeholder='Поиск' />
                        <InputRightElement>
                            <BiSearch />
                        </InputRightElement>
                    </InputGroup>
                }
                <Checkbox colorScheme='orange' onChange={() => props.onDeletedFlagChange()}>
                    Показывать удаленные
                </Checkbox>
                <Button leftIcon={<BiRevision />} colorScheme='orange' variant='outline'>
                    Обновить
                </Button>
            </HStack>
            <HStack spacing={'20px'}>
                {props.isMapAvailable &&
                    <Button leftIcon={<BiMapAlt />} colorScheme='orange' width={'260px'}>
                        Открыть карту
                    </Button>
                }
                {props.isEditingAvailable &&
                    <Button leftIcon={<BiPlus />} colorScheme='orange'>
                        Добавить
                    </Button>
                }
            </HStack>
        </Flex>
    );
}

export default TableHeader;
