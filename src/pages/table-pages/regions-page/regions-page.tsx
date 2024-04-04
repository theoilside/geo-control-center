import {Table, TableContainer, Tbody, Td, Th, Thead, Tr, VStack, Flex} from "@chakra-ui/react";
import TabsMenu from "../../../components/tabs-menu/TabsMenu.tsx";

function RegionsPage() {
    return (
        <VStack spacing={'30px'}>
            <TabsMenu selectedTabIndex={1}/>
            <Flex width={'100%'}>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th isNumeric>ID</Th>
                                <Th>Название (RU)</Th>
                                <Th>Название (EN)</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>1</Td>
                                <Td>Свердловская область</Td>
                                <Td>Sverdlovsk Oblast</Td>
                            </Tr>
                            <Tr>
                                <Td>2</Td>
                                <Td>Московская область</Td>
                                <Td>Moscow Oblast</Td>
                            </Tr>
                            <Tr>
                                <Td>3</Td>
                                <Td>Омская область</Td>
                                <Td>Omsk Oblast</Td>
                            </Tr>
                            <Tr>
                                <Td>4</Td>
                                <Td>Ленинградская область</Td>
                                <Td>Leningrad Oblast</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Flex>
        </VStack>

    )
}

export default RegionsPage;
