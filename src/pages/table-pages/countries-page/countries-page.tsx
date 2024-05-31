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
import {useEffect, useState} from "react";
import { ROWS_PER_PAGE } from "../../../settings.ts";
import { useSearchCountriesApiCountryGet } from "../../../api/generated/reactQuery/country/country.ts";
import { formatDate } from "../../../components/formatDate.ts";
import { Pagination } from "../../../components/table/Pagination.tsx";
import { NotFound } from "../../../components/table/NotFound.tsx";
import {useUsersCurrentUserAuthMeGet} from "../../../api/generated/reactQuery/auth/auth.ts";

export default function CountriesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [isDeletedIncluded, setIsDeletedIncluded] = useState(false);
  const { data: currentUserData, isError: isErrorGettingCurrentUser } = useUsersCurrentUserAuthMeGet();

  const { data: countriesPage, isLoading, refetch } = useSearchCountriesApiCountryGet({
    page_number: currentPage,
    page_size: ROWS_PER_PAGE,
    term: searchTerm,
    include_deleted: isDeletedIncluded,
  });

  useEffect(() => {
    refetch();
  }, [searchTerm, refetch]);

  function handleSearchUpdate(term: string | null) {
    setSearchTerm(term);
  }

  function handleNextPageClick() {
    setCurrentPage(currentPage + 1);
  }

  function handlePrevPageClick() {
    setCurrentPage(currentPage - 1);
  }

  const handleDeletedIncluded = () => {
    setIsDeletedIncluded(!isDeletedIncluded);
  };

  const navigate = useNavigate();

  return (
    <>
      <VStack spacing={"30px"}>
        <TabsMenu selectedTabIndex={0} />
        <TableHeader
          objectType={'country'}
          isEditingAvailable={!!currentUserData && !isErrorGettingCurrentUser}
          isSearchAvailable={true}
          isMapAvailable={false}
          onDeletedFlagChange={handleDeletedIncluded}
          getObjectPagePathById={getCountryPagePathById}
          isSearchByParentObjectIdAvailable={false}
          handleUpdateSearch={handleSearchUpdate}
        />
        <Flex width={"100%"} direction={"column"} gap={"15px"}>
          <Skeleton isLoaded={!isLoading}>
            <TableContainer>
              {countriesPage?.data.length == 0 ? (
                <NotFound />
              ) : (
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
                        style={{ textAlign: "start" }}
                      >
                        {""}
                      </Th>
                      <Th style={{ textAlign: "start" }}>Название</Th>
                      <Th style={{ textAlign: "start" }}>alpha-2</Th>
                      <Th style={{ textAlign: "start" }}>alpha-3</Th>
                      <Th style={{ textAlign: "start" }}>Телефон</Th>
                      <Th style={{ textAlign: "start" }}>OSM</Th>
                      <Th style={{ textAlign: "start" }}>Изменено</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {countriesPage?.data.map((country) => (
                      <Tr
                        key={country.id}
                        width={"100%"}
                        backgroundColor={
                          country.deleted_at ? "#f7eded" : "white"
                        }
                      >
                        <Td
                          color={"orange.700"}
                          position={"sticky"}
                          left={"0"}
                          backgroundColor={"#edf2f7"}
                          isNumeric
                        >
                          <Flex width={"70px"} justifyContent={"space-between"}>
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
                        <Td
                            textOverflow={'ellipsis'}
                            maxW={'300px'}
                            whiteSpace={'nowrap'}
                            overflow={'hidden'}
                        >
                          {country.name}
                        </Td>
                        <Td>{country.iso3116_alpha2}</Td>
                        <Td>{country.iso3166_alpha3}</Td>
                        <Td>{country.phone_code}</Td>
                        <Td>
                          <Link
                            href={`https://nominatim.openstreetmap.org/ui/details.html?osmtype=${country?.osm_type}&osmid=${country?.osm_id}`}
                            color={"teal"}
                            isExternal
                          >
                            {country.osm_type}
                            {country.osm_id}
                            <ExternalLinkIcon mx="4px" />
                          </Link>
                        </Td>
                        <Td width={"100vw"}>
                          {formatDate(country.last_updated_at)}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )}
            </TableContainer>
          </Skeleton>
          {countriesPage && countriesPage.pagination.total_pages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={countriesPage?.pagination.total_pages}
              handleNextPageClick={handleNextPageClick}
              handlePrevPageClick={handlePrevPageClick}
            />
          )}
        </Flex>
      </VStack>
    </>
  );
}
