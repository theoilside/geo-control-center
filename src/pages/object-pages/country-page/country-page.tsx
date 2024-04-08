import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Card,
    CardBody,
    CardHeader,
    Heading,
    Stack,
    StackDivider,
    VStack,
    Text,
    Flex, Button,
    HStack, Tooltip, ScaleFade, Fade, Link
} from "@chakra-ui/react";
import {Link as RouterLink, useParams} from "react-router-dom";
import {COUNTRIES_PAGE} from "../../../routes/route-paths.ts";
import {countries} from "../../../mocks/countries.ts";
import ErrorPage from "../../error-page/error-page.tsx";
import {BiMapAlt, BiEditAlt} from "react-icons/bi";
import {useEffect, useState} from "react";
import {ExternalLinkIcon} from "@chakra-ui/icons";

// type CountryPageProps = {
//     countryId: number;
//     countryName: string;
// }

function CountryPage() {
    const [pageIsOpen, setPageIsOpen] = useState<boolean>(false);
    const { countryId } = useParams();
    const countryIndex = parseInt(countryId as string) - 1;
    const country = countries[countryIndex];

    useEffect(() => {
        (async () => {
            await delay(100);
            setPageIsOpen(true);
        })();
    }, []);

    if (countryIndex < 0 || countryIndex >= countries.length) {
        return(<ErrorPage />)
    }

    function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    return (
        <VStack width={'100%'} spacing={'20px'} align={'left'}>
            <Fade in={pageIsOpen}>
                <Breadcrumb fontWeight='medium' fontSize='md'>
                    <BreadcrumbItem>
                        <BreadcrumbLink as={RouterLink} to={COUNTRIES_PAGE}>Страны</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href='#'>Страна #{country.id}</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Fade>

            <ScaleFade initialScale={0.95} in={pageIsOpen}>
                <Card variant={'outline'} maxW={'60%'}>
                    <Flex w={'100%'} wrap={'nowrap'} gap={'20px'}>
                        <CardHeader flexGrow={1}>
                            <Heading size='md'>{country.name.ru} ({country.name.en})</Heading>
                        </CardHeader>
                        <HStack padding={'15px 20px'}>
                            <Tooltip hasArrow label='Войдите, чтобы редактировать' bg='gray.700'>
                                <Button variant={'outline'} colorScheme='orange' leftIcon={<BiEditAlt />} isDisabled>Редактировать</Button>
                            </Tooltip>
                            <Button leftIcon={<BiMapAlt />} colorScheme='orange'>
                                На карте
                            </Button>
                        </HStack>

                    </Flex>
                    <CardBody>
                        <Stack divider={<StackDivider />} spacing='4'>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Тип
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    Страна {country.del && ' (удалено)'}
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Код (alpha-2)
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    {country.code_alpha2}
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Код (alpha-3)
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    {country.code_alpha3}
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Широта
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    {country.geometry.lat}
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Долгота
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    {country.geometry.lon}
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Телефонный код
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    +{country.phone_code}
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    OpenStreetMap ID
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    <Link href={`https://openstreetmap.org/relation/${country.osm_id}`} color={'teal'} isExternal>
                                        {country.osm_id}<ExternalLinkIcon mx='4px' />
                                    </Link>
                                </Text>
                            </Box>
                        </Stack>
                    </CardBody>
                </Card>
            </ScaleFade>
        </VStack>
    );
}

export default CountryPage;
