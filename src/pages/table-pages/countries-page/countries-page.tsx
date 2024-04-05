import {
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    VStack,
    Flex,
    IconButton,
    Link,
} from "@chakra-ui/react";
import TabsMenu from "../../../components/tabs-menu/TabsMenu.tsx";
import {countries} from "../../../mocks/countries.ts";
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Link as ReactRouterLink } from 'react-router-dom'

// type CountriesPageProps = {
//     countries: Country[];
// }

function CountriesPage() {
    return (
        <VStack spacing={'30px'}>
            <TabsMenu selectedTabIndex={0}/>
            <Flex width={'100%'}>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th isNumeric>ID</Th>
                                <Th>alpha-2</Th>
                                <Th>alpha-3</Th>
                                <Th>Название (EN)</Th>
                                <Th>Название (RU)</Th>
                                <Th isNumeric>Широта</Th>
                                <Th isNumeric>Долгота</Th>
                                <Th>Телефонный код</Th>
                                <Th>OSM ID</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {countries.map((country) => (
                                <Tr>
                                    <Td color={'orange.700'}><Link as={ReactRouterLink} to='#' isExternal>{country.id}</Link></Td>
                                    <Td>{country.code_alpha2}</Td>
                                    <Td>{country.code_alpha3}</Td>
                                    <Td>{country.name.en}</Td>
                                    <Td>{country.name.ru}</Td>
                                    <Td>{country.geometry.lat}</Td>
                                    <Td>{country.geometry.lon}</Td>
                                    <Td>+{country.phone_code}</Td>
                                    <Td>{country.osm_id}</Td>
                                    <Td>
                                        <IconButton
                                            aria-label={'Перейти'}
                                            icon={<ArrowForwardIcon />}
                                            size={'sm'}
                                            colorScheme='orange'
                                        />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Flex>
        </VStack>

    )
}

export default CountriesPage;
