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
import {
  Link as ReactRouterLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import TableHeader from "../../../components/table/TableHeader.tsx";
import {getCityPagePathById} from "../../../routes/routes.ts";
import {useEffect, useState} from "react";
import { ROWS_PER_PAGE } from "../../../settings.ts";
import { formatDate } from "../../../components/formatDate.ts";
import { Pagination } from "../../../components/table/Pagination.tsx";
import { NotFound } from "../../../components/table/NotFound.tsx";
import { useUsersCurrentUserAuthMeGet } from "../../../api/generated/reactQuery/auth/auth.ts";
import {useSearchCitiesApiCityGet} from "../../../api/generated/reactQuery/city/city.ts";

export default function CitiesPage() {
  const [searchParams] = useSearchParams();
  const newRegionId = searchParams.get("regionId");
  const newCountryId = searchParams.get("countryId");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [isDeletedIncluded, setIsDeletedIncluded] = useState<boolean>(false);
  const [regionId, setRegionId] = useState<string | null>(
    newRegionId ?? null,
  );
  const [countryId, setCountryId] = useState<string | null>(
    newCountryId ?? null,
  );
  const navigate = useNavigate();
  const { data: currentUserData, isError: isErrorGettingCurrentUser } =
    useUsersCurrentUserAuthMeGet();

  const { data: citiesPage, isLoading, refetch } = useSearchCitiesApiCityGet({
    page_number: currentPage,
    page_size: ROWS_PER_PAGE,
    term: searchTerm,
    include_deleted: isDeletedIncluded,
    region_id: regionId,
    country_id: countryId,
  });

  useEffect(() => {
    refetch();
  }, [regionId, countryId, searchTerm, refetch]);

  function handleSearchUpdate(term: string | null, regionId: string | null, countryId: string | null) {
    setSearchTerm(term);
    setRegionId(regionId);
    setCountryId(countryId);
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

  return (
    <VStack spacing={"30px"}>
      <TabsMenu selectedTabIndex={2} />
      <TableHeader
        objectType={"city"}
        isEditingAvailable={!!currentUserData && !isErrorGettingCurrentUser}
        isSearchAvailable={true}
        isMapAvailable={false}
        onDeletedFlagChange={handleDeletedIncluded}
        getObjectPagePathById={getCityPagePathById}
        isSearchByParentObjectIdAvailable={true}
        parentObjectName={"региона"}
        parentObjectId={regionId}
        isSearchBySecondParentObjectIdAvailable={true}
        secondParentObjectName={"страны"}
        secondParentObjectId={countryId}
        handleUpdateSearch={handleSearchUpdate}
      />
      <Flex width={"100%"} direction={"column"} gap={"15px"}>
        <Skeleton isLoaded={!isLoading}>
          <TableContainer className={"inset-wrapper"}>
            {citiesPage?.data.length == 0 ? (
              <NotFound />
            ) : (
              <Table
                variant="simple"
                style={{ tableLayout: "auto", width: "100%" }}
                className={"inset-container not-at-right"}
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
                    <Th style={{ textAlign: "start" }}>Название</Th>
                    <Th style={{ textAlign: "start" }}>Страна</Th>
                    <Th style={{ textAlign: "start" }}>Регион</Th>
                    <Th style={{ textAlign: "start" }}>Код</Th>
                    <Th style={{ textAlign: "start" }}>Часовой пояс</Th>
                    <Th style={{ textAlign: "start" }}>OSM</Th>
                    <Th style={{ textAlign: "start" }}>Изменено</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {citiesPage?.data.map((city) => (
                    <Tr
                      width={"100%"}
                      backgroundColor={city.deleted_at ? "#f7eded" : "white"}
                      key={city.id}
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
                            to={getCityPagePathById(city.id)}
                            style={{ lineHeight: "24px" }}
                            isExternal
                          >
                            {city.id}
                          </Link>
                          <IconButton
                            aria-label={"Перейти"}
                            icon={<ArrowForwardIcon />}
                            size={"xs"}
                            colorScheme="orange"
                            isRound={true}
                            onClick={() =>
                              navigate(getCityPagePathById(city.id))
                            }
                          />
                        </Flex>
                      </Td>
                      <Td
                        textOverflow={"ellipsis"}
                        maxW={"300px"}
                        whiteSpace={"nowrap"}
                        overflow={"hidden"}
                      >
                        {city.name}
                      </Td>
                      <Td>{city.country_id}</Td>
                      <Td>{city.region_id}</Td>
                      <Td>{city.iata}</Td>
                      <Td>{city.timezone}</Td>
                      <Td>
                        <Link
                          href={`https://nominatim.openstreetmap.org/ui/details.html?osmtype=${city?.osm_type}&osmid=${city?.osm_id}`}
                          color={"teal"}
                          isExternal
                        >
                          {city.osm_type}
                          {city.osm_id}
                          <ExternalLinkIcon mx="4px" />
                        </Link>
                      </Td>
                      <Td width={"100vw"}>
                        {formatDate(city.last_updated_at)}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </TableContainer>
        </Skeleton>
        {citiesPage && citiesPage.pagination.total_pages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={citiesPage?.pagination.total_pages}
            handleNextPageClick={handleNextPageClick}
            handlePrevPageClick={handlePrevPageClick}
          />
        )}
      </Flex>
    </VStack>
  );
}
