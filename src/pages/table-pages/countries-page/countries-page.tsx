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
  Skeleton,
} from "@chakra-ui/react";
import TabsMenu from "../../../components/tabs-menu/TabsMenu.tsx";
import { ArrowForwardIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import TableHeader from "../../../components/table/TableHeader.tsx";
import { getCountryPagePathById } from "../../../routes/routes.ts";
import { useCallback, useState } from "react";
import { ROWS_PER_PAGE } from "../../../settings.ts";
import { useSearchCountriesApiCountryGet } from "../../../api/generated/reactQuery/country/country.ts";
import {formatDate} from "../../../components/formatDate.ts";
import {Pagination} from "../../../components/table/Pagination.tsx";
// import {
//   searchCountriesApiCountryGet,
// } from "../../../api/generated/reactQuery/country/country.ts";

// type CountriesPageProps = {
//     countries: Country[];
// }

function CountriesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeletedIncluded, setIsDeletedIncluded] = useState(false);

  const {
    data: countriesPage,
    isLoading,
  } = useSearchCountriesApiCountryGet({
    page_number: currentPage,
    page_size: ROWS_PER_PAGE,
  });

  const handleNextPageClick = useCallback(() => {
    const current = currentPage;
    const next = current + 1;
    const total = countriesPage?.pagination.total_pages ?? 1;
    setCurrentPage(next <= total ? next : current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    return countriesPage?.data.filter((country) => {
      if (country.deleted_at) {
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
          <Skeleton isLoaded={!isLoading}>
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
                  <Th>Название</Th>
                  <Th>alpha-2</Th>
                  <Th>alpha-3</Th>
                  <Th isNumeric>Широта</Th>
                  <Th isNumeric>Долгота</Th>
                  <Th>Телефон</Th>
                  <Th>OSM</Th>
                  <Th>Изменено</Th>
                </Tr>
              </Thead>
              <Tbody>
                {getFilteredObjects(isDeletedIncluded)?.map((country) => (
                  <Tr
                      width={"100%"}
                      backgroundColor={country.deleted_at ? "#f7eded" : 'white'}
                  >
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
                    <Td>{country.name}</Td>
                    <Td>{country.iso3116_alpha2}</Td>
                    <Td>{country.iso3166_alpha3}</Td>
                    <Td>{country.latitude}</Td>
                    <Td>{country.longitude}</Td>
                    <Td>{country.phone_code}</Td>
                    <Td>
                      <Link
                        href={`https://nominatim.openstreetmap.org/lookup?osm_ids=${country.osm_type}${country.osm_id}`}
                        color={"teal"}
                        isExternal
                      >
                        {country.osm_type}{country.osm_id}
                        <ExternalLinkIcon mx="4px" />
                      </Link>
                    </Td>
                    <Td width={"100vw"}>{formatDate(country.last_updated_at)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          </Skeleton>
          {(countriesPage && countriesPage.pagination.total_pages > 1) ??
              <Pagination
                  currentPage={currentPage}
                  totalPages={countriesPage?.pagination.total_pages}
                  handleNextPageClick={handleNextPageClick}
                  handlePrevPageClick={handlePrevPageClick}
              />
          }
        </Flex>
      </VStack>
    </>
  );
}

export default CountriesPage;
