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
  HStack,
  Button,
  Text,
} from "@chakra-ui/react";
import TabsMenu from "../../../components/tabs-menu/TabsMenu.tsx";
import { countries } from "../../../mocks/countries.ts";
import { ArrowForwardIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import TableHeader from "../../../components/table/TableHeader.tsx";
import { getCountryPagePathById } from "../../../routes/routes.ts";
import { useCallback, useState } from "react";
import { ROWS_PER_PAGE } from "../../../settings.ts";
// import {
//   searchCountriesApiCountryGet,
// } from "../../../api/generated/reactQuery/country/country.ts";

const getTotalPageCount = (rowCount: number): number =>
  Math.ceil(rowCount / ROWS_PER_PAGE);

// type CountriesPageProps = {
//     countries: Country[];
// }

function CountriesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeletedIncluded, setIsDeletedIncluded] = useState(false);

  const handleNextPageClick = useCallback(() => {
    const current = currentPage;
    const next = current + 1;
    const total = getTotalPageCount(countries.length);

    setCurrentPage(next <= total ? next : current);
  }, [currentPage]);

  const handlePrevPageClick = useCallback(() => {
    const current = currentPage;
    const prev = current - 1;

    setCurrentPage(prev > 0 ? prev : current);
  }, [currentPage]);

  const handleDeletedIncluded = () => {
    setIsDeletedIncluded(!isDeletedIncluded);
  };

  function getFilteredObjects(isDeletedIncluded: boolean) {
    return countries.filter((country) => {
      if (country.isDel) {
        if (isDeletedIncluded) return country;
        return;
      }
      return country;
    });
  }

  const navigate = useNavigate();

  return (
    <>
      <VStack spacing={"30px"}>
        <TabsMenu selectedTabIndex={0} />
        <TableHeader
          isEditingAvailable={true}
          isSearchAvailable={false}
          isMapAvailable={false}
          onDeletedFlagChange={handleDeletedIncluded}
          getObjectPagePathById={getCountryPagePathById}
        />
        <Flex width={"100%"} direction={"column"} gap={"15px"}>
          <TableContainer>
            <Table
              variant="simple"
              style={{ tableLayout: "auto", width: "100%" }}
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
                    position={"sticky"}
                    left={"0"}
                    backgroundColor={"#edf2f7"}
                    isNumeric
                  >
                    {""}
                  </Th>
                  <Th>alpha-2</Th>
                  <Th>alpha-3</Th>
                  <Th>Название (RU)</Th>
                  <Th>Название (EN)</Th>
                  <Th isNumeric>Широта</Th>
                  <Th isNumeric>Долгота</Th>
                  <Th>Телефон</Th>
                  <Th>OSM ID</Th>
                </Tr>
              </Thead>
              <Tbody>
                {getFilteredObjects(isDeletedIncluded)
                  .slice(
                    Math.max((currentPage - 1) * ROWS_PER_PAGE - 1, 0),
                    currentPage * ROWS_PER_PAGE,
                  )
                  .map((country) => (
                    <Tr width={"100%"}>
                      <Td
                        color={"orange.700"}
                        position={"sticky"}
                        left={"0"}
                        backgroundColor={"#edf2f7"}
                        isNumeric
                      >
                        <Flex width={"60px"} justifyContent={"space-between"}>
                          <Link
                            as={ReactRouterLink}
                            to={getCountryPagePathById(country.id)}
                            style={{ lineHeight: "24px" }}
                            isExternal
                          >
                            {country.id}
                          </Link>
                          <IconButton
                            aria-label={"Перейти"}
                            icon={<ArrowForwardIcon />}
                            size={"xs"}
                            colorScheme="orange"
                            isRound={true}
                            onClick={() =>
                              navigate(getCountryPagePathById(country.id))
                            }
                          />
                        </Flex>
                      </Td>
                      <Td>{country.codeAlpha2}</Td>
                      <Td>{country.codeAlpha3}</Td>
                      <Td>{country.name.ru}</Td>
                      <Td>{country.name.en}</Td>
                      <Td>{country.geometry.lat}</Td>
                      <Td>{country.geometry.lon}</Td>
                      <Td>+{country.phoneCode}</Td>
                      <Td width={"100vw"}>
                        <Link
                          href={`https://openstreetmap.org/relation/${country.osmId}`}
                          color={"teal"}
                          isExternal
                        >
                          {country.osmId}
                          <ExternalLinkIcon mx="4px" />
                        </Link>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
          <HStack>
            <Button onClick={handlePrevPageClick} size={"sm"}>
              ←
            </Button>
            <Text>
              Страница {currentPage} из {getTotalPageCount(countries.length)}
            </Text>
            <Button onClick={handleNextPageClick} size={"sm"}>
              →
            </Button>
          </HStack>
        </Flex>
      </VStack>
    </>
  );
}

export default CountriesPage;
