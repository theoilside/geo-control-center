import {Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, VStack} from "@chakra-ui/react";
import TabsMenu from "../../../components/tabs-menu/TabsMenu.tsx";

function CountriesPage() {
    return (
        <VStack spacing={'40px'}>
            <TabsMenu selectedTabIndex={0} />
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
                            <Td>Россия</Td>
                            <Td>Russia</Td>
                        </Tr>
                        <Tr>
                            <Td>2</Td>
                            <Td>Китай</Td>
                            <Td>China</Td>
                        </Tr>
                        <Tr>
                            <Td>3</Td>
                            <Td>Канада</Td>
                            <Td>Canada</Td>
                        </Tr>
                        <Tr>
                            <Td>4</Td>
                            <Td>Соединенные Штаты Америки</Td>
                            <Td>United States of America</Td>
                        </Tr>
                        <Tr>
                            <Td>5</Td>
                            <Td>Франция</Td>
                            <Td>France</Td>
                        </Tr>
                        <Tr>
                            <Td>6</Td>
                            <Td>Антарктида</Td>
                            <Td>Antarctica</Td>
                        </Tr>
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th isNumeric>ID</Th>
                            <Th>Название (RU)</Th>
                            <Th>Название (EN)</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </VStack>

    )
}

export default CountriesPage;
