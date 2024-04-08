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
    HStack
} from "@chakra-ui/react";
import TabsMenu from "../../../components/tabs-menu/TabsMenu.tsx";
import {countries} from "../../../mocks/countries.ts";
import {ArrowForwardIcon, ExternalLinkIcon} from '@chakra-ui/icons';
import {Link as ReactRouterLink, useNavigate} from 'react-router-dom'
import TableHeader from "../../../components/table-header/TableHeader.tsx";
import {getCountryPagePathById} from "../../../routes/routes.ts";
import {useState} from "react";

// type CountriesPageProps = {
//     countries: Country[];
// }

function CountriesPage() {
    const [isDeletedIncluded, setIsDeletedIncluded] = useState<boolean>(false);

    const handleDeletedIncluded = () => {
        setIsDeletedIncluded(!isDeletedIncluded);
    }

    function getFilteredObjects(isDeletedIncluded: boolean) {
        return countries.filter(country => {
            if (country.del) {
                if (isDeletedIncluded)
                    return country;
                return;
            }
            return country;
        });
    }

    const navigate = useNavigate();

    return (
        <VStack spacing={'30px'}>
            <TabsMenu selectedTabIndex={0}/>
            <TableHeader
                isEditingAvailable={true}
                isSearchAvailable={true}
                isMapAvailable={false}
                onDeletedFlagChange={handleDeletedIncluded}
            />
            <Flex width={'100%'}>
                <TableContainer>
                    <Table
                        variant='simple'
                        style={{tableLayout: 'auto', width: '100%'}}
                        css={{
                            "&::-webkit-scrollbar": {
                                width: "4px",
                            },
                            "&::-webkit-scrollbar-track": {
                                width: "6px",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                background: "#8ccef0",
                                borderRadius: "24px",
                            },
                        }}
                    >
                        <Thead>
                            <Tr>
                                <Th
                                    position={'sticky'}
                                    left={'0'}
                                    backgroundColor={'#edf2f7'}
                                    isNumeric
                                >
                                    {''}
                                </Th>
                                <Th>alpha-2</Th>
                                <Th>alpha-3</Th>
                                <Th>Название (EN)</Th>
                                <Th>Название (RU)</Th>
                                <Th isNumeric>Широта</Th>
                                <Th isNumeric>Долгота</Th>
                                <Th>Телефонный код</Th>
                                <Th>
                                    OSM ID
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {getFilteredObjects(isDeletedIncluded).map((country) => (
                                <Tr width={'100%'}>
                                    <Td
                                        color={'orange.700'}
                                        position={'sticky'}
                                        left={'0'}
                                        backgroundColor={'#edf2f7'}
                                        isNumeric
                                    >
                                        <HStack spacing={'10px'}>
                                            <Link as={ReactRouterLink} to={getCountryPagePathById(country.id)} isExternal>
                                                {country.id}
                                            </Link>
                                            <IconButton
                                                aria-label={'Перейти'}
                                                icon={<ArrowForwardIcon/>}
                                                size={'xs'}
                                                colorScheme='orange'
                                                isRound={true}
                                                onClick={() => navigate(getCountryPagePathById(country.id))}
                                            />
                                        </HStack>
                                    </Td>
                                    <Td>{country.code_alpha2}</Td>
                                    <Td>{country.code_alpha3}</Td>
                                    <Td>{country.name.en}</Td>
                                    <Td>{country.name.ru}</Td>
                                    <Td>{country.geometry.lat}</Td>
                                    <Td>{country.geometry.lon}</Td>
                                    <Td>+{country.phone_code}</Td>
                                    <Td width={'100vw'}>
                                        <Link href={`https://openstreetmap.org/relation/${country.osm_id}`} color={'teal'} isExternal>
                                            {country.osm_id}<ExternalLinkIcon mx='4px' />
                                        </Link>
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
