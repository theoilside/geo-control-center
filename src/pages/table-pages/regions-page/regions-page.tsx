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
import { getRegionPagePathById } from "../../../routes/routes.ts";
import { useState } from "react";
import { ROWS_PER_PAGE } from "../../../settings.ts";
import { formatDate } from "../../../components/formatDate.ts";
import { Pagination } from "../../../components/table/Pagination.tsx";
import { NotFound } from "../../../components/table/NotFound.tsx";
import { useSearchRegionsApiRegionGet } from "../../../api/generated/reactQuery/region/region.ts";
import { useUsersCurrentUserAuthMeGet } from "../../../api/generated/reactQuery/auth/auth.ts";

function RegionsPage() {
  const [searchParams] = useSearchParams();
  const newCountryId = searchParams.get("countryId");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [isDeletedIncluded, setIsDeletedIncluded] = useState<boolean>(false);
  const [countryId, setCountryId] = useState<string | null>(
    newCountryId ?? null,
  );
  const navigate = useNavigate();
  const { data: currentUserData, isError: isErrorGettingCurrentUser } =
    useUsersCurrentUserAuthMeGet();

  const { data: regionsPage, isLoading } = useSearchRegionsApiRegionGet({
    page_number: currentPage,
    page_size: ROWS_PER_PAGE,
    term: searchTerm,
    include_deleted: isDeletedIncluded,
    country_id: countryId,
  });

  function handleNextPageClick() {
    setCurrentPage(currentPage + 1);
  }

  function handlePrevPageClick() {
    setCurrentPage(currentPage - 1);
  }

  const handleDeletedIncluded = () => {
    setIsDeletedIncluded(!isDeletedIncluded);
  };

  const handleChangeCountryId = (countryId: string | null) => {
    setCountryId(countryId);
  };

  return (
    <VStack spacing={"30px"}>
      <TabsMenu selectedTabIndex={1} />
      <TableHeader
        objectType={"region"}
        isEditingAvailable={!!currentUserData && !isErrorGettingCurrentUser}
        isSearchAvailable={true}
        isMapAvailable={false}
        onDeletedFlagChange={handleDeletedIncluded}
        getObjectPagePathById={getRegionPagePathById}
        handleSearch={(term: string | null) => setSearchTerm(term)}
        isSearchByParentObjectIdAvailable={true}
        handleChangeParentObjectId={handleChangeCountryId}
        parentObjectName={"страны"}
        parentObjectId={countryId}
      />
      <Flex width={"100%"} direction={"column"} gap={"15px"}>
        <Skeleton isLoaded={!isLoading}>
          <TableContainer className={"inset-wrapper"}>
            {regionsPage?.data.length == 0 ? (
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
                    <Th style={{ textAlign: "start" }}>OSM</Th>
                    <Th style={{ textAlign: "start" }}>Изменено</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {regionsPage?.data.map((region) => (
                    <Tr
                      width={"100%"}
                      backgroundColor={region.deleted_at ? "#f7eded" : "white"}
                      key={region.id}
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
                            to={getRegionPagePathById(region.id)}
                            style={{ lineHeight: "24px" }}
                            isExternal
                          >
                            {region.id}
                          </Link>
                          <IconButton
                            aria-label={"Перейти"}
                            icon={<ArrowForwardIcon />}
                            size={"xs"}
                            colorScheme="orange"
                            isRound={true}
                            onClick={() =>
                              navigate(getRegionPagePathById(region.id))
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
                        {region.name}
                      </Td>
                      <Td>{region.country_id}</Td>
                      <Td>
                        <Link
                          href={`https://nominatim.openstreetmap.org/ui/details.html?osmtype=${region?.osm_type}&osmid=${region?.osm_id}`}
                          color={"teal"}
                          isExternal
                        >
                          {region.osm_type}
                          {region.osm_id}
                          <ExternalLinkIcon mx="4px" />
                        </Link>
                      </Td>
                      <Td width={"100vw"}>
                        {formatDate(region.last_updated_at)}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </TableContainer>
        </Skeleton>
        {regionsPage && regionsPage.pagination.total_pages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={regionsPage?.pagination.total_pages}
            handleNextPageClick={handleNextPageClick}
            handlePrevPageClick={handlePrevPageClick}
          />
        )}
      </Flex>
    </VStack>
  );
}

export default RegionsPage;
